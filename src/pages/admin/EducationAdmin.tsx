import { ResourceCrud, type ResourceConfig } from '@/components/admin/ResourceCrud'

const config: ResourceConfig = {
  table: 'education',
  resourceLabel: 'Education',
  titleField: 'degree',
  subtitleField: 'institution',
  hasPublished: true,
  hasOrder: true,
  fields: [
    { key: 'institution', label: 'Institution', type: 'text', required: true },
    { key: 'degree', label: 'Degree / Program', type: 'text', required: true },
    { key: 'field', label: 'Field of study', type: 'text' },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'start_date', label: 'Start date', type: 'date' },
    { key: 'end_date', label: 'End date', type: 'date' },
    { key: 'description', label: 'Description', type: 'textarea' },
  ],
  defaultValues: {
    institution: '', degree: '', field: '', location: '', start_date: null, end_date: null,
    is_current: false, description: '', published: true,
  },
}

export function EducationAdmin() {
  return <ResourceCrud config={config} />
}
