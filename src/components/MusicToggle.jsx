import { motion } from 'framer-motion';
import { toggleMusic, useMusicPlaying } from '../music.js';

/** Floating play/pause control with gently moving sound bars while playing. */
export default function MusicToggle() {
  const playing = useMusicPlaying();
  return (
    <motion.button
      className={`music ${playing ? 'is-playing' : ''}`}
      onClick={toggleMusic}
      aria-label={playing ? 'Pause music' : 'Play music'}
      aria-pressed={playing}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
      whileTap={{ scale: 0.92 }}
    >
      {playing ? (
        <span className="music-bars" aria-hidden="true"><i /><i /><i /><i /></span>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18 V5.5 L20 3.5 V16" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="17.5" cy="16" r="2.5" />
        </svg>
      )}
    </motion.button>
  );
}
