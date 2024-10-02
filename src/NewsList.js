import React, { useState, useEffect, useRef } from 'react';
import { fetchTopHeadlines } from './NewsService';
import NewsCard from './NewsCard';
import Navbar from './Navbar'; // Import Navbar
import './NewsList.css';
import HashLoader from 'react-spinners/HashLoader'; // Import HashLoader

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(''); // State for category
  const observer = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const news = await fetchTopHeadlines(page, category); // Pass category to the fetch function
      const filteredArticles = news.filter(article => 
        article.title && article.description && article.url
      );
      setArticles(prevArticles => [...prevArticles, ...filteredArticles]);
      setLoading(false);
    };
    fetchData();
  }, [page, category]); // Depend on category

  const lastArticleRef = useRef();

  useEffect(() => {
    if (loading) return;

    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1); // Increment the page number when the last article is in view
      }
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0, // Trigger when 100% of the last article is in view
    };

    observer.current = new IntersectionObserver(callback, options);
    if (lastArticleRef.current) {
      observer.current.observe(lastArticleRef.current);
    }

    return () => {
      if (lastArticleRef.current) {
        observer.current.unobserve(lastArticleRef.current);
      }
    };
  }, [loading, articles]);

  const handleCategoryChange = (newCategory) => {
    setArticles([]); // Reset articles on category change
    setPage(1); // Reset page to 1
    setCategory(newCategory); // Update category
    setLoading(true); // Set loading to true
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <HashLoader size={50} color="#36d7b7" /> {/* Spinner while loading */}
      </div>
    );
  }

  return (
    <div>
      <Navbar onCategoryChange={handleCategoryChange} /> {/* Include Navbar */}
      <div className="news-list">
        {articles.length > 0 ? (
          articles.map((article, index) => {
            if (articles.length === index + 1) {
              return (
                <div ref={lastArticleRef} key={index}>
                  <NewsCard article={article} />
                </div>
              );
            } else {
              return <NewsCard key={index} article={article} />;
            }
          })
        ) : (
          <div>No news articles available.</div> // Message for no articles
        )}
      </div>
    </div>
  );
};

export default NewsList;
