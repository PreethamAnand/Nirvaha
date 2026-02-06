import { motion, AnimatePresence } from "motion/react";
import { Volume2, Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Share2, Download, ChevronRight, Search, X, ListPlus, Heart, Clock, Plus, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";

export function SoundHealingPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [savedSongs, setSavedSongs] = useState<number[]>([0, 2, 4]);
  const [lastPlayed, setLastPlayed] = useState<number | null>(() => {
    const saved = localStorage.getItem('soundHealingLastPlayed');
    return saved ? parseInt(saved) : 0;
  });
  const [nowPlaying, setNowPlaying] = useState<number | null>(lastPlayed);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState<number[]>(() => {
    const saved = localStorage.getItem('soundHealingRecentlyPlayed');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [volume, setVolume] = useState(75);

  const playlists = [
    { id: 'liked', name: 'Saved Collection', songs: savedSongs },
    { id: 'meditation', name: 'Meditation Journey', songs: [0, 1, 2] },
    { id: 'nature', name: 'Nature\'s Symphony', songs: [1, 4] },
    { id: 'healing', name: 'Sacred Frequencies', songs: [2, 3, 5] },
    { id: 'sleep', name: 'Peaceful Slumber', songs: [0, 1, 4] },
  ];

  const handleSaveToggle = (songIndex: number) => {
    if (savedSongs.includes(songIndex)) {
      setSavedSongs(savedSongs.filter(idx => idx !== songIndex));
    } else {
      setSavedSongs([...savedSongs, songIndex]);
    }
  };

  useEffect(() => {
    if (nowPlaying !== null) {
      setLastPlayed(nowPlaying);
      localStorage.setItem('soundHealingLastPlayed', nowPlaying.toString());
      setRecentlyPlayed((prev) => {
        const updated = [nowPlaying, ...prev.filter(id => id !== nowPlaying)].slice(0, 10);
        localStorage.setItem('soundHealingRecentlyPlayed', JSON.stringify(updated));
        return updated;
      });
    }
  }, [nowPlaying]);

  const handlePlaylistClick = (playlistId: string) => {
    setSelectedPlaylist(selectedPlaylist === playlistId ? null : playlistId);
  };

  const handleCardClick = (songIndex: number) => {
    setActiveCard(songIndex);
    setNowPlaying(songIndex);
    setIsPlaying(true);
    setPlayProgress(0);
  };

  const closeActiveCard = () => {
    setActiveCard(null);
  };

  const soundLibrary = [
    {
      title: "Tibetan Singing Bowls",
      artist: "Sacred Sounds Collective",
      frequency: "432 Hz",
      duration: "15:30",
      category: "Bowl Therapy",
      description: "Ancient healing vibrations from the Himalayas that promote deep relaxation and spiritual awakening.",
    },
    {
      title: "Ocean Waves & Rain",
      artist: "Nature Symphony",
      frequency: "528 Hz",
      duration: "20:00",
      category: "Nature Sounds",
      description: "Soothing symphony of ocean waves meeting gentle rainfall for tranquility.",
    },
    {
      title: "Theta Binaural Beats",
      artist: "NeuroSound Lab",
      frequency: "639 Hz",
      duration: "30:00",
      category: "Binaural",
      description: "Scientifically crafted frequencies for deep meditation and clarity.",
    },
    {
      title: "Crystal Bowl Meditation",
      artist: "Quantum Healing",
      frequency: "741 Hz",
      duration: "18:45",
      category: "Crystal Therapy",
      description: "Pure crystal tones for cellular rejuvenation and inner peace.",
    },
    {
      title: "Forest Ambience",
      artist: "Earth Sounds",
      frequency: "396 Hz",
      duration: "25:00",
      category: "Nature Sounds",
      description: "Ancient forest with birds singing and leaves rustling gently.",
    },
    {
      title: "Chakra Tuning",
      artist: "Energy Masters",
      frequency: "852 Hz",
      duration: "22:30",
      category: "Chakra Healing",
      description: "Balance all seven energy centers for complete harmony.",
    },
  ];

  const trackImages = [
    '/sound/tibetan_bowls.png',
    '/sound/ocean_waves.png',
    '/sound/binaural_beats.png',
    '/sound/crystal_bowls.png',
    '/sound/forest_ambience.png',
    '/sound/chakra_tuning.png',
  ];

  useEffect(() => {
    if (nowPlaying === null) {
      setNowPlaying(lastPlayed !== null ? lastPlayed : 0);
    }
  }, [lastPlayed]);

  const currentPlayingIndex = nowPlaying !== null ? nowPlaying : 0;
  const currentTrack = soundLibrary[currentPlayingIndex];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setPlayProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.05;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const formatTime = (progress: number, totalDuration: string) => {
    const [mins, secs] = totalDuration.split(':').map(Number);
    const totalSecs = mins * 60 + secs;
    const currentSecs = Math.floor((progress / 100) * totalSecs);
    const currentMins = Math.floor(currentSecs / 60);
    const remainingSecs = currentSecs % 60;
    return `${currentMins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const scrollHideClass = "scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#fdfcfb] via-[#f8f7f4] to-[#f5f4f1] pt-20">
      {/* Subtle Background Texture */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-teal-100/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* 3-Column Layout */}
      <div className="flex h-[calc(100vh-5rem)] px-3 gap-3">

        {/* LEFT SIDEBAR - Classical Style */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`hidden lg:flex lg:flex-col w-[280px] flex-shrink-0 ${scrollHideClass}`}
        >
          <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
            {/* Library Header */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: "'Cinzel', serif" }}>
                  Your Library
                </h2>
                <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Playlists */}
            <div className={`flex-1 overflow-y-auto p-3 ${scrollHideClass}`}>
              {playlists.map((playlist, idx) => (
                <motion.div
                  key={playlist.id}
                  whileHover={{ x: 4 }}
                  onClick={() => handlePlaylistClick(playlist.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all mb-1 ${selectedPlaylist === playlist.id
                    ? 'bg-emerald-50 border border-emerald-200'
                    : 'hover:bg-gray-50'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden ${playlist.id === 'liked'
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                    : ''
                    }`}>
                    {playlist.id === 'liked' ? (
                      <Heart className="w-5 h-5 text-white fill-white" />
                    ) : (
                      <img
                        src={trackImages[idx % trackImages.length]}
                        alt={playlist.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {playlist.name}
                    </p>
                    <p className="text-xs text-gray-500">{playlist.songs.length} tracks</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CENTER CONTENT - Classical Cards */}
        <div className={`flex-1 overflow-hidden ${scrollHideClass}`}>
          <div className={`h-full overflow-y-auto ${scrollHideClass}`}>
            {/* Hero Section */}
            <div className="px-6 pt-4 pb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                  Sound Healing Library
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Discover ancient frequencies designed to restore balance and elevate consciousness
                </p>
              </motion.div>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search healing sounds..."
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-full text-gray-700 placeholder-gray-400 border border-gray-200 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 shadow-sm transition-all"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                />
              </div>
            </div>

            {/* Featured Section */}
            <div className="px-6 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-8 shadow-xl"
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 border border-white/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 border border-white/20 rounded-full translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="relative flex items-center gap-8">
                  <motion.div
                    className="w-36 h-36 rounded-xl overflow-hidden shadow-2xl flex-shrink-0 border-2 border-white/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={trackImages[0]}
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-xs font-medium mb-3">
                      ✦ Featured Today
                    </span>
                    <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                      {soundLibrary[0].title}
                    </h2>
                    <p className="text-white/80 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>{soundLibrary[0].artist}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCardClick(0)}
                      className="flex items-center gap-2 px-6 py-2.5 bg-white rounded-full text-emerald-700 font-semibold shadow-lg hover:shadow-xl transition-all"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <Play className="w-5 h-5" fill="currentColor" />
                      Play Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sacred Collection - Classical Cards */}
            <div className="px-6 mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Cinzel', serif" }}>
                  Sacred Collection
                </h2>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {soundLibrary.map((track, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -6 }}
                    onClick={() => handleCardClick(idx)}
                    className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {/* Card Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={trackImages[idx]}
                        alt={track.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      {/* Play Button */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        className="absolute bottom-4 right-4 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                      </motion.button>

                      {/* Duration Badge */}
                      <div className="absolute top-4 right-4 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-md">
                        <span className="text-white text-xs font-medium">{track.duration}</span>
                      </div>
                    </div>

                    {/* Card Content - Classical Style */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 mb-1 truncate" style={{ fontFamily: "'Cinzel', serif" }}>
                            {track.title}
                          </h3>
                          <p className="text-sm text-gray-500 truncate" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            {track.artist}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveToggle(idx);
                          }}
                          className={`flex-shrink-0 p-2 rounded-full transition-colors ${savedSongs.includes(idx)
                            ? 'text-emerald-500 bg-emerald-50'
                            : 'text-gray-400 hover:text-emerald-500 hover:bg-emerald-50'
                            }`}
                        >
                          <Bookmark className={`w-5 h-5 ${savedSongs.includes(idx) ? 'fill-current' : ''}`} />
                        </motion.button>
                      </div>

                      {/* Classical Divider */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                        <span className="text-gray-400 text-xs">✦</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-emerald-600 font-medium px-2 py-1 bg-emerald-50 rounded-full">
                          {track.category}
                        </span>
                        <span className="text-xs text-gray-500">{track.frequency}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recently Played */}
            {recentlyPlayed.length > 0 && (
              <div className="px-6 mb-10 pb-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Cinzel', serif" }}>
                    Recently Played
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {recentlyPlayed.slice(0, 4).map((trackIdx) => {
                    const track = soundLibrary[trackIdx];
                    if (!track) return null;
                    return (
                      <motion.div
                        key={trackIdx}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleCardClick(trackIdx)}
                        className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-200/60 cursor-pointer hover:bg-white hover:shadow-md transition-all group"
                      >
                        <img
                          src={trackImages[trackIdx]}
                          alt={track.title}
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{track.title}</p>
                          <p className="text-xs text-gray-500 truncate">{track.artist}</p>
                        </div>
                        <Play className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR - Now Playing */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`hidden xl:flex xl:flex-col w-[300px] flex-shrink-0 ${scrollHideClass}`}
        >
          <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: "'Cinzel', serif" }}>
                Now Playing
              </h2>
            </div>

            <div className={`flex-1 overflow-y-auto p-5 ${scrollHideClass}`}>
              {/* Album Art */}
              <div className="relative mb-5">
                <motion.img
                  src={trackImages[currentPlayingIndex]}
                  alt={currentTrack?.title}
                  className="w-full aspect-square object-cover rounded-xl shadow-lg border border-gray-100"
                  animate={{ scale: isPlaying ? [1, 1.01, 1] : 1 }}
                  transition={{ duration: 3, repeat: isPlaying ? Infinity : 0 }}
                />
                {isPlaying && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-3 py-1.5 bg-emerald-500 rounded-full">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-white rounded-full"
                        animate={{ height: [4, 12, 4] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Track Info */}
              <div className="text-center mb-5">
                <h3 className="font-bold text-xl text-gray-800 mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                  {currentTrack?.title}
                </h3>
                <p className="text-gray-500" style={{ fontFamily: "'Poppins', sans-serif" }}>{currentTrack?.artist}</p>
              </div>

              {/* Classical Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                <span className="text-emerald-500 text-sm">✦</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              </div>

              {/* Progress */}
              <div className="mb-5">
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    style={{ width: `${playProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{formatTime(playProgress, currentTrack?.duration || "0:00")}</span>
                  <span>{currentTrack?.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3 mb-5">
                <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                  <Shuffle className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                  <SkipBack className="w-5 h-5" fill="currentColor" />
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" fill="white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                  )}
                </motion.button>
                <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                  <SkipForward className="w-5 h-5" fill="currentColor" />
                </button>
                <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                  <Repeat className="w-5 h-5" />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-gray-400" />
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${volume}%` }} />
                </div>
              </div>

              {/* Track Details */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Details</p>
                <p className="text-sm text-gray-600" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {currentTrack?.category} · {currentTrack?.frequency}
                </p>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  {currentTrack?.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MODAL PLAYER */}
      <AnimatePresence>
        {activeCard !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            onClick={closeActiveCard}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeActiveCard}
                className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>

              <div className="p-8">
                {/* Album Art & Info */}
                <div className="flex items-start gap-6 mb-6">
                  <motion.img
                    src={trackImages[activeCard % trackImages.length]}
                    alt={soundLibrary[activeCard]?.title}
                    className="w-40 h-40 rounded-2xl object-cover shadow-2xl border-2 border-white/20"
                    animate={{ scale: isPlaying ? [1, 1.02, 1] : 1 }}
                    transition={{ duration: 3, repeat: isPlaying ? Infinity : 0 }}
                  />
                  <div className="flex-1 pt-2">
                    <p className="text-white/70 text-xs uppercase tracking-widest mb-2">Now Playing</p>
                    <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                      {soundLibrary[activeCard]?.title}
                    </h3>
                    <p className="text-emerald-100 mb-4">{soundLibrary[activeCard]?.artist}</p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-white/15 text-white rounded-full text-xs">
                        {soundLibrary[activeCard]?.category}
                      </span>
                      <span className="px-3 py-1 bg-white/15 text-white rounded-full text-xs">
                        {soundLibrary[activeCard]?.frequency}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className="h-full bg-white"
                      style={{ width: `${playProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-white/70">
                    <span>{formatTime(playProgress, soundLibrary[activeCard]?.duration || "0:00")}</span>
                    <span>{soundLibrary[activeCard]?.duration}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-5 mb-6">
                  <button className="p-2 text-white/60 hover:text-white transition-colors">
                    <Shuffle className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-white hover:scale-105 transition-transform">
                    <SkipBack className="w-6 h-6" fill="currentColor" />
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl"
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7 text-emerald-600" fill="currentColor" />
                    ) : (
                      <Play className="w-7 h-7 text-emerald-600 ml-1" fill="currentColor" />
                    )}
                  </motion.button>
                  <button className="p-2 text-white hover:scale-105 transition-transform">
                    <SkipForward className="w-6 h-6" fill="currentColor" />
                  </button>
                  <button className="p-2 text-white/60 hover:text-white transition-colors">
                    <Repeat className="w-5 h-5" />
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleSaveToggle(activeCard)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${savedSongs.includes(activeCard)
                      ? 'bg-white text-emerald-600'
                      : 'bg-white/15 text-white hover:bg-white/25'
                      }`}
                  >
                    <Bookmark className={`w-4 h-4 ${savedSongs.includes(activeCard) ? 'fill-current' : ''}`} />
                    {savedSongs.includes(activeCard) ? 'Saved' : 'Save'}
                  </motion.button>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-white/15 text-white rounded-full text-sm font-medium hover:bg-white/25 transition-colors">
                    <ListPlus className="w-4 h-4" />
                    Add to Playlist
                  </button>
                  <button className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center text-white hover:bg-white/25 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
