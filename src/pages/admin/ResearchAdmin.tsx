import { ResourceCrud, type ResourceConfig } from '@/components/admin/ResourceCrud'

const config: ResourceConfig = {
  table: 'research_projects',
  resourceLabel: 'Research Projects',
  titleField: 'title',
  subtitleField: 'research_type',
  hasPublished: true,
  hasFeatured: true,
  hasOrder: true,
  gallery: { table: 'research_images', foreignKey: 'research_project_id', bucket: 'research' },
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'slug', label: 'Slug', type: 'text' },
    { key: 'research_type', label: 'Research type', type: 'text', placeholder: 'e.g. Earth Observation' },
    { key: 'status', label: 'Status', type: 'text', placeholder: 'Implemented / Ongoing / Concept' },
    { key: 'summary', label: 'Summary', type: 'textarea' },
    { key: 'full_description', label: 'Full description', type: 'textarea' },
    { key: 'methods', label: 'Methods & indices', type: 'tags', placeholder: 'NDVI, EVI, NDWI…' },
    { key: 'technologies', label: 'Technologies', type: 'tags' },
    { key: 'github_url', label: 'GitHub URL', type: 'url' },
    { key: 'demo_url', label: 'Demo URL', type: 'url' },
    { key: 'documentation_url', label: 'Documentation URL', type: 'url' },
    { key: 'start_date', label: 'Start date', type: 'date' },
    { key: 'end_date', label: 'End date', type: 'date' },
  ],
  defaultValues: {
    title: '', slug: '', research_type: 'Earth Observation', status: 'Implemented',
    summary: '', full_description: '', methods: [], technologies: [],
    github_url: '', demo_url: '', documentation_url: '', start_date: null, end_date: null,
    published: true, featured: false, is_priority: false,
  },
}

export function ResearchAdmin() {
  return <ResourceCrud config={config} />
}
