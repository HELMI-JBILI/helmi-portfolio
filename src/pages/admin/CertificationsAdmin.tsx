import { ResourceCrud, type ResourceConfig } from '@/components/admin/ResourceCrud'

const config: ResourceConfig = {
  table: 'certifications',
  resourceLabel: 'Certifications',
  titleField: 'name',
  subtitleField: 'organization',
  imageField: 'image_url',
  hasPublished: true,
  hasOrder: true,
  fields: [
    { key: 'name', label: 'Certification name', type: 'text', required: true },
    { key: 'organization', label: 'Issuing organization', type: 'text', required: true },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'issue_date', label: 'Issue date', type: 'date' },
    { key: 'credential_id', label: 'Credential ID', type: 'text' },
    { key: 'credential_url', label: 'Credential URL', type: 'url' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'image_url', label: 'Certificate image', type: 'image', bucket: 'certificates' },
    { key: 'pdf_url', label: 'Certificate PDF', type: 'image', bucket: 'certificates', accept: 'application/pdf' },
  ],
  defaultValues: {
    name: '', organization: '', category: '', issue_date: null, credential_id: '', credential_url: '',
    description: '', image_url: null, pdf_url: null, published: true,
  },
}

export function CertificationsAdmin() {
  return <ResourceCrud config={config} />
}
