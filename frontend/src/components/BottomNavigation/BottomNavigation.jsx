/**
 * --------------------------------------------------
 * Component: BottomNavigation
 *
 * Purpose:
 *   Floating glassmorphism control panel fixed at
 *   the bottom of the Landing page. Shows the current
 *   active section and provides prev/next navigation.
 *
 * Responsibilities:
 *   - Show thumbnail of the currently active card
 *   - Display "Active Showcase" label and section title
 *   - Provide prev (←) and next (→) navigation buttons
 *   - Show current position indicator (e.g. "2 / 5")
 *   - Render extensible menu (☰) button
 *   - Apply accentColor to thumbnail border via CSS var
 *
 * Props:
 *   cards         {Array}    — Full sliderData array
 *   activeIndex   {number}   — Currently active card index
 *   setActiveIndex {function} — Callback to change index
 *   accentColor   {string}   — CSS color for thumbnail border
 *
 * State: None
 *
 * Dependencies:
 *   - react-icons/io5 (chevron and menu icons)
 *
 * Reusable: Yes
 * --------------------------------------------------
 */

import React from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline, IoMenuOutline } from 'react-icons/io5';
import styles from './BottomNavigation.module.css';

const BottomNavigation = ({ cards, activeIndex, setActiveIndex, accentColor }) => {
  const currentCard = cards[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <nav className={styles.navContainer} style={{ '--accent-color': accentColor }}>
      <div className={styles.navPanel}>
        {/* Project Thumbnail & Info */}
        <div className={styles.projectInfo}>
          <div className={styles.thumbnailWrapper}>
            <img 
              src={currentCard.image} 
              alt={currentCard.title} 
              className={styles.thumbnail}
            />
          </div>
          <div className={styles.textWrapper}>
            <span className={styles.activeLabel}>Active Showcase</span>
            <span className={styles.title}>{currentCard.title}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className={styles.controls}>
          <button 
            className={styles.navBtn} 
            onClick={handlePrev}
            aria-label="Previous Project"
          >
            <IoChevronBackOutline />
          </button>
          
          <div className={styles.pagination}>
            {activeIndex + 1} <span className={styles.divider}>/</span> {cards.length}
          </div>

          <button 
            className={styles.navBtn} 
            onClick={handleNext}
            aria-label="Next Project"
          >
            <IoChevronForwardOutline />
          </button>

          <div className={styles.separator} />

          <button 
            className={styles.menuBtn} 
            aria-label="Open Project List"
            onClick={() => {
              // Designed for future extensibility (e.g. list overlay)
            }}
          >
            <IoMenuOutline />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
