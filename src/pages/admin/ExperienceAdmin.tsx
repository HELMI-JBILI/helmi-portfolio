import { ResourceCrud, type ResourceConfig } from '@/components/admin/ResourceCrud'

const config: ResourceConfig = {
  table: 'experience',
  resourceLabel: 'Experience',
  titleField: 'position',
  subtitleField: 'organization',
  hasPublished: true,
  hasOrder: true,
  fields: [
    { key: 'position', label: 'Position', type: 'text', required: true },
    { key: 'organization', label: 'Organization', type: 'text', required: true },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'start_date', label: 'Start date', type: 'date' },
    { key: 'end_date', label: 'End date', type: 'date' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'technologies', label: 'Technologies', type: 'tags' },
  ],
  defaultValues: {
    position: '', organization: '', location: '', start_date: null, end_date: null,
    is_current: false, description: '', technologies: [], published: true,
  },
}

export function ExperienceAdmin() {
  return <ResourceCrud config={config} />
}
