import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../utils/animations';
import styles from '../../styles/components/Hero.module.css';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div id="hero" className={styles.container}>
      {/* Cinematic Video Background */}
      <motion.div className={styles.videoWrapper} style={{ y }}>
        <div className={styles.overlay} />
        <div className={styles.iframeContainer}>
          <iframe
            src="https://www.youtube.com/embed/ChxDEAN8EtY?autoplay=1&mute=1&controls=0&showinfo=0&autohide=1&loop=1&playlist=ChxDEAN8EtY&playsinline=1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className={styles.iframe}
          />
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className={styles.content}
      >
        <div className={styles.titleWrapper}>
          <motion.h1 className={`display-heading ${styles.title}`} variants={staggerItem}>
            LNA_STUDIO
          </motion.h1>
        </div>

        <div className={styles.subtitleWrapper}>
          <motion.p className={styles.subtitle} variants={staggerItem}>
            Mnl. / Edit / Grade
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className={styles.scrollIndicator}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className={styles.scrollLine}
        />
      </motion.div>
    </div>
  );
}
