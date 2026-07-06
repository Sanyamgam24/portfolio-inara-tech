import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import styles from './StockMarket.module.css';

const StockMarket = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set document title
    const originalTitle = document.title;
    document.title = "My Investment Journey";

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.show);
          }
        });
      },
      { threshold: 0.2 }
    );

    const timelineItems = document.querySelectorAll(`.${styles.timelineItem}`);
    timelineItems.forEach((item) => observer.observe(item));

    const quoteCard = document.querySelector(`.${styles.quoteCard}`);
    if (quoteCard) {
      observer.observe(quoteCard);
    }

    return () => {
      document.title = originalTitle;
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.stockMarketPage}>
      {/* Back Button */}
      <button 
        className={styles.backButton} 
        onClick={() => navigate('/')}
        aria-label="Back to Home"
      >
        <IoArrowBackOutline className={styles.backIcon} />
        <span>Back</span>
      </button>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <p className={styles.heroTag}>MY INVESTMENT JOURNEY</p>
          <h1 className={styles.heroTitle}>
            Every Journey Starts <br />
            <span>with One Decision.</span>
          </h1>
          <p className={styles.heroText}>
            This page tells the story of my investment journey,
            the lessons I learned, and the milestones that shaped my future.
          </p>
          <div className={styles.heroDivider}>
            <div className={styles.line}></div>
            <div className={styles.dot}></div>
            <div className={styles.line}></div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={styles.timeline}>
        <h2 className={styles.timelineHeading}>THE STORY</h2>
        <div className={styles.timelineLine}></div>

        <div className={`${styles.timelineItem} ${styles.left}`}>
          <div className={styles.content}>
            <span className={styles.year}>2016</span>
            <h3>The Book That Changed Everything</h3>
            <p>
              Stumbled upon "The Intelligent Investor" in a second-hand shop.
              Those pages rewired how I thought about money and time.
            </p>
          </div>
        </div>

        <div className={`${styles.timelineItem} ${styles.right}`}>
          <div className={styles.content}>
            <span className={styles.year}>2017</span>
            <h3>Discovering the Stock Market</h3>
            <p>
              Started reading annual reports and learning how businesses work.
            </p>
          </div>
        </div>

        <div className={`${styles.timelineItem} ${styles.left}`}>
          <div className={styles.content}>
            <span className={styles.year}>2018</span>
            <h3>Opening My First Trading Account</h3>
            <p>
              My first investment marked the beginning of my journey.
            </p>
          </div>
        </div>

        <div className={`${styles.timelineItem} ${styles.right}`}>
          <div className={styles.content}>
            <span className={styles.year}>2019</span>
            <h3>Selling My Guitar to Invest ₹26,000</h3>
            <p>
              I sacrificed something I loved to invest in my future.
            </p>
          </div>
        </div>

        <div className={`${styles.timelineItem} ${styles.left}`}>
          <div className={styles.content}>
            <span className={styles.year}>2020</span>
            <h3>Borrowing ₹1,00,000 with a Promise</h3>
            <p>
              My father trusted me, and I promised to use it wisely.
            </p>
          </div>
        </div>

        <div className={`${styles.timelineItem} ${styles.right}`}>
          <div className={styles.content}>
            <span className={styles.year}>2021-22</span>
            <h3>The Roller-Coaster</h3>
            <p>
              Experienced ups and downs, learned valuable lessons, and kept growing.
            </p>
          </div>
        </div>

        <div className={`${styles.timelineItem} ${styles.left}`}>
          <div className={styles.content}>
            <span className={styles.year}>Today</span>
            <h3>Investing In Millions</h3>
            <p>
              The numbers grew, but what grew faster was patience.
              Every investment is still backed by the same curiosity
              that started it all.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className={styles.quoteSection}>
        <div className={styles.quoteCard}>
          <span className={styles.quoteIcon}>&ldquo;</span>
          <p className={styles.quoteText}>
            Success in investing isn't defined by where you start,
            but by your willingness to learn, stay patient,
            and keep moving forward.
          </p>
          <div className={styles.quoteFooter}>
            <div className={styles.line}></div>
            <span className={styles.quoteTitle}>A GUIDING PRINCIPLE</span>
            <div className={styles.line}></div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className={styles.footerSection}>
        <footer className={styles.footer}>
          <p>
            Built with patience &amp; perspective
            <span className={styles.dot}></span>
            My Investment Journey
          </p>
        </footer>
      </section>
    </div>
  );
};

export default StockMarket;
