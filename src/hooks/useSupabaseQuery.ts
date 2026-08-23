import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Options {
  order?: { column: string; ascending?: boolean }
  filter?: Record<string, unknown>
  publicOnly?: boolean
}

/**
 * Generic read hook for a Supabase table. When `publicOnly` is true, only
 * rows with published = true are requested (RLS enforces this server-side
 * too — this is just to avoid asking for rows the visitor cannot see).
 */
export function useSupabaseQuery<T>(table: string, options: Options = {}) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    let query = supabase.from(table).select('*')
    if (options.publicOnly) query = query.eq('published', true)
    if (options.filter) {
      for (const [key, value] of Object.entries(options.filter)) {
        query = query.eq(key, value as never)
      }
    }
    if (options.order) {
      query = query.order(options.order.column, { ascending: options.order.ascending ?? true })
    }
    const { data: rows, error: err } = await query
    if (err) setError(err.message)
    else setData((rows ?? []) as T[])
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, JSON.stringify(options)])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { data, loading, error, refetch }
}

export function useSupabaseSingle<T>(table: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    const { data: rows, error: err } = await supabase.from(table).select('*').limit(1)
    if (err) setError(err.message)
    else setData((rows?.[0] ?? null) as T | null)
    setLoading(false)
  }, [table])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { data, loading, error, refetch }
}
