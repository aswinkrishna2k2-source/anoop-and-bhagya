import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { wedding } from '../data/wedding.js';
import { ShareIcon } from './Art.jsx';
import Reveal from './Reveal.jsx';

export default function Footer() {
  const [toast, setToast] = useState('');

  const share = async () => {
    const data = {
      title: `${wedding.coupleShort} · Wedding Invitation`,
      text: `You're invited to the wedding of ${wedding.groom} & ${wedding.bride} — ${wedding.dateLong}, ${wedding.city}.`,
      url: window.location.href.split('#')[0],
    };
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(data.url);
      setToast('Link copied');
    } catch (e) {
      if (e?.name !== 'AbortError') setToast('Copy the link from your browser');
    }
    setTimeout(() => setToast(''), 2200);
  };

  return (
    <footer className="section paper footer">
      <div className="wrap center">
        <Reveal>
          <p className="kicker">{wedding.sharing.label}</p>
          <p className="sharing">{wedding.sharing.names}</p>
        </Reveal>
        <Reveal delay={0.1} className="footer-actions">
          <button className="btn btn-cherry" onClick={share}><ShareIcon /> Share Invitation</button>
        </Reveal>
        <p className="fine">{wedding.coupleShort} · {wedding.dateDots}</p>
      </div>
      <AnimatePresence>
        {toast && (
          <motion.div className="toast" role="status"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
