import { ResourceCrud, type ResourceConfig } from '@/components/admin/ResourceCrud'

const config: ResourceConfig = {
  table: 'projects',
  resourceLabel: 'Projects',
  titleField: 'title',
  subtitleField: 'category',
  imageField: 'main_image_url',
  hasPublished: true,
  hasFeatured: true,
  hasOrder: true,
  gallery: { table: 'project_images', foreignKey: 'project_id', bucket: 'projects' },
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'slug', label: 'Slug', type: 'text', placeholder: 'my-project-slug' },
    { key: 'category', label: 'Category', type: 'text', placeholder: 'e.g. Security · Data' },
    { key: 'short_description', label: 'Short description', type: 'textarea' },
    { key: 'full_description', label: 'Full description', type: 'textarea' },
    { key: 'technologies', label: 'Technologies', type: 'tags' },
    { key: 'main_image_url', label: 'Main image', type: 'image', bucket: 'projects' },
    { key: 'github_url', label: 'GitHub URL', type: 'url' },
    { key: 'demo_url', label: 'Demo URL', type: 'url' },
    { key: 'documentation_url', label: 'Documentation URL', type: 'url' },
    { key: 'start_date', label: 'Start date', type: 'date' },
    { key: 'end_date', label: 'End date', type: 'date' },
  ],
  defaultValues: {
    title: '', slug: '', category: '', short_description: '', full_description: '',
    technologies: [], main_image_url: null, github_url: '', demo_url: '', documentation_url: '',
    start_date: null, end_date: null, published: true, featured: false,
  },
}

export function ProjectsAdmin() {
  return <ResourceCrud config={config} />
}
