import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjectById } from '../data/projects';
import { fadeInUp } from '../utils/animations';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProjectById(id);

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', minHeight: '100vh', paddingTop: '15vh' }}>

      {/* Back Button */}
      <div style={{ padding: '0 4vw', marginBottom: '5vh' }}>
        <Link to="/" data-cursor-hover style={{ color: 'var(--secondary-color)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', fontFamily: 'Inter', fontSize: '0.8rem', letterSpacing: '2px', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = 'var(--text-color)'} onMouseOut={(e) => e.target.style.color = 'var(--secondary-color)'}>
          [ ← RETURN TO ARCHIVE ]
        </Link>
      </div>

      {/* Hero Video */}
      <div style={{ width: '100%', height: '70vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(5, 5, 5, 0.4)', zIndex: 1 }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '150vw', height: '150vh', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
          <iframe
            src={project.videoUrl}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          />
        </div>
        <div style={{ position: 'absolute', bottom: '4vw', left: '4vw', zIndex: 2 }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="display-heading"
            style={{ fontSize: 'clamp(4rem, 12vw, 12rem)', margin: 0, lineHeight: 0.9, letterSpacing: '-2px' }}
          >
            {project.title}
          </motion.h1>
        </div>
      </div>

      {/* Spec-Sheet Metadata */}
      <div style={{ padding: '10vh 4vw', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', width: '100%' }}>
          <div style={{ gridColumn: '1 / span 4' }}>
            <p style={{ fontFamily: 'Inter', fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--secondary-color)', margin: '0 0 20px 0' }}>[ SYNOPSIS ]</p>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.6, fontWeight: 300, maxWidth: '400px' }}>
              {project.description}
            </p>
          </div>

          <div style={{ gridColumn: '7 / span 6', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignContent: 'start' }}>
            {[
              { label: 'CLIENT', value: project.client },
              { label: 'TYPE', value: project.type },
              { label: 'DIRECTOR', value: project.director },
              { label: 'DOP', value: project.dop },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontFamily: 'Inter', fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--secondary-color)', margin: '0 0 5px 0' }}>{label} /</p>
                <p style={{ fontSize: '1.5rem', margin: 0, fontWeight: 600 }}>{value}</p>
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginTop: '10px' }}>
              <p style={{ fontFamily: 'Inter', fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--secondary-color)', margin: '0 0 5px 0' }}>GEAR SOURCED /</p>
              <p style={{ fontSize: '1.2rem', margin: 0, fontWeight: 300 }}>{project.gear}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Raw Stills */}
      <div style={{ padding: '10vh 4vw' }}>
        <p style={{ fontFamily: 'Inter', fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--secondary-color)', margin: '0 0 40px 0' }}>[ RAW STILLS ]</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
          {project.images.map((img, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: i * 0.1 }}
              style={{ width: '100%', aspectRatio: i % 2 === 0 ? '16/9' : '4/5', overflow: 'hidden', backgroundColor: '#111' }}
            >
              <img src={img} alt={`Still ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(50%) contrast(1.1)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
