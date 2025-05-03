'use client';

import React, { useState } from 'react';

const API_KEY = 'AIzaSyAHG6Wa5VImFFy0baJ0y-yzYBmQFSYnUyI';
const MAX_RESULTS = 5;

export default function YTHashtagGenerator() {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('English');
  const [hashtags, setHashtags] = useState([]);
  const [videoTitles, setVideoTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showControls, setShowControls] = useState(false);

  const resetAll = () => {
    setQuery('');
    setLanguage('English');
    setHashtags([]);
    setVideoTitles([]);
    setError('');
    setShowControls(false);
  };

  const generateHashtags = async () => {
    setError('');
    setLoading(true);
    setHashtags([]);
    setVideoTitles([]);
    setShowControls(false);

    if (!query.trim()) {
      setError('Please enter a keyword.');
      setLoading(false);
      return;
    }

    try {
      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${MAX_RESULTS}&q=${encodeURIComponent(
          query
        )}&key=${API_KEY}`
      );
      const searchData = await searchRes.json();
      const videoItems = searchData.items || [];

      if (!videoItems.length) throw new Error('No videos found.');

      const videoIds = videoItems.map((item) => item.id.videoId).join(',');
      setVideoTitles(videoItems.map((item) => item.snippet.title));

      const videosRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds}&key=${API_KEY}`
      );
      const videosData = await videosRes.json();

      const tagMap = {};
      videosData.items.forEach((video) => {
        (video.snippet.tags || []).forEach((tag) => {
          const hashTag = '#' + tag.replace(/\s+/g, '').toLowerCase();
          tagMap[hashTag] = (tagMap[hashTag] || 0) + 1;
        });
      });

      const sorted = Object.entries(tagMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([tag]) => tag);

      if (!sorted.length) throw new Error('No hashtags generated.');

      setHashtags(sorted);
      setShowControls(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyTags = (all) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const selected = Array.from(checkboxes)
      .filter((cb) => all || cb.checked)
      .map((cb) => cb.value);
    if (!selected.length) return;
    navigator.clipboard
      .writeText(selected.join(', '))
      .then(() =>
        alert(all ? 'All hashtags copied!' : 'Selected hashtags copied!')
      )
      .catch((err) => console.error('Copy failed', err));
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>
        YouTube Hashtag Generator
      </h1>

      {/* Styled Input + Dropdown Section */}
      <div
        style={{
          background: '#f9f9f9',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Enter your keyword
          </label>
          <input
            type="text"
            placeholder="youtube seo"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ddd',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ddd',
            }}
          >
            <option>English</option>
            <option>Spanish</option>
            <option>Hindi</option>
            <option>Bengali</option>
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={generateHashtags}
            style={{
              background: '#54ff00',
              color: '#000000',
              padding: '0.6rem 1.2rem',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
          <button
            onClick={resetAll}
            style={{
              background: '#54ff00',
              color: '#000000',
              padding: '0.6rem 1.2rem',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {videoTitles.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <strong>Top Videos:</strong>
          <ul>
            {videoTitles.map((title, i) => (
              <li key={i}>{title}</li>
            ))}
          </ul>
        </div>
      )}

      {showControls && (
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => copyTags(true)}
            style={{
              background: '#54ff00',
              color: '#000000',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
            }}
          >
            Copy All Hashtags
          </button>
          <button
            onClick={() => copyTags(false)}
            style={{
              background: '#54ff00',
              color: '#000000',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
            }}
          >
            Copy Selected Hashtags
          </button>
        </div>
      )}

      {hashtags.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginTop: '1rem',
          }}
        >
          {hashtags.map((tag, i) => (
            <div
              key={i}
              style={{
                background: '#f0f0f0',
                padding: '0.4rem 0.8rem',
                borderRadius: '0.4rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <input type="checkbox" value={tag} style={{ marginRight: '0.3rem' }} />
              <label>{tag}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}