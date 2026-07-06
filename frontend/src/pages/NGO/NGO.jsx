/**
 * --------------------------------------------------
 * Component: NGO (Page)
 *
 * Purpose:
 *   Placeholder page for the NGO portfolio section.
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
import styles from './NGO.module.css';

const NGO = () => {
  const pageData = sliderData.find(item => item.route === '/ngo');

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
            <h3>Community Growth & Aid Operations</h3>
            <p>Project milestones, local engagement charts, donation flows, and live impact indicators will be implemented here in future development phases.</p>
            <div className={styles.glowCircle} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default NGO;
