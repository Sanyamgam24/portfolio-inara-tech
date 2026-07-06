/**
 * --------------------------------------------------
 * Component: Business (Page)
 *
 * Purpose:
 *   Placeholder page for the Business portfolio section.
 *   Finds its own data from sliderData based on route
 *   and renders the Hero header + future content area.
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
import styles from './Business.module.css';

const Business = () => {
  const pageData = sliderData.find(item => item.route === '/business');

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
            <h3>Enterprise Innovation & Scale Modules</h3>
            <p>Financial charts, partnership frameworks, business intelligence analytics, and portfolio metrics will be integrated into this section by the business development team.</p>
            <div className={styles.glowCircle} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Business;
