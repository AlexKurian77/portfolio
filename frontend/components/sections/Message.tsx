'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface MessageProps {
  isActive: boolean;
  isMobile?: boolean;
}

export default function Message({ isActive, isMobile }: MessageProps) {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    try {
      const res = await fetch('https://formspree.io/f/mvzybnvk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setFormState('sent');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <section
      id="message"
      className="section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        width: '100%',
      }}
    >
      <div className="w-full flex justify-center md:hidden">
        <motion.div
          initial={isMobile ? 'visible' : 'hidden'}
        animate={isActive || isMobile ? 'visible' : 'hidden'}
        variants={containerVariants}
        style={{
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: '16px',
        }}
      >
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '8px' }}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 300,
            color: '#F0EDE6',
            marginBottom: '4px',
          }}>
            Send a <span className="gold-gradient-text" style={{ fontWeight: 500 }}>message</span>
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#8A8A8A',
          }}>
            compose_message.sh
          </p>
        </motion.div>

        {formState === 'sent' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              padding: '24px',
              background: 'rgba(42, 42, 42, 0.4)',
              border: '1px solid rgba(200, 169, 126, 0.2)',
              borderRadius: '12px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ fontSize: '32px', color: '#4ade80' }}>✓</div>
            <h3 style={{ color: '#E8D5B0', fontFamily: "'Outfit', sans-serif", fontSize: '20px' }}>Message Sent!</h3>
            <p style={{ color: '#8A8A8A', fontSize: '14px' }}>I&apos;ll get back to you as soon as possible.</p>
            <button
              onClick={() => setFormState('idle')}
              style={{
                marginTop: '12px',
                background: 'transparent',
                border: '1px solid rgba(200, 169, 126, 0.3)',
                color: '#C8A97E',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: "'DM Mono', monospace",
                fontSize: '12px',
              }}
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: '100%',
              background: 'rgba(42, 42, 42, 0.4)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(200, 169, 126, 0.1)',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '11px', color: '#C8A97E', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase' }}>Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(d => ({ ...d, name: e.target.value }))}
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(200, 169, 126, 0.15)',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  color: '#F0EDE6',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '11px', color: '#C8A97E', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase' }}>Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(d => ({ ...d, email: e.target.value }))}
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(200, 169, 126, 0.15)',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  color: '#F0EDE6',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '11px', color: '#C8A97E', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase' }}>Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData(d => ({ ...d, subject: e.target.value }))}
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(200, 169, 126, 0.15)',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  color: '#F0EDE6',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '11px', color: '#C8A97E', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase' }}>Message</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData(d => ({ ...d, message: e.target.value }))}
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(200, 169, 126, 0.15)',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  color: '#F0EDE6',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  minHeight: '100px',
                  resize: 'vertical',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={formState === 'sending'}
              style={{
                marginTop: '8px',
                background: formState === 'sending' ? 'rgba(200, 169, 126, 0.1)' : 'rgba(200, 169, 126, 0.15)',
                border: '1px solid rgba(200, 169, 126, 0.3)',
                color: '#C8A97E',
                padding: '12px',
                borderRadius: '6px',
                cursor: formState === 'sending' ? 'wait' : 'pointer',
                fontFamily: "'DM Mono', monospace",
                fontSize: '13px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
            >
              {formState === 'sending' ? 'Sending...' : formState === 'error' ? 'Error - Retry' : 'Send Message'}
            </button>
          </motion.form>
        )}
      </motion.div>
      </div>
    </section>
  );
}
