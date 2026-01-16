/**
 * Format text with **bold** markers into React elements
 * Converts **text** to <strong>text</strong>
 */
export function formatBoldText(text) {
  if (!text || typeof text !== 'string') return text;
  
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

/**
 * Split text by paragraphs and format each with bold markers
 */
export function formatParagraphsWithBold(text) {
  if (!text) return null;
  
  return text.split('\n\n').map((para, idx) => (
    <p key={idx}>{formatBoldText(para)}</p>
  ));
}
