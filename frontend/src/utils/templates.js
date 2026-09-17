export const resumeTemplates = [
  { name: 'Atlas', kind: 'ATS Friendly', template: 'ats-modern', description: 'Clean single-column layout with strong hierarchy and generous spacing.' },
  { name: 'Oxford', kind: 'ATS Friendly', template: 'ats-classic', description: 'Traditional typography for corporate, legal, academic and public-sector roles.' },
  { name: 'Signal', kind: 'ATS Friendly', template: 'minimal', description: 'Minimal, highly readable structure that keeps the content in focus.' },
  { name: 'Mercury', kind: 'ATS Friendly', template: 'ats-compact', description: 'Compact layout for experienced candidates who need to fit more detail on one page.' },
  { name: 'Harbor', kind: 'ATS Friendly', template: 'ats-harbor', description: 'Balanced professional layout with subtle section dividers and clear dates.' },
  { name: 'Vertex', kind: 'ATS Friendly', template: 'ats-vertex', description: 'Modern technical resume style for engineering, IT and data roles.' },
  { name: 'Civic', kind: 'ATS Friendly', template: 'ats-civic', description: 'Calm, conservative structure for administration, healthcare and operations.' },
  { name: 'Nova', kind: 'Creative', template: 'creative-sidebar', description: 'Polished sidebar layout for design, marketing and portfolio-driven roles.' },
  { name: 'Executive', kind: 'Creative', template: 'executive', description: 'Confident editorial presentation for senior professionals and leadership roles.' },
  { name: 'Pulse', kind: 'Creative', template: 'bold', description: 'Bold visual rhythm with a modern header and strong section blocks.' },
  { name: 'Lumen', kind: 'Creative', template: 'elegant', description: 'Refined editorial styling with understated premium details.' },
  { name: 'Studio', kind: 'Creative', template: 'creative-studio', description: 'A clean portfolio-inspired design with expressive headings and soft structure.' },
  { name: 'Sienna', kind: 'Creative', template: 'creative-sienna', description: 'Warm editorial layout that feels personal, polished and distinctive.' },
  { name: 'Mono', kind: 'Creative', template: 'creative-mono', description: 'Sharp monochrome design with a contemporary, confident feel.' },
]

export const atsTemplateIds = resumeTemplates.filter(t => t.kind === 'ATS Friendly').map(t => t.template)
