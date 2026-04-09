// Novahub - Direção Criativa | Brand Guidelines 2026

export const colors = {
  novaBlack: '#0A0A0A',
  novaWhite: '#F9F2ED',
  novaEmber: '#FF402A',
  novaSunset: '#FF9A4C',
  novaSlate: '#2A2A2E',
  novaAsh: '#6B6B6F',
  novaSmoke: '#161618',
  novaTeal: '#00C9A7',
} as const;

export const gradients = {
  emberFlow: 'linear-gradient(135deg, #FF402A, #FF9A4C)',
  sunsetBurn: 'linear-gradient(135deg, #FF9A4C, #FF6B3A)',
  novaGlow: 'linear-gradient(135deg, #C74BED, #FF9A4C)',
  tealShift: 'linear-gradient(135deg, #00C9A7, #3BA3D9)',
  midnightEmber: 'linear-gradient(135deg, #1A0A0A, #FF402A33)',
  thermalGlow: 'linear-gradient(135deg, #FF402A, #6B3FA0)',
} as const;

export const fonts = {
  display: 'DM Serif Display, serif',
  bold: 'DM Sans, sans-serif',
  light: 'DM Sans, sans-serif',
} as const;

export const fontWeights = {
  light: 300,
  regular: 400,
  bold: 700,
} as const;

export const typeScale = {
  h1: 48,
  h2: 32,
  h3: 22,
  body: 13,
  small: 11,
  caption: 9,
} as const;

// Instagram carousel dimensions
export const CAROUSEL_WIDTH = 1080;
export const CAROUSEL_HEIGHT = 1080;
export const FPS = 30;
export const SLIDE_DURATION_FRAMES = 90; // 3 seconds per slide
