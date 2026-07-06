/**
 * --------------------------------------------------
 * Component: BackgroundTypography
 *
 * Purpose:
 *   Renders a giant, ghost-faded typographic word
 *   that floats behind the card slider on the
 *   Landing page (e.g. "LEARN", "IMPACT", "WRITE").
 *
 * Responsibilities:
 *   - Receive a text string and render it oversized
 *   - Use AnimatePresence to crossfade between words
 *   - Animate word entry: y 50→0, scale 0.95→1
 *   - Animate word exit: y 0→-50, scale 1→1.02
 *   - Target opacity 0.03 creates the "ghost" effect
 *
 * Props:
 *   text {string} — The word to display (e.g. "LEARN")
 *
 * State: None
 *
 * Dependencies:
 *   - framer-motion (motion, AnimatePresence)
 *
 * Reusable: Yes — works with any string
 *
 * EDIT GUIDE: Change `bgTypography` in sliderData.js
 *   to update which word appears per section.
 * --------------------------------------------------
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BackgroundTypography.module.css';

const BackgroundTypography = ({ text }) => {
  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        <motion.h2
          key={text}
          className={styles.typography}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 0.03, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {text}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};

export default BackgroundTypography;
