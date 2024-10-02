import React from 'react';
import './NewsCard.css';

const NewsCard = ({ article }) => {
  const { title, description, urlToImage, url, source } = article;

  // Placeholder image URL
  const placeholderImage = 'https://via.placeholder.com/300x180.png?text=Image+Not+Found';

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="news-link">
      <div className="news-card">
        {/* Use placeholder image if urlToImage is not available */}
        <img src={urlToImage || placeholderImage} alt="News" />
        <div className="news-content">
          <h2>{title}</h2>
          <p>{description}</p>
          <p className="news-source">Source: {source.name}</p>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
