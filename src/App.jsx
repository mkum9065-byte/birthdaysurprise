import { useEffect, useRef, useState } from 'react'
import './App.css'
import { MEDIA } from './media.js'

const OPENING_START_TIME = 260

/* Number of photo slots on the scrapbook */
const SCRAPBOOK_SLOTS = 5

const songs = [
  {
    title: 'Dil Kya Kare',
    artist: 'Kishore Kumar · Julie',
    file: '/media/dil-kya-kare.mp3',
    startTime: OPENING_START_TIME,
  },
  {
    title: 'Darkhaast',
    artist: 'Arijit Singh · Sunidhi Chauhan',
    file: '/music/Darkhaast (Lyrics) - Arijit Singh, Sunidhi Chauhan Shivaay.mp3',
    startTime: 0,
  },
  {
    title: 'Fakira',
    artist: 'Sanam',
    file: '/music/Fakira  Sanam.mp3',
    startTime: 0,
  },
  {
    title: 'Hoshwalon Ko Khabar Kya',
    artist: 'Jagjit Singh',
    file: '/music/Jagjit Singh - Hoshwalon Ko Khabar Kya  (Lyrics)  Sarfarosh - 1999.mp3',
    startTime: 0,
  },
  {
    title: 'Mujhe Tum Nazar Se',
    artist: 'Mehdi Hassan',
    file: '/music/MUJHE TUM NAZAR SE GIRA TO RAHAY HO (GHAZAL) - MEHDI HASSAN - FILM DORAHA.mp3',
    startTime: 0,
  },
  {
    title: 'Mann Ki Lagan',
    artist: 'Rahat Fateh Ali Khan',
    file: '/music/Mann Ki Lagan  Rahat Fateh Ali Khan (Lyrics).mp3',
    startTime: 0,
  },
  {
    title: 'Masakali',
    artist: 'A.R. Rahman · Mohit Chauhan',
    file: '/music/Masakali Original Full Song - Delhi 6  A.R. Rahman, Mohit Chauhan  Masakali 2.0  MP3  Audio.mp3',
    startTime: 0,
  },
  {
    title: 'Mera Piya Ghar Aaya',
    artist: 'Nusrat Fateh Ali Khan',
    file: '/music/Mera Piya Ghar Aya (Lyrics)  Nusrat Fateh Ali Khan.mp3',
    startTime: 0,
  },
  {
    title: 'Pyar Deewana Hota Hai',
    artist: 'Kishore Kumar',
    file: '/music/Pyar Deewana Hota Hai 4K Song _ Kishore Kumar Classics  Rajesh Khanna  Hindi Romantic-Kati Patang.mp3',
    startTime: 0,
  },
  {
    title: 'Rabba Lakh Lakh Shukar',
    artist: 'Traditional',
    file: '/music/Rabba Lakh Lakh Shukar Manaawa Je Kadi Mera Yaar Mil Jaaye.mp3',
    startTime: 0,
  },
  {
    title: 'Rafta Rafta',
    artist: 'Classic',
    file: '/music/Rafta Rafta Woh Meri Hasti Ka.mp3',
    startTime: 0,
  },
  {
    title: 'Sanun Nahar Wale Pool',
    artist: 'Noor Jehan',
    file: '/music/Sanun Nahar Wale Pool  Sayonee Mera Mahi  Noor Jehan  Punjabi Ghazal.mp3',
    startTime: 0,
  },
  {
    title: 'Yun Hi',
    artist: 'Mohit Chauhan',
    file: '/music/Yun Hi - Mohit Chauhan(Lyrics).mp3',
    startTime: 0,
  },
]

