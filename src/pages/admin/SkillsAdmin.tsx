import { ResourceCrud, type ResourceConfig } from '@/components/admin/ResourceCrud'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import type { SkillCategory } from '@/lib/types'
import { Spinner } from '@/components/ui/Spinner'

export function SkillsAdmin() {
  const { data: categories, loading } = useSupabaseQuery<SkillCategory>('skill_categories', { order: { column: 'display_order' } })
  if (loading) return <Spinner />

  const config: ResourceConfig = {
    table: 'skills',
    resourceLabel: 'Skills',
    titleField: 'name',
    subtitleField: 'level',
    hasPublished: true,
    hasOrder: true,
    fields: [
      { key: 'name', label: 'Skill name', type: 'text', required: true },
      {
        key: 'category_id',
        label: 'Category',
        type: 'select',
        options: categories.map((c) => ({ label: c.name, value: c.id })),
      },
      { key: 'icon', label: 'Icon (lucide kebab-case, e.g. brain-circuit)', type: 'text', placeholder: 'sparkles' },
      { key: 'level', label: 'Level', type: 'text', placeholder: 'Foundational / Proficient / Advanced / Expert' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
    defaultValues: { name: '', category_id: categories[0]?.id ?? null, icon: 'sparkles', level: 'Proficient', description: '', published: true },
  }

  return <ResourceCrud config={config} />
}
