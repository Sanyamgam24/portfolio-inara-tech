/**
 * --------------------------------------------------
 * Component: Blog (Page)
 *
 * Purpose:
 *   Placeholder page for the Blog portfolio section.
 *   Finds its own data from sliderData based on route
 *   and renders the Hero header + future content area.
 *   Designed to eventually connect to a backend API.
 *
 * Responsibilities:
 *   - Fetch section data (title, tagline, etc.) via route
 *   - Pass data to reusable Hero component
 *   - Render placeholder card for future content
 *
 * State: None
 *
 * Dependencies:
 *   - data/sliderData
 *   - components/Hero/Hero
 *
 * Reusable: No (page component)
 * --------------------------------------------------
 */

import React from 'react';
import Hero from '../../components/Hero/Hero';
import { sliderData } from '../../data/sliderData';
import styles from './Blog.module.css';

const Blog = () => {
  const pageData = sliderData.find(item => item.route === '/blog');

  return (
    <div className={styles.pageContainer}>
      <Hero 
        title={pageData.title}
        tagline={pageData.tagline}
        description={pageData.description}
        accentColor={pageData.accentColor}
        bgGradient={pageData.bgGradient}
      />
      
      <main className={styles.mainContent}>
        <section className={styles.futureContent} style={{ '--accent-color': pageData.accentColor }}>
          <div className={styles.placeholderCard}>
            <h3>Creative Engineering Deep-Dives</h3>
            <p>A dynamic blogging feed powered by an admin editorial dashboard will show here. API integration connecting backend endpoints will load articles, categories, and author metadata dynamically.</p>
            <div className={styles.glowCircle} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
