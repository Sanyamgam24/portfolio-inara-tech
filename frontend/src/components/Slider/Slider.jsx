/**
 * --------------------------------------------------
 * Component: Slider
 *
 * Purpose:
 *   Orchestrates the 3D Apple-style card track.
 *   Calculates positions for every card, applies
 *   spring animations, handles touch swipe, and
 *   registers keyboard navigation.
 *
 * Responsibilities:
 *   - Calculate circular card positions (prev, active, next)
 *   - Apply Framer Motion spring transitions to all cards
 *   - Handle left/right swipe drag gestures
 *   - Handle ArrowLeft, ArrowRight, Enter keyboard events
 *   - Navigate to card route on active card click
 *   - Pull side cards to center on side card click
 *   - Detect mobile breakpoint and adjust layout
 *
 * Props:
 *   cards         {Array}    — Full sliderData array
 *   activeIndex   {number}   — Currently centered card index
 *   setActiveIndex {function} — Callback to update index
 *
 * State:
 *   isMobile {boolean} — True when window.innerWidth <= 768px
 *
 * Dependencies:
 *   - framer-motion (motion, drag)
 *   - react-router-dom (useNavigate)
 *   - components/Card/Card
 *
 * Reusable: Yes
 * --------------------------------------------------
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../Card/Card';
import styles from './Slider.module.css';

const Slider = ({ cards, activeIndex, setActiveIndex }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  // Keyboard navigation for accessibillity
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Enter') {
        navigate(cards[activeIndex].route);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, cards, navigate]);

  return (
    <div className={styles.sliderContainer}>
      <motion.div 
        className={styles.track}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          const swipeThreshold = 50;
          if (info.offset.x < -swipeThreshold) {
            handleNext();
          } else if (info.offset.x > swipeThreshold) {
            handlePrev();
          }
        }}
      >
        {cards.map((card, index) => {
          // Circular index distance calculation
          let diff = index - activeIndex;
          const n = cards.length;
          if (diff < -Math.floor(n / 2)) diff += n;
          if (diff > Math.floor(n / 2)) diff -= n;

          const isActive = diff === 0;
          const isPrev = diff === -1;
          const isNext = diff === 1;

          // Responsive positions and fold rotations
          let xValue = 0;
          let scaleValue = 1;
          let opacityValue = 1;
          let zIndexValue = 1;
          let rotateYValue = 0;

          if (isMobile) {
            if (isActive) {
              xValue = 0;
              scaleValue = 1;
              opacityValue = 1;
              zIndexValue = 5;
            } else {
              xValue = diff < 0 ? -300 : 300;
              scaleValue = 0.7;
              opacityValue = 0; // Hide on mobile for single centered card look
              zIndexValue = 1;
            }
          } else {
            // Desktop/Tablet flow layout
            if (isActive) {
              xValue = 0;
              scaleValue = 1;
              opacityValue = 1;
              zIndexValue = 5;
              rotateYValue = 0;
            } else if (isPrev) {
              xValue = '-22vw';
              scaleValue = 0.8;
              opacityValue = 0.45;
              zIndexValue = 3;
              rotateYValue = 15;
            } else if (isNext) {
              xValue = '22vw';
              scaleValue = 0.8;
              opacityValue = 0.45;
              zIndexValue = 3;
              rotateYValue = -15;
            } else {
              xValue = diff < 0 ? '-45vw' : '45vw';
              scaleValue = 0.65;
              opacityValue = 0;
              zIndexValue = 1;
              rotateYValue = diff < 0 ? 30 : -30;
            }
          }

          return (
            <motion.div
              key={card.id}
              className={styles.cardWrapper}
              style={{
                zIndex: zIndexValue,
                perspective: 1000,
              }}
              animate={{
                x: xValue,
                scale: scaleValue,
                opacity: opacityValue,
                rotateY: rotateYValue,
              }}
              transition={{
                type: 'spring',
                stiffness: 170,
                damping: 24,
                mass: 0.8,
              }}
              onClick={() => {
                if (isActive) {
                  navigate(card.route);
                } else {
                  setActiveIndex(index);
                }
              }}
            >
              <Card 
                title={card.title}
                image={card.image}
                isActive={isActive}
                accentColor={card.accentColor}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Slider;
