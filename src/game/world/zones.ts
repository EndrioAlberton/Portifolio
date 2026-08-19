export type ZoneId = 'about' | 'experience' | 'projects' | 'skills' | 'contact'

export const zoneLabels: Record<ZoneId, string> = {
  about: 'Sobre mim',
  experience: 'Experiência',
  projects: 'Projetos',
  skills: 'Habilidades',
  contact: 'Contato',
}

export const zoneColors: Record<ZoneId, number> = {
  about: 0xd97757,
  experience: 0x4caf82,
  projects: 0x9479d5,
  skills: 0xe0b23d,
  contact: 0x4a90d9,
}
