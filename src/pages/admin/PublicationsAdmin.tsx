import { ResourceCrud, type ResourceConfig } from '@/components/admin/ResourceCrud'

const config: ResourceConfig = {
  table: 'publications',
  resourceLabel: 'Publications',
  titleField: 'title',
  subtitleField: 'category',
  imageField: 'cover_image_url',
  hasPublished: true,
  hasOrder: true,
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'category', label: 'Category', type: 'text', placeholder: 'Book / Article / Research Paper / Technical Writing' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'cover_image_url', label: 'Cover image', type: 'image', bucket: 'publications' },
    { key: 'pdf_url', label: 'PDF file', type: 'image', bucket: 'publications', accept: 'application/pdf' },
    { key: 'external_url', label: 'External URL', type: 'url' },
    { key: 'publication_date', label: 'Publication date', type: 'date' },
  ],
  defaultValues: {
    title: '', category: 'Book', description: '', cover_image_url: null, pdf_url: null,
    external_url: '', publication_date: null, published: true,
  },
}

export function PublicationsAdmin() {
  return <ResourceCrud config={config} />
}
