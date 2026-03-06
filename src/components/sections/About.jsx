import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';
import styles from '../../styles/components/About.module.css';

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });

  return (
    <div id="studio" ref={containerRef} className={styles.container}>
      {/* Header */}
      <div className={styles.headerGrid}>
        <div className={styles.headingRow}>
          <p className={`display-heading ${styles.heading}`}>
            STUDIO <span className={styles.accent}>//</span>
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <motion.div
        className={styles.contentGrid}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
          hidden: {},
        }}
      >
        {/* Column 1 - The Process */}
        <motion.div variants={fadeInUp}>
          <p className={styles.columnLabel}>[ 01 THE PROCESS ]</p>
          <p className={styles.columnText}>
            We specialize in high-octane commercial filmmaking, music videos, and raw editorial
            photography. Hardware meets vision in an uncompromising minimal environment.
          </p>
        </motion.div>

        {/* Column 2 - The Gear */}
        <motion.div variants={fadeInUp}>
          <p className={styles.columnLabel}>[ 02 THE GEAR ]</p>
          {['RED V-RAPTOR 8K VV', 'ARRI ALEXA MINI LF', 'ATLAS ORION ANAMORPHICS', '10-TON GRIP TRUCK'].map(
            (item) => (
              <p key={item} className={styles.gearItem}>{item}</p>
            )
          )}
        </motion.div>

        {/* Column 3 - The Space */}
        <motion.div variants={fadeInUp}>
          <p className={styles.columnLabel}>[ 03 THE SPACE ]</p>
          <p className={styles.spaceText}>
            4000 sq ft void. Cyclorama wall. Complete blackout capability. A post-production suite
            absolutely devoid of anything unnecessary. Just the tools.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
