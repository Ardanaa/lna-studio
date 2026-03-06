import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { allProjects } from '../data/projects';
import { fadeIn } from '../utils/animations';

export default function AllArchive() {
  return (
    <div style={{
      backgroundColor: 'var(--bg-color)',
      color: 'var(--text-color)',
      minHeight: '100vh',
      padding: '20vh 4vw 10vh 4vw'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', width: '100%', marginBottom: '10vh' }}>
        <div style={{ gridColumn: '1 / -1', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2vh' }}>
          <Link to="/" style={{ color: 'var(--text-color)', textDecoration: 'none', fontFamily: 'Inter', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 600, display: 'inline-block', marginBottom: '2vh' }} data-cursor-hover>
            [ ← RETURN HOME ]
          </Link>
          <p className="display-heading" style={{
            fontSize: 'clamp(3rem, 10vw, 10rem)',
            lineHeight: 0.9,
            margin: 0,
            color: 'var(--text-color)',
            letterSpacing: '-2px'
          }}>
            FULL ARCHIVE <span style={{ color: 'var(--accent-color)' }}>//</span>
          </p>
        </div>
        <div style={{ gridColumn: '1 / span 4', paddingTop: '2vh' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 600 }}>[ 001 - {String(allProjects.length).padStart(3, '0')} ]</p>
        </div>
        <div style={{ gridColumn: '9 / span 4', paddingTop: '2vh', textAlign: 'right' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 600 }}>ALL WORKS /</p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2px',
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        border: '2px solid rgba(255,255,255,0.1)'
      }}>
        {allProjects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.05 }}
            style={{
              backgroundColor: 'var(--bg-color)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}
          >
            <Link to={`/project/${project.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }} data-cursor-hover>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', backgroundColor: '#111' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%) contrast(1.2)',
                    transition: 'filter 0.5s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0%) contrast(1.1)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(100%) contrast(1.2)' }}
                />
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '15px' }}>
                <p style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', margin: '0 0 5px 0' }}>{project.id} /</p>
                <p style={{ fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '1px', fontSize: '1.2rem' }}>{project.title}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                  <p style={{ fontWeight: 600, margin: 0, fontSize: '0.7rem' }}>{project.genre}</p>
                  <p style={{ fontWeight: 300, margin: 0, fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>{project.category}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
