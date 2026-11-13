import { useEffect, useState } from 'react';
import Cover from './components/Cover.jsx';
import Hero from './components/Hero.jsx';
import Countdown from './components/Countdown.jsx';
import Events from './components/Events.jsx';
import Footer from './components/Footer.jsx';
import MusicToggle from './components/MusicToggle.jsx';

export default function App() {
  const [opened, setOpened] = useState(false);     // seal broken → hero starts revealing
  const [coverGone, setCoverGone] = useState(false); // gatefold fully open → remove cover

  // Keep the page still until the card has been opened.
  useEffect(() => {
    document.documentElement.classList.toggle('locked', !coverGone);
    if (!coverGone) window.scrollTo(0, 0);
  }, [coverGone]);

  return (
    <>
      <main className="site">
        <Hero revealed={opened} />
        <Countdown />
        <Events />
        {/* Photo gallery: add a <Gallery /> section here later. */}
        <Footer />
      </main>
      {!coverGone && <Cover onOpen={() => setOpened(true)} onDone={() => setCoverGone(true)} />}
      {coverGone && <MusicToggle />}
    </>
  );
}