function App() {
  const [opened, setOpened] = useState(false)
  const [started, setStarted] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [showBirthday, setShowBirthday] = useState(false)

  const [currentSong, setCurrentSong] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [needsSoundTap, setNeedsSoundTap] = useState(false)
  const [heroScroll, setHeroScroll] = useState(0)

  /*
   * Which photo each scrapbook slot currently shows.
   */
  const [photoIndices, setPhotoIndices] = useState(() =>
    Array.from(
      { length: SCRAPBOOK_SLOTS },
      (_, slotIndex) =>
        MEDIA.photos.length === 0
          ? 0
          : slotIndex % MEDIA.photos.length
    )
  )

  /*
   * How many times each slot has tried to load.
   */
  const photoAttempts = useRef(
    Array(SCRAPBOOK_SLOTS).fill(0)
  )

  const audioRef = useRef(null)

  const song = songs[currentSong]

  const formatTime = (seconds) => {
    const safeSeconds = Number.isFinite(seconds)
      ? Math.max(0, Math.floor(seconds))
      : 0

    return `${Math.floor(safeSeconds / 60)}:${String(
      safeSeconds % 60
    ).padStart(2, '0')}`
  }

  /*
   * Actually start the currently selected song.
   */
  const playCurrentSong = async (fromBeginning = false) => {
    const audio = audioRef.current

    if (!audio) return

    try {
      if (fromBeginning) {
        const startTime = song.startTime || 0

        if (audio.readyState >= 1) {
          audio.currentTime = Math.min(
            startTime,
            audio.duration || startTime
          )
        }
      }

      await audio.play()

      setIsPlaying(true)
      setNeedsSoundTap(false)
    } catch (error) {
      console.log('Audio play blocked:', error)
      setNeedsSoundTap(true)
      setIsPlaying(false)
    }
  }

  /*
   * Start the entire birthday experience.
   */
  const startExperience = () => {
    setStarted(true)
    setNeedsSoundTap(false)

    const audio = audioRef.current

    if (!audio) return

    const startAudio = async () => {
      try {
        if (audio.readyState >= 1) {
          audio.currentTime = OPENING_START_TIME
        }

        await audio.play()

        setIsPlaying(true)
        setNeedsSoundTap(false)
      } catch (error) {
        console.log('Initial audio play blocked:', error)

        setNeedsSoundTap(true)
        setIsPlaying(false)
      }
    }

    startAudio()
  }

  /*
   * Select a song from the playlist.
   */
  const selectSong = async (index) => {
    if (index === currentSong) {
      togglePlayback()
      return
    }

    const audio = audioRef.current

    if (!audio) return

    audio.pause()

    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setCurrentSong(index)
  }

  /*
   * Play / pause.
   */
  const togglePlayback = async () => {
    const audio = audioRef.current

    if (!audio) return

    if (audio.paused) {
      await playCurrentSong(false)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  /*
   * Go to next song.
   */
  const nextSong = () => {
    let nextIndex

    if (shuffle) {
      do {
        nextIndex = Math.floor(Math.random() * songs.length)
      } while (
        songs.length > 1 &&
        nextIndex === currentSong
      )
    } else {
      nextIndex = (currentSong + 1) % songs.length
    }

    setCurrentSong(nextIndex)
  }

  /*
   * Previous song.
   */
  const previousSong = () => {
    const audio = audioRef.current

    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }

    const previousIndex =
      currentSong === 0
        ? songs.length - 1
        : currentSong - 1

    setCurrentSong(previousIndex)
  }

  /*
   * Skip forward/backward.
   */
  const skip = (seconds) => {
    const audio = audioRef.current

    if (!audio) return

    audio.currentTime = Math.max(
      0,
      Math.min(
        audio.duration || 0,
        audio.currentTime + seconds
      )
    )
  }

  /*
   * Audio events.
   */
  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(
        Number.isFinite(audio.duration)
          ? audio.duration
          : 0
      )

      if (currentSong === 0 && started) {
        const startTime = OPENING_START_TIME

        if (
          Number.isFinite(audio.duration) &&
          audio.duration > startTime
        ) {
          audio.currentTime = startTime
        }
      } else if (audio.currentTime < 0.1) {
        audio.currentTime = 0
      }

      setCurrentTime(audio.currentTime)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0

        audio.play().catch(() => {
          setNeedsSoundTap(true)
        })

        return
      }

      nextSong()
    }

    const handleError = () => {
      console.error(
        'Audio failed to load:',
        song.file
      )

      setIsPlaying(false)
    }

    audio.addEventListener(
      'loadedmetadata',
      handleLoadedMetadata
    )

    audio.addEventListener(
      'timeupdate',
      handleTimeUpdate
    )

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener(
        'loadedmetadata',
        handleLoadedMetadata
      )

      audio.removeEventListener(
        'timeupdate',
        handleTimeUpdate
      )

      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [currentSong, repeat, shuffle, started])

  /*
   * Whenever the selected song changes,
   * update the audio source and automatically play it.
   */
  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return

    audio.pause()
    audio.load()

    setCurrentTime(0)
    setDuration(0)

    if (!started) return

    const handleCanPlay = async () => {
      try {
        if (currentSong === 0) {
          audio.currentTime = Math.min(
            OPENING_START_TIME,
            audio.duration || OPENING_START_TIME
          )
        } else {
          audio.currentTime = 0
        }

        await audio.play()

        setIsPlaying(true)
        setNeedsSoundTap(false)
      } catch (error) {
        console.log(
          'Could not automatically play selected song:',
          error
        )

        setNeedsSoundTap(true)
        setIsPlaying(false)
      }
    }

    audio.addEventListener(
      'canplay',
      handleCanPlay,
      { once: true }
    )

    return () => {
      audio.removeEventListener(
        'canplay',
        handleCanPlay
      )
    }
  }, [currentSong, started])

  /*
   * Countdown.
   */
  useEffect(() => {
    if (!started) return

    if (countdown === 0) {
      setShowBirthday(true)

      const finish = window.setTimeout(() => {
        setShowBirthday(false)
      }, 4200)

      return () => window.clearTimeout(finish)
    }

    const tick = window.setTimeout(() => {
      setCountdown((number) => number - 1)
    }, 1000)

    return () => window.clearTimeout(tick)
  }, [countdown, started])

  /*
   * Hero scroll animation.
   */
  useEffect(() => {
    const updateHeroScroll = () => {
      setHeroScroll(
        Math.min(
          1,
          window.scrollY /
            (window.innerHeight * 0.72)
        )
      )
    }

    window.addEventListener(
      'scroll',
      updateHeroScroll,
      { passive: true }
    )

    updateHeroScroll()

    return () =>
      window.removeEventListener(
        'scroll',
        updateHeroScroll
      )
  }, [])

  const revealSurprise = () => {
    setOpened(true)

    document
      .querySelector('#letter')
      ?.scrollIntoView({
        behavior: 'smooth',
      })
  }

  /*
   * If a photo file is missing or fails to load,
   * swap in the next available photo.
   */
  const handlePhotoError = (slotIndex) => {
    if (MEDIA.photos.length < 2) return

    const attempts = photoAttempts.current

    attempts[slotIndex] += 1

    if (attempts[slotIndex] >= MEDIA.photos.length) {
      return
    }

    setPhotoIndices((current) => {
      const next = [...current]

      next[slotIndex] =
        (next[slotIndex] + 1) % MEDIA.photos.length

      return next
    })
  }

  return (
    <main>

      {/* =====================================================
          AUDIO
      ===================================================== */}

      <audio
        ref={audioRef}
        src={song.file}
        preload="auto"
      />

      {/* =====================================================
          LAUNCH SCREEN
      ===================================================== */}

      {!started && (
        <section className="launch-screen">

          <div
            className="launch-glow"
            aria-hidden="true"
          />

          <p>FOR PREET, ON HER DAY</p>

          <button onClick={startExperience}>
            <span>✦</span>
            Tap to begin
            <span>✦</span>
          </button>

          <small>
            Turn your sound on ♫
          </small>

        </section>
      )}

      {/* =====================================================
          SOUND PERMISSION
      ===================================================== */}

      {needsSoundTap && (
        <button
          className="sound-permission"
          onClick={() =>
            playCurrentSong(true)
          }
        >
          <span>♪</span>
          Tap to start the song
        </button>
      )}

      {/* =====================================================
          COUNTDOWN
      ===================================================== */}

      {started && countdown > 0 && (
        <section
          className={`countdown-screen countdown-${countdown}`}
          aria-label={`Countdown: ${countdown}`}
        >

          <div
            className="scene-shapes"
            aria-hidden="true"
          >
            {Array.from(
              { length: 12 },
              (_, index) => (
                <i key={index} />
              )
            )}
          </div>

          <div className="scene-orbit orbit-one" />
          <div className="scene-orbit orbit-two" />

          <div className="countdown-stars">
            {countdown === 3
              ? '✦  ✦  ✦'
              : countdown === 2
              ? '♡  ✦  ♡'
              : '✦  ♡  ✦'}
          </div>

          <strong key={countdown}>
            {countdown}
          </strong>

        </section>
      )}

      {/* =====================================================
          BIRTHDAY REVEAL
      ===================================================== */}

      {showBirthday && (
        <section
          className="birthday-reveal"
          aria-live="polite"
        >

          <div
            className="birthday-sticker-transition"
            aria-hidden="true"
          >

            <img
              className="transition-sticker sticker-clover"
              src={MEDIA.stickers.clover}
              alt=""
            />

            <img
              className="transition-sticker sticker-white-flower"
              src={MEDIA.stickers.whiteFlower}
              alt=""
            />

            <img
              className="transition-sticker sticker-eye"
              src={MEDIA.stickers.evilEye}
              alt=""
            />

            <img
              className="transition-sticker sticker-rose"
              src={MEDIA.stickers.rose}
              alt=""
            />

          </div>

          {/* SCRAPBOOK */}

          <div className="birthday-scrapbook">

            <img
              className="birthday-template"
              src={MEDIA.template}
              alt="Birthday scrapbook"
            />

            {MEDIA.photos.length > 0 &&
              Array.from(
                { length: SCRAPBOOK_SLOTS },
                (_, slotIndex) => (

                  <div
                    className={`birthday-photo photo-${
                      slotIndex + 1
                    }`}
                    key={slotIndex}
                  >

                    <img
                      src={
                        MEDIA.photos[
                          photoIndices[slotIndex]
                        ]
                      }
                      alt=""
                      onError={() =>
                        handlePhotoError(slotIndex)
                      }
                    />

                  </div>

                )
              )}

          </div>

          {/* EXISTING SPARKLES */}

          <div
            className="birthday-sparkles"
            aria-hidden="true"
          >

            {Array.from(
              { length: 18 },
              (_, index) => (
                <i key={index} />
              )
            )}

          </div>

        </section>
      )}

      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* =====================================================
          NAV
      ===================================================== */}

      <nav>

        <span className="brand">
          A little something for you{' '}
          <span>♡</span>
        </span>

        <span className="date">
          17 · 08 · 2026
        </span>

      </nav>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero-section">

        <div
          className="hero-bloom"
          style={{
            transform: `scale(${
              1 + heroScroll * 2.2
            })`,
            opacity:
              0.15 + heroScroll * 0.55,
          }}
        />

        <div className="sparkle sparkle-left">
          ✦
        </div>

        <div className="sparkle sparkle-right">
          ✦
        </div>

        <div
          className="hero-content"
          style={{
            transform: `translateY(${
              -heroScroll * 110
            }px) scale(${
              1 - heroScroll * 0.1
            })`,
            opacity:
              1 - heroScroll * 0.78,
          }}
        >

          <p className="eyebrow">
            TODAY IS ALL ABOUT YOU
          </p>

          <h1>
            Happy
            <br />
            <em>Birthday</em>
          </h1>

          <p className="hero-copy">
            For the person who makes ordinary days
            <br />
            feel a little more extraordinary.
          </p>

          <button
            className="primary-button"
            onClick={revealSurprise}
          >
            <span>
              Open your surprise
            </span>

            <span aria-hidden="true">
              →
            </span>
          </button>

        </div>

        <p className="scroll-note">
          SCROLL TO UNWRAP{' '}
          <span>↓</span>
        </p>

      </section>

      {/* =====================================================
          MUSIC
      ===================================================== */}

      <section
        className="music-section"
        style={{
          '--media-sky': `url('${MEDIA.sky}')`,
        }}
      >

        {/* PLAYLIST */}

        <div className="playlist-panel">

          <div className="playlist-heading">

            <p className="eyebrow">
              A LITTLE SOUNDTRACK
            </p>

            <h2>
              Your
              <br />
              <em>Playlist ♡</em>
            </h2>

            <p>
              Songs that remind me
              <br />
              of you ✨
            </p>

          </div>

          <div className="playlist">

            {songs.map((item, index) => (

              <button
                className={`playlist-song ${
                  currentSong === index
                    ? 'active'
                    : ''
                }`}
                key={item.file}
                onClick={() =>
                  selectSong(index)
                }
              >

                <span className="song-number">

                  {currentSong === index &&
                  isPlaying
                    ? 'Ⅱ'
                    : String(
                        index + 1
                      ).padStart(2, '0')}

                </span>

                <span className="song-info">

                  <strong>
                    {item.title}
                  </strong>

                  <small>
                    {item.artist}
                  </small>

                </span>

                <span className="song-arrow">

                  {currentSong === index &&
                  isPlaying
                    ? '♪'
                    : '▶'}

                </span>

              </button>

            ))}

          </div>

        </div>

        {/* PLAYER */}

        <div className="music-player">

          <div
            className={`vinyl ${
              isPlaying
                ? 'spinning'
                : ''
            }`}
            aria-hidden="true"
          />

          <div className="player-cover">

            <img
              src={MEDIA.cover}
              alt=""
            />

          </div>

          <div className="player-details">

            <span className="player-device">
              NOW PLAYING · ♫
            </span>

            <h3>
              {song.title}
            </h3>

            <p>
              {song.artist}
            </p>

            <input
              aria-label="Song progress"
              className="progress"
              type="range"
              min="0"
              max={duration || 1}
              value={Math.min(
                currentTime,
                duration || currentTime
              )}
              onChange={(event) => {

                const value =
                  Number(
                    event.target.value
                  )

                if (audioRef.current) {
                  audioRef.current.currentTime =
                    value
                }

                setCurrentTime(value)

              }}
            />

            <div className="time-row">

              <span>
                {formatTime(
                  currentTime
                )}
              </span>

              <span>
                -
                {formatTime(
                  Math.max(
                    0,
                    duration -
                      currentTime
                  )
                )}
              </span>

            </div>

            <div className="player-controls">

              <button
                className={
                  shuffle
                    ? 'control-active'
                    : ''
                }
                aria-label="Shuffle"
                onClick={() =>
                  setShuffle(!shuffle)
                }
              >
                ⤨
              </button>

              <button
                aria-label="Previous"
                onClick={previousSong}
              >
                ◀
              </button>

              <button
                className="play-button"
                aria-label={
                  isPlaying
                    ? 'Pause'
                    : 'Play'
                }
                onClick={
                  togglePlayback
                }
              >
                {isPlaying
                  ? 'Ⅱ'
                  : '▶'}
              </button>

              <button
                aria-label="Next"
                onClick={nextSong}
              >
                ▶
              </button>

              <button
                className={
                  repeat
                    ? 'control-active'
                    : ''
                }
                aria-label="Repeat"
                onClick={() =>
                  setRepeat(!repeat)
                }
              >
                ↻
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          LETTER
      ===================================================== */}

      <section
        id="letter"
        className={`letter-section ${
          opened
            ? 'opened'
            : ''
        }`}
      >

        <div className="letter-orbit">
          ✦
        </div>

        <p className="eyebrow">
          A NOTE, JUST FOR YOU
        </p>

        <h2>
          May this year bring you
          <br />
          <em>
            everything beautiful.
          </em>
        </h2>

        <div className="letter-card">

          <span className="quote">
            “
          </span>

          <p>
            Here’s to your kind heart,
            your bright smile, and
            every beautiful chapter
            that is still waiting for
            you.
          </p>

          <span className="signature">
            From a friend, with a
            smile ♡
          </span>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer>
        Made especially for your day{' '}
        <span>✦</span>
      </footer>

    </main>
  )
}

export default App