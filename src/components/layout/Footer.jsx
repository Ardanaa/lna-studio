import React from 'react';
import { motion } from 'framer-motion';
import { scrollToTop, scrollToElement } from '../../utils/scroll';
import styles from '../../styles/components/Footer.module.css';

const marqueeText = 'COMMERCIAL · MUSIC VIDEO · DOCUMENTARY · EDITORIAL · BRANDED CONTENT · PHOTOGRAPHY · ';

const socialLinks = ['VIMEO', 'INSTAGRAM', 'LINKEDIN'];

export default function Footer() {
  return (
    <div className={styles.container}>
      {/* Running Marquee */}
      <div className={styles.marqueeWrapper}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className={styles.marqueeText}
        >
          {marqueeText.repeat(8)}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* CTA */}
        <div className={styles.cta} onClick={() => scrollToElement('contact')} data-cursor-hover>
          <motion.p
            className={`display-heading ${styles.ctaHeading}`}
            whileHover={{ x: 20 }}
            transition={{ duration: 0.3 }}
          >
            GOT A PROJECT?
            <span className={styles.ctaArrow}>→</span>
          </motion.p>
          <p className={styles.ctaSubtext}>[ LET'S BUILD SOMETHING TOGETHER ]</p>
        </div>

        {/* Info Grid */}
        <div className={styles.infoGrid}>
          <div className={styles.infoCol1}>
            <p className={styles.infoLabel}>[ STUDIO INQUIRIES ]</p>
            <a href="mailto:booking@lnastudio.com" className={styles.infoLink}>booking@lnastudio.com</a>
            <a href="tel:+31612345678" className={styles.infoLink}>+31 6 12 34 56 78</a>
          </div>

          <div className={styles.infoCol2}>
            <p className={styles.infoLabel}>[ HEADQUARTERS ]</p>
            <p className={styles.infoText}>1012 JS<br />AMSTERDAM, NL</p>
          </div>

          <div className={styles.infoCol3}>
            <p className={styles.infoLabel}>[ CONNECT ]</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {socialLinks.map((s) => (
                <a key={s} href="#" className={styles.infoLink}>{s}</a>
              ))}
            </div>
          </div>

          <div className={styles.infoCol4}>
            <motion.button
              onClick={scrollToTop}
              data-cursor-hover
              whileHover={{ y: -5 }}
              className={styles.backToTop}
            >
              ↑
            </motion.button>
            <p className={styles.backToTopLabel}>TOP</p>
          </div>
        </div>

        {/* Giant Brand */}
        <div className={styles.brandWrapper}>
          <p className={`display-heading ${styles.brandText}`}>LNA_STUDIO</p>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>LNA STUDIO © 2026</p>
          <p>ALL RIGHTS RESERVED</p>
          <p>GLOBAL OPERATION</p>
        </div>
      </div>
    </div>
  );
}
