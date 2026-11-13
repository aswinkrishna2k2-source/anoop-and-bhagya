import { motion } from 'framer-motion';

/** Fades content up into place the first time it scrolls into view. */
export default function Reveal({ children, delay = 0, y = 26, className = '', as = 'div' }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.95, ease: [0.2, 0.7, 0.2, 1], delay }}
    >
      {children}
    </Tag>
  );
}
