import { useEffect, useRef, useState } from 'react'
import './App.css'

const OPENING_START_TIME = 260

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

const memoryLanePhotos = [
  { id: 1, src: '/media/memories/1.jpeg', alt: 'Dimple in the sunshine', title: 'Sunshine Smile', tilt: -1.8, badge: '☀' },
  { id: 2, src: '/media/memories/2.jpeg', alt: 'Dimple portrait', title: 'Quiet Grace', tilt: 1.5, badge: '✦' },
  { id: 3, src: '/media/memories/3.jpeg', alt: 'Dimple childhood dance', title: 'Where It All Began', tilt: -2.2, badge: '♡' },
  { id: 4, src: '/media/memories/4.jpeg', alt: 'Dimple childhood days', title: 'Sweet Innocence', tilt: 1.8, badge: '✨' },
  { id: 5, src: '/media/memories/5.jpeg', alt: 'Dimple early memories', title: 'First Steps & Smiles', tilt: -1.5, badge: '✿' },
  { id: 6, src: '/media/memories/6.jpeg', alt: 'Dimple radiant smile', title: 'Radiant Glow', tilt: 2.1, badge: '☼' },
  { id: 7, src: '/media/memories/7.jpeg', alt: 'Dimple happy moment', title: 'Joyful Days', tilt: -1.9, badge: '♡' },
  { id: 8, src: '/media/memories/8.jpeg', alt: 'Dimple candid look', title: 'That Contagious Laugh', tilt: 1.7, badge: '✦' },
  { id: 9, src: '/media/memories/9.jpeg', alt: 'Dimple sweet expression', title: 'Gentle Warmth', tilt: -2.3, badge: '✨' },
  { id: 10, src: '/media/memories/10.jpeg', alt: 'Dimple memory', title: 'A Moment in Time', tilt: 1.6, badge: '✿' },
  { id: 11, src: '/media/memories/11.jpeg', alt: 'Dimple vintage portrait', title: 'The Iconic Glance', tilt: -2.0, badge: '♡' },
  { id: 12, src: '/media/memories/12.jpeg', alt: 'Dimple candid smile', title: 'Unscripted Happiness', tilt: 1.9, badge: '☀' },
  { id: 13, src: '/media/memories/13.jpeg', alt: 'Dimple special celebration', title: 'Dressed in Grace', tilt: -1.7, badge: '✦' },
  { id: 14, src: '/media/memories/14.jpeg', alt: 'Dimple sweet memory', title: 'Little Delights', tilt: 2.2, badge: '✨' },
  { id: 15, src: '/media/memories/15.jpeg', alt: 'Dimple beautiful day', title: 'Golden Hour Peace', tilt: -2.1, badge: '☼' },
  { id: 16, src: '/media/memories/16.jpeg', alt: 'Dimple smiling bright', title: 'Lighting Up The Room', tilt: 1.4, badge: '♡' },
  { id: 17, src: '/media/memories/17.jpeg', alt: 'Dimple candid', title: 'Pure Simplicity', tilt: -1.8, badge: '✿' },
  { id: 18, src: '/media/memories/18.jpeg', alt: 'Dimple childhood wonder', title: 'Little Star', tilt: 2.0, badge: '✦' },
  { id: 19, src: '/media/memories/19.jpeg', alt: 'Dimple laughter', title: 'Endless Laughs', tilt: -2.4, badge: '✨' },
  { id: 20, src: '/media/memories/20.jpeg', alt: 'Dimple calm moment', title: 'Quiet Reflection', tilt: 1.6, badge: '♡' },
  { id: 21, src: '/media/memories/21.jpeg', alt: 'Dimple memorable day', title: 'Timeless Charm', tilt: -1.9, badge: '☼' },
  { id: 22, src: '/media/memories/22.jpeg', alt: 'Dimple sweet smile', title: 'A Sweet Smile', tilt: 2.3, badge: '✿' },
  { id: 23, src: '/media/memories/23.jpeg', alt: 'Dimple candid capture', title: 'Unfiltered Joy', tilt: -1.6, badge: '✦' },
  { id: 24, src: '/media/memories/24.jpeg', alt: 'Dimple memory', title: 'Sweet Days', tilt: 1.8, badge: '♡' },
  { id: 25, src: '/media/memories/25.jpeg', alt: 'Dimple happy memory', title: 'Heart of Gold', tilt: -2.2, badge: '✨' },
  { id: 26, src: '/media/memories/26.jpeg', alt: 'Dimple lovely moment', title: 'A Special Day', tilt: 1.5, badge: '☀' },
  { id: 27, src: '/media/memories/27.jpeg', alt: 'Dimple glowing', title: 'Ever Beautiful', tilt: -1.7, badge: '✿' },
  { id: 28, src: '/media/memories/28.jpeg', alt: 'Dimple candid', title: 'Cherished Times', tilt: 2.1, badge: '✦' },
  { id: 29, src: '/media/memories/29.jpeg', alt: 'Dimple memory', title: 'Soft Moments', tilt: -2.0, badge: '♡' },
  { id: 30, src: '/media/memories/30.jpeg', alt: 'Dimple sweet look', title: 'Gentle Days', tilt: 1.7, badge: '☼' },
  { id: 31, src: '/media/memories/31.jpeg', alt: 'Dimple portrait', title: 'Graceful Elegance', tilt: -1.9, badge: '✨' },
  { id: 32, src: '/media/memories/32.jpeg', alt: 'Dimple smiling', title: 'Pure Joy', tilt: 2.2, badge: '✿' },
  { id: 33, src: '/media/memories/33.jpeg', alt: 'Dimple portrait look', title: 'Glow of Today', tilt: -1.5, badge: '♡' },
  { id: 34, src: '/media/memories/34.jpeg', alt: 'Dimple memory', title: 'Special Story', tilt: 1.9, badge: '✦' },
  { id: 35, src: '/media/memories/35.jpeg', alt: 'Dimple lovely portrait', title: 'Timeless Beauty', tilt: -2.1, badge: '✨' },
  { id: 36, src: '/media/memories/36.jpeg', alt: 'Dimple candid portrait', title: 'Living in Color', tilt: 1.8, badge: '☼' },
  { id: 37, src: '/media/memories/37.jpeg', alt: 'Dimple memory', title: 'To Every Tomorrow', tilt: -1.6, badge: '♡' },
]

