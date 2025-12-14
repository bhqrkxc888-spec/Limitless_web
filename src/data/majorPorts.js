/**
 * Major Cruise Ports Data
 * Popular Mediterranean ports for weather/sea conditions display
 */

export const majorPorts = [
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    coordinates: { lat: 41.3851, lon: 2.1734 }
  },
  {
    id: 'gibraltar',
    name: 'Gibraltar',
    country: 'Gibraltar',
    coordinates: { lat: 36.1408, lon: -5.3536 }
  },
  {
    id: 'malaga',
    name: 'Málaga',
    country: 'Spain',
    coordinates: { lat: 36.7213, lon: -4.4214 }
  },
  {
    id: 'alicante',
    name: 'Alicante',
    country: 'Spain',
    coordinates: { lat: 38.3452, lon: -0.4810 }
  },
  {
    id: 'toulon',
    name: 'Toulon',
    country: 'France',
    coordinates: { lat: 43.1242, lon: 5.9280 }
  },
  {
    id: 'civitavecchia',
    name: 'Civitavecchia (Rome)',
    country: 'Italy',
    coordinates: { lat: 42.0934, lon: 11.7964 }
  },
  {
    id: 'athens',
    name: 'Piraeus (Athens)',
    country: 'Greece',
    coordinates: { lat: 37.9425, lon: 23.6467 }
  },
  {
    id: 'malta',
    name: 'Valletta',
    country: 'Malta',
    coordinates: { lat: 35.8989, lon: 14.5146 }
  },
  {
    id: 'ibiza',
    name: 'Ibiza',
    country: 'Spain',
    coordinates: { lat: 38.9067, lon: 1.4206 }
  }
];

// Helper functions
export const getPortById = (id) => majorPorts.find(port => port.id === id);
export const getAllPorts = () => [...majorPorts];
export const getRandomPorts = (count = 4) => {
  const shuffled = [...majorPorts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

