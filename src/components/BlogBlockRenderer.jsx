/**
 * Blog Block Renderer
 * Renders flexible blog content blocks
 */

import './blog-blocks.css'

function BlogBlockRenderer({ blocks }) {
  if (!blocks || !Array.isArray(blocks)) {
    return null
  }

  return (
    <div className="blog-blocks">
      {blocks.map(block => (
        <div key={block.id} className={`blog-block blog-block--${block.type}`}>
          {renderBlock(block)}
        </div>
      ))}
    </div>
  )
}

function renderBlock(block) {
  switch (block.type) {
    case 'text_section':
      return <TextSectionBlock {...block} />
    case 'image_left_text':
      return <ImageTextBlock {...block} position="left" />
    case 'image_right_text':
      return <ImageTextBlock {...block} position="right" />
    case 'full_width_image':
      return <FullWidthImageBlock {...block} />
    case 'links_section':
      return <LinksBlock {...block} />
    case 'amazon_products':
      return <AmazonProductsBlock {...block} />
    case 'comparison_table':
      return <TableBlock {...block} />
    case 'quote_callout':
      return <QuoteBlock {...block} />
    case 'faq_accordion':
      return <FAQBlock {...block} />
    default:
      return null
  }
}

// Individual block components
function TextSectionBlock({ title, titleLevel, content }) {
  const Heading = titleLevel || 'h2'
  return (
    <div className="text-section">
      {title && <Heading>{title}</Heading>}
      <div className="text-section__content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

function ImageTextBlock({ imageUrl, imageAlt, content, position }) {
  return (
    <div className={`image-text image-text--${position}`}>
      <div className="image-text__image">
        <img src={imageUrl} alt={imageAlt} loading="lazy" />
      </div>
      <div className="image-text__content">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}

function FullWidthImageBlock({ imageUrl, imageAlt, caption }) {
  return (
    <figure className="full-width-image">
      <img src={imageUrl} alt={imageAlt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

function LinksBlock({ title, links }) {
  return (
    <div className="links-section">
      {title && <h3>{title}</h3>}
      <div className="links-list">
        {links.map((link, i) => (
          <a key={i} href={link.url} className="link-card" target="_blank" rel="noopener noreferrer">
            <div className="link-card__title">{link.title}</div>
            {link.description && <div className="link-card__desc">{link.description}</div>}
          </a>
        ))}
      </div>
    </div>
  )
}

function AmazonProductsBlock({ title, products, showDisclosure, displayStyle }) {
  const style = displayStyle || 'cards'
  
  return (
    <div className={`amazon-products amazon-products--${style}`}>
      {title && <h3>{title}</h3>}
      <div className="product-cards">
        {products.map((product, i) => (
          <a 
            key={i} 
            href={`${product.url}?tag=limitless-21`} 
            className="product-card" 
            target="_blank" 
            rel="noopener noreferrer sponsored"
          >
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} loading="lazy" />
            )}
            <div className="product-card__name">{product.name}</div>
            {product.description && (
              <div className="product-card__desc">{product.description}</div>
            )}
          </a>
        ))}
      </div>
      {showDisclosure && (
        <p className="affiliate-disclosure">
          This article contains affiliate links. If you purchase through these links, we may earn a small commission at no extra cost to you.
        </p>
      )}
    </div>
  )
}

function TableBlock({ title, columns, rows }) {
  return (
    <div className="table-block">
      {title && <h3>{title}</h3>}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {columns.map((col, i) => <th key={i}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => <td key={j}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function QuoteBlock({ quote, author, variant }) {
  const variantClass = variant || 'default'
  return (
    <div className={`quote-block quote-block--${variantClass}`}>
      <blockquote>
        <p>{quote}</p>
        {author && <cite>— {author}</cite>}
      </blockquote>
    </div>
  )
}

function FAQBlock({ items }) {
  return (
    <div className="faq-block">
      <h3>Frequently Asked Questions</h3>
      <div className="faq-list">
        {items.map((item, i) => (
          <details key={i} className="faq-item">
            <summary>{item.question}</summary>
            <div className="faq-answer" dangerouslySetInnerHTML={{ __html: item.answer }} />
          </details>
        ))}
      </div>
    </div>
  )
}

export default BlogBlockRenderer
