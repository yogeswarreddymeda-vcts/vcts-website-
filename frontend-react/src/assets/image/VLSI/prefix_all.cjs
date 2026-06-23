const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'VLSI.jsx');
const cssPath = path.join(__dirname, '../assets/css/VLSI.css');

let jsxContent = fs.readFileSync(jsxPath, 'utf8');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// List of custom classes to prefix
const classes = [
  'kinetic-reveal-container',
  'active-reveal',
  'hero-reveal',
  'scroll-reveal-item',
  'text-revealed',
  'subsystems-matrix-container',
  'subsys-text-wrap',
  'subsys-para-inner',
  'subsys-para',
  'tech-list',
  'btn-vcts-primary',
  'btn-vcts-outline',
  'btn-vcts-cta-white',
  'magnetic-btn-anchor',
  'cta-blue-card',
  'flow-pipeline-grid',
  'flow-node-item',
  'flow-node-circle',
  'flow-arrow-icon',
  'blue-icon-box',
  'anim-lift-card',
  'showcase-card',
  'expertise-section',
  'diagram-box-img',
  'diagram-box',
  'hw-trace-path',
  'hw-pulse-center',
  'alpha-badge',
  'code-sim',
  'svg-wireframe',
  'metric-grid',
  'metric-cell',
  'scroll-progress-bar',
  'word-clip',
  'word-inner',
  'hero-badge-icon',
  'hero-main-img',
  'hero-section',
  'hero-title',
  'expertise-card-icon',
  'enterprise-row-section'
];

// 1. Rename classes in CSS file
// Negative lookbehind (?<!vlsi-) ensures we don't double-prefix already prefixed classes
classes.forEach(cls => {
  const regex = new RegExp(`(?<!vlsi-)\\.${cls}\\b`, 'g');
  cssContent = cssContent.replace(regex, `.vlsi-${cls}`);
});

// Also handle the state toggles in CSS
cssContent = cssContent.replace(/(?<!vlsi-)\.active\b/g, '.vlsi-active');
cssContent = cssContent.replace(/(?<!vlsi-)\.text-revealed\b/g, '.vlsi-text-revealed');
cssContent = cssContent.replace(/(?<!vlsi-)\.active-reveal\b/g, '.vlsi-active-reveal');

// 2. Rename classes in JSX file
classes.forEach(cls => {
  const classRegex = new RegExp(`(?<!vlsi-)\\b${cls}\\b`, 'g');
  jsxContent = jsxContent.replace(classRegex, `vlsi-${cls}`);
});

// Replace state toggles and queries in JSX if they are not already prefixed
jsxContent = jsxContent.replace(/classList\.add\("active"\)/g, 'classList.add("vlsi-active")');
jsxContent = jsxContent.replace(/classList\.toggle\("active"/g, 'classList.toggle("vlsi-active"');
jsxContent = jsxContent.replace(/classList\.add\("text-revealed"\)/g, 'classList.add("vlsi-text-revealed")');
jsxContent = jsxContent.replace(/classList\.toggle\("text-revealed"/g, 'classList.toggle("vlsi-text-revealed"');
jsxContent = jsxContent.replace(/classList\.add\("active-reveal"\)/g, 'classList.add("vlsi-active-reveal")');

fs.writeFileSync(jsxPath, jsxContent.replace(/vlsi-vlsi-/g, 'vlsi-'), 'utf8');
fs.writeFileSync(cssPath, cssContent.replace(/vlsi-vlsi-/g, 'vlsi-'), 'utf8');

console.log('Class prefixing complete! JSX and CSS updated without double-prefixing.');
