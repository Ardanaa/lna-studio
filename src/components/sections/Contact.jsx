import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';
import styles from '../../styles/components/Contact.module.css';

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });

  const projectTypes = ['COMMERCIAL', 'MUSIC VIDEO', 'DOCUMENTARY', 'OTHER'];

  return (
    <div id="contact" ref={containerRef} className={styles.container}>
      <div className={styles.headerBlock}>
        <p className={`display-heading ${styles.heading}`}>
          INQUIRY <span className={styles.accent}>//</span>
        </p>
        <div className={styles.headerDivider}>
          <p className={styles.label}>[ BOOKING & INFO ]</p>
        </div>
      </div>

      <motion.form
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
        className={styles.form}
        onSubmit={(e) => e.preventDefault()}
      >
        <motion.div className={styles.halfLeft} variants={fadeInUp}>
          <label className={styles.fieldLabel}>01 / NAME</label>
          <input type="text" placeholder="John Doe" className={styles.input} />
        </motion.div>

        <motion.div className={styles.halfRight} variants={fadeInUp}>
          <label className={styles.fieldLabel}>02 / EMAIL</label>
          <input type="email" placeholder="hello@example.com" className={styles.input} />
        </motion.div>

        <motion.div className={styles.fullWidth} variants={fadeInUp}>
          <label className={styles.fieldLabel}>03 / PROJECT TYPE</label>
          <div className={styles.radioGroup}>
            {projectTypes.map((type, i) => (
              <label key={i} className="custom-radio">
                <input type="radio" name="project_type" value={type} />
                {type}
              </label>
            ))}
          </div>
        </motion.div>

        <motion.div className={styles.fullWidth} variants={fadeInUp}>
          <label className={styles.fieldLabel}>04 / PROJECT DETAILS</label>
          <textarea placeholder="Tell us about your vision..." rows="3" className={styles.textarea} />
        </motion.div>

        <motion.div className={styles.submitCol} variants={fadeInUp}>
          <button type="submit" className={`display-heading ${styles.submitButton}`} data-cursor-hover>
            [ INITIATE COMMUNICATION ]
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
}
