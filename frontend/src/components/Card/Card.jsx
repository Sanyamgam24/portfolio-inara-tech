/**
 * --------------------------------------------------
 * Component: Card
 *
 * Purpose:
 *   Renders a single portfolio section card with
 *   a full-bleed image, gradient overlay, section
 *   title, and CSS-driven hover micro-animations.
 *
 * Responsibilities:
 *   - Display the card background image
 *   - Render dark gradient overlay for text legibility
 *   - Show "VIEW CASE STUDY" label (reveals on hover)
 *   - Show section title
 *   - Show expanding accent underline (reveals on hover)
 *   - Inject accentColor as CSS custom property
 *
 * Props:
 *   title       {string}  — Section name (e.g. "Education")
 *   image       {string}  — Imported image module URL
 *   isActive    {boolean} — Whether this is the centered card
 *   accentColor {string}  — CSS color for accent elements
 *
 * State: None
 *
 * NOTE: Click handling is NOT in this component.
 *   It lives in Slider.jsx's motion.div wrapper
 *   to keep Card purely presentational.
 *
 * Reusable: Yes
 * --------------------------------------------------
 */

import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, image, isActive, accentColor }) => {
  return (
    <div className={styles.cardContent} style={{ '--accent-color': accentColor }}>
      <div className={styles.imageWrapper}>
        <img 
          src={image} 
          alt={`${title} project view`} 
          className={styles.cardImg}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.contentOverlay}>
        <span className={styles.sub}>VIEW CASE STUDY</span>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.borderLine} />
      </div>
    </div>
  );
};

export default Card;
