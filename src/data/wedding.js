// All invitation content lives here. Edit this file to change any text.

const directions = (lat, lng) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;

export const wedding = {
  monogram: ['A', 'B'],
  groom: 'Anoop Krishnan',
  bride: 'Bhagya L.',
  coupleShort: 'Anoop & Bhagya',
  // Family names, home addresses and phone numbers are deliberately not included here:
  // anything in this file ships in the public site's code, even if it isn't displayed.

  dateLong: 'Sunday, 24 January 2027',
  dateDots: '24 · 01 · 2027',
  malayalamDate: '(1202 Makaram 10)',
  city: 'Kollam',

  muhurtham: {
    label: 'Muhurtham',
    time: 'Between 10:30 AM & 11:00 AM',
    start: '2027-01-24T10:30:00+05:30',
    end: '2027-01-24T11:00:00+05:30',
  },

  venue: {
    name: 'Sumangali Auditorium',
    lines: ['N. N. Complex', 'Ammachiveedu, Kollam'],
    lat: 8.8885496,
    lng: 76.5759631,
    directions: directions(8.8885496, 76.5759631),
    map: 'https://maps.google.com/?cid=17339573093524590977',
  },

  reception: {
    when: 'Sunday evening, 24 January 2027',
    time: 'From 04:30 PM onwards',
    start: '2027-01-24T16:30:00+05:30',
    name: 'Clouds Resort',
    lines: ['Nellimukk, Kollam'],
    lat: 8.8989275,
    lng: 76.5692182,
    directions: directions(8.8989275, 76.5692182),
    map: 'https://maps.google.com/?cid=8288861302747645849',
  },

  sharing: {
    label: 'Sharing the happiness',
    names: 'Aswin',
  },
};
