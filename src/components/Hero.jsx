import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { wedding } from '../data/wedding.js';
import { Lotus, LotusSprig } from './Art.jsx';
import Petals from './Petals.jsx';

const EASE = [0.2, 0.7, 0.2, 1];

/** Calligraphy that appears as if written: a soft mask sweeps left to right. */
function Written({ children, delay = 0, className = '' }) {
  return (
    <span className={`written ${className}`} style={{ '--d': `${delay}s` }}>
      {children}
    </span>
  );
}

export default function Hero({ revealed }) {
  const ref = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(true);
  const reduce = useReducedMotion();

  // Scroll-linked: the hero is pinned while the next section slides over it.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.28]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);
  const darken = useTransform(scrollYProgress, [0, 0.9], [0, 0.7]);
  const textY = useTransform(scrollYProgress, [0, 0.8], ['0vh', '-16vh']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.94]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const fade = (delay) => ({
    initial: { opacity: 0, y: 14 },
    animate: revealed ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section className={`hero ${revealed ? 'is-revealed' : ''}`} id="home" ref={ref}>
      <motion.div
        className="hero-media"
        initial={{ scale: 1.2 }}
        animate={revealed ? { scale: 1.04 } : {}}
        transition={{ duration: 3.4, ease: [0.25, 0.6, 0.2, 1] }}
      >
        <motion.div className="hero-parallax" style={reduce ? undefined : { scale: imgScale, y: imgY }}>
          {hasPhoto ? (
            <img src="/couple.webp" alt="" onError={() => setHasPhoto(false)} fetchpriority="high" />
          ) : (
            <div className="hero-fallback">
              <LotusSprig className="hero-fallback-sprig" />
              <LotusSprig className="hero-fallback-sprig right" flip />
            </div>
          )}
        </motion.div>
      </motion.div>
      <div className="hero-tint" />
      <div className="hero-shade" />
      <div className="hero-grain" />
      <motion.div className="hero-scrolldim" style={{ opacity: reduce ? 0 : darken }} />
      <motion.div
        className="hero-dim"
        initial={{ opacity: 1 }}
        animate={revealed ? { opacity: 0 } : {}}
        transition={{ duration: 2.2, ease: 'easeOut', delay: 0.15 }}
      />

      {revealed && !reduce && <Petals />}

      <motion.div className="hero-layer" style={reduce ? undefined : { y: textY, opacity: textOpacity, scale: textScale }}>
        <div className="hero-content">
          <motion.div className="hero-lotus" {...fade(0.7)}><Lotus size={30} /></motion.div>
          <h1 className="hero-names" aria-label={`${wedding.groom} with ${wedding.bride}`}>
            <Written className="hero-name" delay={0.95}>{wedding.groom}</Written>
            <motion.span className="hero-with" {...fade(2.2)}><i /> with <i /></motion.span>
            <Written className="hero-name bride" delay={2.45}>{wedding.bride}</Written>
          </h1>
        </div>
      </motion.div>

      <motion.div className="scroll-cue-wrap" style={{ opacity: cueOpacity }}>
        <motion.a href="#countdown" className="scroll-cue" aria-label="Scroll to the countdown" {...fade(3.6)}>
          <span>Scroll</span>
          <i />
        </motion.a>
      </motion.div>
    </section>
  );
}
