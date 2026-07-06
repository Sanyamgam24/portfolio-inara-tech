/**
 * --------------------------------------------------
 * Component: Hero
 *
 * Purpose:
 *   Reusable full-width page header for all subpages.
 *   Displays back navigation, section tagline, h1
 *   title, description, and a decorative accent glow.
 *
 * Responsibilities:
 *   - Render the ← Back button (navigates to /)
 *   - Show accent-colored tagline label
 *   - Render the large h1 section title
 *   - Show section description text
 *   - Render ambient glow blob (accent color)
 *   - Apply bgGradient as header background
 *   - Inject accentColor as CSS custom property
 *
 * Props:
 *   title       {string} — Large heading text
 *   tagline     {string} — Small label above title
 *   description {string} — Paragraph description
 *   accentColor {string} — CSS color (hex/rgb)
 *   bgGradient  {string} — CSS gradient string
 *
 * State: None
 *
 * Dependencies:
 *   - react-router-dom (useNavigate)
 *   - react-icons/io5 (IoArrowBackOutline)
 *
 * Reusable: Yes — used by all 5 subpages
 * --------------------------------------------------
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import styles from './Hero.module.css';

const Hero = ({ title, tagline, description, accentColor, bgGradient }) => {
  const navigate = useNavigate();

  return (
    <header 
      className={styles.hero} 
      style={{ 
        background: bgGradient || 'linear-gradient(135deg, #0f0c1b 0%, #05020a 100%)',
        '--accent-color': accentColor || '#a855f7'
      }}
    >
      <button 
        className={styles.backButton} 
        onClick={() => navigate('/')}
        aria-label="Back to Home"
      >
        <IoArrowBackOutline className={styles.backIcon} />
        <span>Back</span>
      </button>

      <div className={styles.content}>
        <span className={styles.tagline} style={{ color: accentColor }}>
          {tagline}
        </span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.glow} style={{ background: `radial-gradient(circle, ${accentColor}1a 0%, transparent 70%)` }} />
    </header>
  );
};

export default Hero;
