import { useState } from 'react'

function normalizeImagePath(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) return path
  return `/${path}`
}

export default function BlogCard({ post, delay }) {
  const [hasImageError, setHasImageError] = useState(false)
  const imageSrc = normalizeImagePath(post.image)

  return (
    <a
      href={post.href}
      target="_blank"
      rel="noreferrer noopener"
      className="content-card lift block"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="blog-layout">
        <div className="blog-image-wrap">
          {imageSrc && !hasImageError ? (
            <img
              src={imageSrc}
              alt={post.title}
              className="blog-image"
              loading="lazy"
              onError={() => setHasImageError(true)}
            />
          ) : (
            <div className="blog-image blog-image--placeholder">
              <span className="meta-text">Add blog image</span>
            </div>
          )}
        </div>

        <div>
          {/* <p className="meta-text">{post.year}</p> */}
          <h3 className="content-title mt-2">{post.title}</h3>
          <p className="content-body mt-3">{post.excerpt}</p>
        </div>
      </div>
    </a>
  )
}
