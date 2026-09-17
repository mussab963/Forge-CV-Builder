const RESUMES_KEY = 'cvforge_resumes_v4'
const PROFILE_KEY = 'cvforge_profile_v1'

const clone = value => JSON.parse(JSON.stringify(value))
const now = () => new Date().toISOString()

export function getLocalProfile() {
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null') } catch { return null }
}

export function saveLocalProfile(profile = {}) {
  const current = getLocalProfile() || {}
  const next = { ...current, ...profile, updatedAt: now() }
  localStorage.setItem(PROFILE_KEY, JSON.stringify(next))
  return next
}

function readRows() {
  try {
    const parsed = JSON.parse(localStorage.getItem(RESUMES_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch { return [] }
}
function writeRows(rows) { localStorage.setItem(RESUMES_KEY, JSON.stringify(rows)) }

const normalize = row => ({
  id: String(row.id),
  title: row.title || 'Untitled Resume',
  template: row.template || 'ats-modern',
  data: row.data || {},
  updatedAt: row.updatedAt || row.updated_at || now(),
  createdAt: row.createdAt || row.created_at || now(),
})

export async function getSessionUser() {
  const profile = getLocalProfile()
  return profile ? { id: 'local-user', name: profile.name || 'User', local: true } : { id: 'local-user', name: 'User', local: true }
}


export async function listResumes() {
  return readRows().map(normalize).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
}

export async function createResume(_email = '', selectedTemplate = 'ats-modern') {
  const profile = getLocalProfile()
  const row = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: 'Untitled Resume',
    template: selectedTemplate || 'ats-modern',
    createdAt: now(), updatedAt: now(),
    data: {
      language: 'en',
      personal: { name: profile?.name || '', title: '', email: '', phone: '', location: '', summary: '', website: '', linkedin: '' },
      experience: [], education: [], skills: [], projects: [], languages: [],
      design: { fontEn: 'Manrope', fontAr: 'Tajawal' },
    },
  }
  const rows = readRows(); rows.unshift(row); writeRows(rows)
  return normalize(row)
}

export async function getResume(id) {
  const row = readRows().find(r => String(r.id) === String(id))
  if (!row) throw new Error('Resume not found on this browser.')
  return normalize(row)
}

export async function updateResume(id, payload) {
  const rows = readRows(); const index = rows.findIndex(r => String(r.id) === String(id))
  if (index < 0) throw new Error('Resume not found on this browser.')
  rows[index] = { ...rows[index], title: payload.title, template: payload.template, data: clone(payload.data), updatedAt: now() }
  writeRows(rows)
  return normalize(rows[index])
}

export async function deleteResume(id) {
  writeRows(readRows().filter(r => String(r.id) !== String(id)))
}

export async function duplicateResume(id) {
  const source = await getResume(id)
  const copy = { ...clone(source), id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, title: `${source.title} — Copy`, createdAt: now(), updatedAt: now() }
  const rows = readRows(); rows.unshift(copy); writeRows(rows)
  return normalize(copy)
}

