/**
 * Map G606 cruise guide port names to port guide slugs
 * Used to load port guide images in the cruise companion
 */
export function getPortGuideSlugFromG606PortName(portName) {
  const mapping = {
    'La Coruña': 'a-coruna',
    'Tenerife': 'santa-cruz-de-tenerife',
    'Gran Canaria': 'las-palmas-gran-canaria',
    'Lanzarote': 'lanzarote', // Will be created
    'Cádiz': 'cadiz',
    'Cadiz': 'cadiz', // Handle both spellings
    'Lisbon': 'lisbon',
    'Southampton': 'southampton',
  };
  
  return mapping[portName] || null;
}
