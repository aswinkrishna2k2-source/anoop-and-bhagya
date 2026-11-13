import { wedding } from '../data/wedding.js';
import { ArrowIcon, ExternalIcon, KalashIcon, Lotus } from './Art.jsx';
import Reveal from './Reveal.jsx';

// keep "10:30 AM" together when a line wraps
const nb = (s) => s && s.replace(/ (AM|PM)\b/g, ' $1');

function EventCard({ index, title, icon, rows, place, delay = 0 }) {
  return (
    <Reveal className="ev" delay={delay}>
      <span className="ev-watermark" aria-hidden="true">{index}</span>
      <div className="ev-head">
        <span className="ev-index">{index}</span>
        <span className="ev-icon">{icon}</span>
      </div>
      <h3 className="ev-title">{title}</h3>

      <dl className="ev-rows">
        {rows.map(([label, value, sub]) => (
          <div className="ev-row" key={label}>
            <dt>{label}</dt>
            <dd>{nb(value)}{sub && <span>{nb(sub)}</span>}</dd>
          </div>
        ))}
      </dl>

      <a className="btn btn-gold ev-cta" href={place.directions} target="_blank" rel="noopener noreferrer">
        <span>Get Directions</span><ArrowIcon />
      </a>
      <a className="ev-link" href={place.map} target="_blank" rel="noopener noreferrer">
        Open in Google Maps <ExternalIcon />
      </a>
    </Reveal>
  );
}

export default function Events() {
  const { venue, reception, muhurtham } = wedding;
  return (
    <section className="section cherry" id="events">
      <div className="wrap">
        <Reveal><p className="kicker center">When &amp; where</p></Reveal>
        <div className="ev-list">
          <EventCard
            index="01"
            title="Wedding"
            icon={<KalashIcon size={26} />}
            rows={[
              ['Date', wedding.dateLong, wedding.malayalamDate],
              [muhurtham.label, muhurtham.time],
              ['Venue', venue.name, venue.lines.join(', ')],
            ]}
            place={venue}
          />
          <EventCard
            index="02"
            title="Reception"
            icon={<Lotus size={28} />}
            rows={[
              ['Date', reception.when],
              ['Time', reception.time],
              ['Venue', reception.name, reception.lines.join(', ')],
            ]}
            place={reception}
            delay={0.05}
          />
        </div>
      </div>
    </section>
  );
}
