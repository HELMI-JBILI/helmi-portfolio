import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    '[supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. ' +
      'Copy .env.example to .env and fill in your Supabase project credentials.'
  )
}

// Deliberately untyped against a generated Database schema: this project ships
// hand-authored interfaces per table in `lib/types.ts` instead of running the
// Supabase CLI codegen step. Each hook/query casts its result to those types,
// which keeps the app fully typed at the call site without coupling the client
// itself to a schema that can drift. Run `supabase gen types typescript` and
// pass it to createClient<Database> if you want end-to-end inferred types.
export const supabase = createClient(url ?? '', anonKey ?? '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})
