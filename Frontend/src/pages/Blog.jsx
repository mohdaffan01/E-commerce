import React from 'react';
import './Blog.css';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: '7 Elements of a Productive Home Office Setup',
      category: 'Workspace Design',
      date: 'July 15, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=60',
      excerpt: 'Discover how choosing the right standing desk, ergonomic chair, and desk dividers can dramatically boost your energy and daily focus.',
      author: 'David Chen',
    },
    {
      id: 2,
      title: 'The Rise of Minimalist Office Furniture',
      category: 'Interior Style',
      date: 'June 28, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=60',
      excerpt: 'Why modern professionals are ditching bulky desks and heavy file drawers for light wood grain finishes and clean lines.',
      author: 'Sophia Rossi',
    },
    {
      id: 3,
      title: 'How to Organize Your Storage Containers Like a Pro',
      category: 'Productivity Hacks',
      date: 'May 10, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1581241863380-935587b92f7f?w=600&auto=format&fit=crop&q=60',
      excerpt: 'Struggling with a cluttered desk? Learn simple tricks for color-coding, modular stacking, and indexing storage boxes.',
      author: 'Marcus Lin',
    },
  ];

  return (
    <div className="blog-page container">
      <div className="page-header">
        <h1>ChicCart Insights</h1>
        <p className="blog-subtitle">Workspace design tips, product guides, and lifestyle inspiration</p>
      </div>

      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post.id} className="blog-card">
            <div className="blog-card-image">
              <img src={post.image} alt={post.title} loading="lazy" />
              <span className="blog-category-badge">{post.category}</span>
            </div>

            <div className="blog-card-content">
              <div className="blog-meta">
                <span>{post.date}</span>
                <span className="divider">&bull;</span>
                <span>{post.readTime}</span>
              </div>
              
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              
              <div className="blog-card-footer">
                <span className="blog-author">By {post.author}</span>
                <button 
                  onClick={() => alert(`This mock article "${post.title}" is for demonstration purposes.`)}
                  className="blog-read-more"
                >
                  Read More &rarr;
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
