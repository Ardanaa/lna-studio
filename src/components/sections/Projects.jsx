import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { slideInRight } from '../../utils/animations';
import styles from '../../styles/components/Projects.module.css';

export default function Projects() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardWidth = slider.querySelector(`.${styles.card}`)?.offsetWidth || 400;
    const gap = 30;
    const scrollAmount = cardWidth + gap;

    let newIndex = currentIndex + direction;
    newIndex = Math.max(0, Math.min(newIndex, featuredProjects.length - 1));

    setCurrentIndex(newIndex);
    slider.scrollTo({ left: newIndex * scrollAmount, behavior: 'smooth' });
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex >= featuredProjects.length - 1;

  return (
    <div id="projects" ref={containerRef} className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <p className={`display-heading ${styles.heading}`}>
            ARCHIVE <span className={styles.accent}>//</span>
          </p>
          <div className={styles.headerMeta}>
            <p className={styles.label}>[ SELECTED WORKS 2024-2026 ]</p>
          </div>
        </div>

        {/* Slider Controls */}
        <div className={styles.navControls}>
          <button
            onClick={() => scrollSlider(-1)}
            className={`display-heading ${styles.navButton} ${isFirst ? styles.disabled : styles.active}`}
            data-cursor-hover
          >
            ←
          </button>
          <button
            onClick={() => scrollSlider(1)}
            className={`display-heading ${styles.navButton} ${isLast ? styles.disabled : styles.active}`}
            data-cursor-hover
          >
            →
          </button>
          <span className={styles.counter}>
            {String(currentIndex + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Horizontal Slider */}
      <div ref={sliderRef} className={styles.slider}>
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            className={styles.card}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={index * 0.1}
            variants={slideInRight}
          >
            <Link to={`/project/${project.id}`} className={styles.cardLink} data-cursor-hover>
              <div className={styles.imageWrapper}>
                <img src={project.image} alt={project.title} className={styles.image} />
              </div>
              <div className={styles.cardMeta}>
                <div className={styles.cardMetaRow}>
                  <div>
                    <p className={styles.metaLabel}>ID /</p>
                    <p className={styles.metaValue}>{project.id}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p className={styles.metaLabel}>TITLE /</p>
                    <p className={styles.metaValue}>{project.title}</p>
                  </div>
                </div>
                <p className={styles.metaGenre}>{project.genre} — {project.category}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Archive Link */}
      <div className={styles.archiveBar}>
        <Link to="/archive" className={`display-heading ${styles.archiveButton}`} data-cursor-hover>
          [ VIEW FULL ARCHIVE → ]
        </Link>
      </div>
    </div>
  );
}