const memories = [
  {
    number: '01',
    title: 'The laughs',
    src: '/media/moments/moment-1.jpg',
    alt: 'Dimple & Mohit smiling together in the park',
  },
  {
    number: '02',
    title: 'The little things',
    src: '/media/moments/moment-2.jpg',
    alt: 'Dimple & Mohit by the tree with flowers and smiles',
  },
  {
    number: '03',
    title: 'The memories',
    src: '/media/moments/moment-3.jpg',
    alt: 'Dimple & Mohit cherished memory together',
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

  const [isInMemoryLane, setIsInMemoryLane] = useState(false)
  const [wasPlaylistPlaying, setWasPlaylistPlaying] = useState(false)
  const [activePhotoModal, setActivePhotoModal] = useState(null)
  const [memoryLaneMuted, setMemoryLaneMuted] = useState(false)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [glideSpeed, setGlideSpeed] = useState(1)

  const audioRef = useRef(null)
  const nameParallaxRef = useRef(null)
  const memoryLaneSectionRef = useRef(null)
  const horizontalTrackRef = useRef(null)
  const memoryAudioRef = useRef(null)

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
   *
   * For Dil Kya Kare we start at 4:20.
   * Every other song starts at 0.
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

    /*
     * The user has just clicked the button,
     * so this is the best moment for browser audio permission.
     */
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

      /*
       * If this is the first song,
       * restore the 4:20 starting point.
       */
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
   * update the audio source and automatically play it
   * if the experience has already started.
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

  /*
   * Parallax scroll listener for DIMPLE name rows (Top & Bottom)
   */
  useEffect(() => {
    let ticking = false

    const updateParallax = () => {
      const sections = document.querySelectorAll('.name-parallax-section')
      const windowHeight = window.innerHeight

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect()
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height)
        const offsetPx = (progress - 0.5) * 800
        sec.style.setProperty(
          '--parallax-offset',
          `${offsetPx}px`
        )
      })
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateParallax()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const currentTrackXRef = useRef(0)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartOffsetRef = useRef(0)
  const lastUserActionRef = useRef(0)

  /*
   * Horizontal Auto-Glide Ticker & 3D Depth Animation (Stable 100vh stage, no page scrolling!)
   */
  useEffect(() => {
    const wrapper = memoryLaneSectionRef.current
    const track = horizontalTrackRef.current
    if (!wrapper || !track) return

    let rafId = null
    let lastTime = performance.now()

    const updateCardsDepth = () => {
      const windowWidth = window.innerWidth
      const centerX = windowWidth / 2
      const focalRange = windowWidth * 0.45
      const cards = track.querySelectorAll('.lane-single-item')

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const distFromCenter = (cardCenter - centerX) / focalRange
        const clampedDist = Math.max(-1.5, Math.min(1.5, distFromCenter))
        const absDist = Math.min(1, Math.abs(clampedDist))

        const scale = 1 - absDist * 0.12
        const opacity = 1 - absDist * 0.45
        const blurPx = absDist * 3
        const baseTilt = parseFloat(card.dataset.tilt || '0')
        const dynamicTilt = baseTilt * (1 - absDist * 0.4) + clampedDist * 2.5

        card.style.setProperty('--depth-scale', scale.toFixed(3))
        card.style.setProperty('--depth-opacity', opacity.toFixed(3))
        card.style.setProperty('--depth-blur', `${blurPx.toFixed(1)}px`)
        card.style.setProperty('--depth-tilt', `${dynamicTilt.toFixed(2)}deg`)
      })
    }

    const ticker = (currentTime) => {
      const deltaTime = Math.min(0.1, (currentTime - lastTime) / 1000)
      lastTime = currentTime

      const maxScroll = Math.max(1, track.scrollWidth - window.innerWidth + 120)

      // Auto-glide horizontally when section is in view
      if (isInMemoryLane && isAutoScrolling && !isDraggingRef.current) {
        if (Date.now() - lastUserActionRef.current > 1200) {
          currentTrackXRef.current += (48 * glideSpeed) * deltaTime
          if (currentTrackXRef.current >= maxScroll) {
            currentTrackXRef.current = 0
          }
        }
      }

      const clampedX = Math.max(0, Math.min(maxScroll, currentTrackXRef.current))
      wrapper.style.setProperty('--track-x', `${clampedX}px`)
      wrapper.style.setProperty('--lane-progress', `${(clampedX / maxScroll) * 100}%`)

      updateCardsDepth()

      rafId = requestAnimationFrame(ticker)
    }

    rafId = requestAnimationFrame(ticker)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isInMemoryLane, isAutoScrolling, glideSpeed])

  /*
   * Observe Memory Lane section visibility to switch soundtrack
   */
  useEffect(() => {
    const section = memoryLaneSectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setIsInMemoryLane(entry.isIntersecting)
      },
      {
        threshold: 0.2,
      }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  /*
   * Audio handoff between main playlist and Memory Lane tune
   */
  useEffect(() => {
    const mainAudio = audioRef.current
    const memoryAudio = memoryAudioRef.current
    if (!memoryAudio) return

    if (isInMemoryLane) {
      // Pause main playlist if it was playing
      if (mainAudio && !mainAudio.paused) {
        setWasPlaylistPlaying(true)
        mainAudio.pause()
        setIsPlaying(false)
      }
      // Play Memory Lane audio
      if (!memoryLaneMuted) {
        memoryAudio.currentTime = memoryAudio.currentTime || 0
        const playPromise = memoryAudio.play()
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.log('Audio autoplay waiting for user interaction:', err)
          })
        }
      }
    } else {
      // Stop Memory Lane audio
      memoryAudio.pause()
      // Resume main playlist if it was playing before entering
      if (wasPlaylistPlaying && mainAudio && started) {
        mainAudio.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {})
      }
    }
  }, [isInMemoryLane, started, wasPlaylistPlaying, memoryLaneMuted])

  /*
   * Auto-unlock audio on user scroll / click / touch
   */
  useEffect(() => {
    const unlockAndPlay = () => {
      if (isInMemoryLane && memoryAudioRef.current && memoryAudioRef.current.paused && !memoryLaneMuted) {
        memoryAudioRef.current.play().catch(() => {})
      }
    }

    window.addEventListener('click', unlockAndPlay, { passive: true })
    window.addEventListener('touchstart', unlockAndPlay, { passive: true })
    window.addEventListener('scroll', unlockAndPlay, { passive: true })

    return () => {
      window.removeEventListener('click', unlockAndPlay)
      window.removeEventListener('touchstart', unlockAndPlay)
      window.removeEventListener('scroll', unlockAndPlay)
    }
  }, [isInMemoryLane, memoryLaneMuted])

  /*
   * Drag / Swipe & Arrow Navigation Handlers
   */
  const handleTrackPointerDown = (e) => {
    isDraggingRef.current = true
    lastUserActionRef.current = Date.now()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    dragStartXRef.current = clientX
    dragStartOffsetRef.current = currentTrackXRef.current
  }

  const handleTrackPointerMove = (e) => {
    if (!isDraggingRef.current) return
    lastUserActionRef.current = Date.now()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const delta = dragStartXRef.current - clientX
    const track = horizontalTrackRef.current
    const maxScroll = track ? Math.max(0, track.scrollWidth - window.innerWidth + 120) : 10000
    currentTrackXRef.current = Math.max(0, Math.min(maxScroll, dragStartOffsetRef.current + delta))
  }

  const handleTrackPointerUp = () => {
    isDraggingRef.current = false
    lastUserActionRef.current = Date.now()
  }

  const handleNavStep = (direction) => {
    lastUserActionRef.current = Date.now()
    const step = window.innerWidth * 0.45
    const track = horizontalTrackRef.current
    const maxScroll = track ? Math.max(0, track.scrollWidth - window.innerWidth + 120) : 10000
    const target = currentTrackXRef.current + (direction === 'next' ? step : -step)
    currentTrackXRef.current = Math.max(0, Math.min(maxScroll, target))
  }

  const revealSurprise = () => {
    setOpened(true)

    document
      .querySelector('#letter')
      ?.scrollIntoView({
        behavior: 'smooth',
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

          <p>FOR DIMPLE, ON HER DAY</p>

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
  <section className="birthday-reveal" aria-live="polite">
    <div className="birthday-sticker-transition" aria-hidden="true">

  <img
    className="transition-sticker sticker-clover"
    src="/media/clover.png"
    alt=""
  />

  <img
    className="transition-sticker sticker-white-flower"
    src="/media/white-flower.png"
    alt=""
  />

  <img
    className="transition-sticker sticker-eye"
    src="/media/evil-eye.png"
    alt=""
  />

  <img
    className="transition-sticker sticker-rose"
    src="/media/rose.png"
    alt=""
  />

</div>

    {showBirthday && (
  <section className="birthday-reveal" aria-live="polite">

    {/* STICKER TRANSITION */}
    <div
      className="birthday-sticker-transition"
      aria-hidden="true"
    >
      <img
        className="transition-sticker sticker-clover"
        src="/media/clover.png"
        alt=""
      />

      <img
        className="transition-sticker sticker-white-flower"
        src="/media/white-flower.png"
        alt=""
      />

      <img
        className="transition-sticker sticker-eye"
        src="/media/evil-eye.png"
        alt=""
      />

      <img
        className="transition-sticker sticker-rose"
        src="/media/rose.png"
        alt=""
      />
    </div>

    {/* SCRAPBOOK */}
    <div className="birthday-scrapbook">

      <img
        className="birthday-template"
        src="/media/template.jpeg"
        alt="Birthday scrapbook"
      />

      <div className="birthday-photo photo-1">
        <img
          src="/media/Image1.jpeg"
          alt=""
        />
      </div>

      <div className="birthday-photo photo-2">
        <img
          src="/media/Image2.jpeg"
          alt=""
        />
      </div>

      <div className="birthday-photo photo-3">
        <img
          src="/media/Image3.jpeg"
          alt=""
        />
      </div>

      <div className="birthday-photo photo-4">
        <img
          src="/media/Image4.jpeg"
          alt=""
        />
      </div>

      <div className="birthday-photo photo-5">
        <img
          src="/media/Image5.jpeg"
          alt=""
        />
      </div>

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
          22 · 08 · 2026
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

      <section className="music-section">

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
              src="/media/dimple-cover.jpeg"
              alt="Dimple"
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
          DIMPLE PARALLAX SECTION
      ===================================================== */}

      <section
        className="name-parallax-section"
        ref={nameParallaxRef}
        aria-label="Dimple"
      >
        <div className="name-track-wrapper">
          {/* Row 1: Moves Left on scroll */}
          <div className="name-track track-left track-row-1">
            <div className="name-track-inner">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} className="name-item">
                  DIMPLE <span className="name-symbol">✦</span>
                </span>
              ))}
            </div>
          </div>

          {/* Row 2: Moves Right on scroll */}
          <div className="name-track track-right track-row-2">
            <div className="name-track-inner">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} className="name-item">
                  DIMPLE <span className="name-symbol">♡</span>
                </span>
              ))}
            </div>
          </div>

          {/* Row 3: Moves Left on scroll */}
          <div className="name-track track-left track-row-3">
            <div className="name-track-inner">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} className="name-item">
                  DIMPLE <span className="name-symbol">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          MEMORY LANE SECTION (AUTOGLIDE & HORIZONTAL SHOWCASE)
      ===================================================== */}

      <section
        className="memory-lane-section"
        ref={memoryLaneSectionRef}
        id="memory-lane"
        aria-label="Memory Lane"
        onMouseDown={handleTrackPointerDown}
        onMouseMove={handleTrackPointerMove}
        onMouseUp={handleTrackPointerUp}
        onTouchStart={handleTrackPointerDown}
        onTouchMove={handleTrackPointerMove}
        onTouchEnd={handleTrackPointerUp}
      >
        <audio
          ref={memoryAudioRef}
          src="/media/audiomemory.mp3"
          loop
          preload="auto"
        />

        {/* Background: Dimple looking with eyes into the camera (Ken Burns motion & atmospheric depth) */}
        <div className="lane-dimple-bg-container" aria-hidden="true">
          <img
            className="lane-dimple-bg-img"
            src="/media/memories/11.jpeg"
            alt="Dimple portrait"
          />
          <div className="lane-video-vignette" />
          <div className="lane-video-warmth" />
        </div>

        {/* Floating Top Bar */}
        <div className="lane-top-bar">
          <div className="lane-top-indicator">
            <span className="lane-pulse-dot" />
            <span className="lane-top-text">MEMORY LANE · 37 MOMENTS</span>
          </div>

          <div className="lane-top-actions">
            {/* Speed Control Pill */}
            <button
              type="button"
              className="lane-speed-btn"
              onClick={(e) => {
                e.stopPropagation()
                setGlideSpeed((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))
              }}
              title="Click to change glide speed (1x, 1.5x, 2x)"
            >
              <span className="speed-icon">⚡</span>
              <span>{glideSpeed}x Speed</span>
            </button>

            {/* Auto-Glide Toggle Button */}
            <button
              type="button"
              className={`lane-glide-btn ${isAutoScrolling ? 'is-active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setIsAutoScrolling(!isAutoScrolling)
              }}
              title={isAutoScrolling ? 'Pause Auto Movement' : 'Resume Auto Movement'}
            >
              <span className="glide-btn-icon">{isAutoScrolling ? '❚❚' : '▶'}</span>
              <span>{isAutoScrolling ? 'Auto-Glide ON' : 'Auto-Glide Paused'}</span>
            </button>

            {/* Soundtrack Pill */}
            <div className="lane-sound-pill" onClick={(e) => e.stopPropagation()}>
              <span className="lane-sound-note">♫</span>
              <span>Memory Track</span>
              <button
                type="button"
                className="lane-mute-btn"
                onClick={() => {
                  if (memoryAudioRef.current) {
                    if (memoryLaneMuted || memoryAudioRef.current.paused) {
                      memoryAudioRef.current.play().then(() => {
                        setMemoryLaneMuted(false)
                      }).catch(() => {})
                    } else {
                      memoryAudioRef.current.pause()
                      setMemoryLaneMuted(true)
                    }
                  }
                }}
                aria-label={memoryLaneMuted ? 'Unmute' : 'Mute'}
              >
                {memoryLaneMuted ? '🔇' : '🔊'}
              </button>
            </div>
          </div>
        </div>

        {/* Floating Left / Right Nav Arrows */}
        <button
          type="button"
          className="lane-nav-arrow arrow-prev"
          onClick={(e) => {
            e.stopPropagation()
            handleNavStep('prev')
          }}
          aria-label="Previous Memory"
        >
          ‹
        </button>
        <button
          type="button"
          className="lane-nav-arrow arrow-next"
          onClick={(e) => {
            e.stopPropagation()
            handleNavStep('next')
          }}
          aria-label="Next Memory"
        >
          ›
        </button>

        {/* Horizontal Track that slides automatically */}
        <div
          className="lane-horizontal-track"
          ref={horizontalTrackRef}
        >
          {/* 1. INTRO CARD */}
          <div className="lane-intro-panel">
            <span className="lane-intro-eyebrow">A JOURNEY THROUGH TIME</span>
            <h2 className="lane-intro-title">
              A Walk Down
              <br />
              <em>Memory Lane.</em>
            </h2>
            <p className="lane-intro-sub">
              Every picture holds a feeling, a laugh, and a quiet piece of magic.
            </p>
            <div className="lane-scroll-hint">
              <span>Swipe or let it glide through 37 memories</span>
              <span className="lane-arrow">→</span>
            </div>
          </div>

          {/* 2. INDIVIDUAL CINEMATIC PHOTO CARDS (1 through 37) */}
          {memoryLanePhotos.map((item) => (
            <div
              key={item.id}
              className="lane-single-item"
              data-tilt={item.tilt}
              style={{
                '--base-tilt': `${item.tilt}deg`,
              }}
            >
              <figure
                className="lane-item-card"
                onClick={(e) => {
                  e.stopPropagation()
                  setActivePhotoModal(item)
                }}
              >
                <div className="lane-polaroid-body">
                  <span className="lane-card-pin" aria-hidden="true">
                    {item.badge}
                  </span>
                  <div className="lane-card-img-wrap">
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                    />
                  </div>
                  <div className="lane-card-footer">
                    <div className="lane-card-meta">
                      <span className="lane-card-num">
                        #{String(item.id).padStart(2, '0')}
                      </span>
                      <span className="lane-card-title">{item.title}</span>
                    </div>
                    <span className="lane-card-action">
                      View ✦
                    </span>
                  </div>
                </div>
              </figure>
            </div>
          ))}

          {/* 3. OUTRO CARD */}
          <div className="lane-outro-panel">
            <span className="outro-sparkle">✦</span>
            <h3>To every moment yet to come.</h3>
            <p>May your future be as bright, magical, and beautiful as all the chapters behind you.</p>
            <span className="outro-heart">♡</span>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="lane-progress-bar-container">
          <div className="lane-progress-bar-track">
            <div className="lane-progress-bar-fill" />
          </div>
          <span className="lane-progress-text">DRAG OR GLIDE TO TRAVEL</span>
        </div>

        {/* Fullscreen Lightbox Modal */}
        {activePhotoModal && (
          <div
            className="photo-lightbox-backdrop"
            onClick={() => setActivePhotoModal(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="photo-lightbox-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setActivePhotoModal(null)}
                aria-label="Close"
              >
                ✕
              </button>
              <div className="lightbox-img-wrap">
                <img
                  src={activePhotoModal.src}
                  alt={activePhotoModal.alt}
                />
              </div>
              <div className="lightbox-footer">
                <p>Memory #{String(activePhotoModal.id).padStart(2, '0')} · Dimple ♡</p>
              </div>
            </div>
          </div>
        )}
      </section>


      {/* =====================================================
          DIMPLE PARALLAX SECTION (LOWER BORDER)
      ===================================================== */}

      <section
        className="name-parallax-section"
        aria-label="Dimple"
      >
        <div className="name-track-wrapper">
          {/* Row 1: Moves Left on scroll */}
          <div className="name-track track-left track-row-1">
            <div className="name-track-inner">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} className="name-item">
                  DIMPLE <span className="name-symbol">✦</span>
                </span>
              ))}
            </div>
          </div>

          {/* Row 2: Moves Right on scroll */}
          <div className="name-track track-right track-row-2">
            <div className="name-track-inner">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} className="name-item">
                  DIMPLE <span className="name-symbol">♡</span>
                </span>
              ))}
            </div>
          </div>

          {/* Row 3: Moves Left on scroll */}
          <div className="name-track track-left track-row-3">
            <div className="name-track-inner">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} className="name-item">
                  DIMPLE <span className="name-symbol">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          MEMORIES (MOMENTS WORTH KEEPING FOREVER)
      ===================================================== */}

      <section className="memory-section" aria-label="Moments worth keeping forever">
        {/* Atmospheric Clover Leaf Background */}
        <div className="memory-bg-container" aria-hidden="true">
          <img
            className="memory-bg-img"
            src="/media/moments/clover-bg.png"
            alt="Clover leaves background"
          />
          <div className="memory-bg-overlay" />
        </div>

        <div className="memory-content-wrap">
          <div className="section-heading">
            <p className="eyebrow">
              A FEW FAVOURITES
            </p>

            <h2>
              Moments worth
              <br />
              <em>
                keeping forever.
              </em>
            </h2>
          </div>

          <div className="memory-grid">
            {memories.map((memory, index) => (
              <article
                className={`memory-card card-${index + 1}`}
                key={memory.number}
                onClick={() => setActivePhotoModal({
                  id: index + 1,
                  src: memory.src,
                  alt: memory.alt,
                })}
              >
                <div className="memory-photo-frame">
                  <img
                    src={memory.src}
                    alt={memory.alt}
                    loading="lazy"
                  />
                  <div className="memory-photo-hover-badge">
                    <span>View ✦</span>
                  </div>
                </div>

                <div className="card-caption">
                  <span>{memory.number}</span>
                  <p>{memory.title}</p>
                </div>
              </article>
            ))}
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