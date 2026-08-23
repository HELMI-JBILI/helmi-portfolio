import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer'
import type {
  Profile,
  Education,
  Experience,
  Skill,
  SkillCategory,
  ResearchProject,
  Project,
  Certification,
  Publication,
} from '@/lib/types'

// A4 = 595.28 x 841.89 pt. Palette mirrors the site: cream / white / aqua / ink.
const INK = '#1C2224'
const INK_LIGHT = '#3D4548'
const INK_MUTED = '#6B7478'
const AQUA = '#3F818C'
const CREAM = '#FAF7F0'
const LINE = '#E4DFD3'

const styles = StyleSheet.create({
  page: { backgroundColor: '#FFFFFF', color: INK, fontSize: 9.5, fontFamily: 'Helvetica', padding: 34, lineHeight: 1.45 },
  headerBand: { backgroundColor: CREAM, marginHorizontal: -34, marginTop: -34, padding: 34, paddingBottom: 20, marginBottom: 18 },
  name: { fontSize: 24, fontFamily: 'Helvetica-Bold', color: INK, marginBottom: 4 },
  headline: { fontSize: 11, color: AQUA, marginBottom: 8 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 6 },
  contactItem: { fontSize: 8.5, color: INK_LIGHT },
  section: { marginBottom: 14 },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: INK,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    paddingBottom: 4,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  itemTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: INK },
  itemSub: { fontSize: 9, color: INK_LIGHT, marginBottom: 2 },
  itemDate: { fontSize: 8.5, color: INK_MUTED, fontFamily: 'Courier' },
  itemDesc: { fontSize: 8.75, color: INK_LIGHT, marginTop: 2, marginBottom: 8 },
  twoCol: { flexDirection: 'row', gap: 24 },
  colMain: { flex: 1.55 },
  colSide: { flex: 1 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4, marginBottom: 8 },
  chip: { fontSize: 7.5, color: INK_LIGHT, backgroundColor: CREAM, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 2 },
  skillCatTitle: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: AQUA, textTransform: 'uppercase', letterSpacing: 1, marginTop: 6, marginBottom: 3 },
  skillItem: { fontSize: 8.75, color: INK_LIGHT, marginBottom: 2 },
  avatar: { width: 62, height: 62, borderRadius: 31, position: 'absolute', top: 34, right: 34 },
  footer: { position: 'absolute', bottom: 20, left: 34, right: 34, fontSize: 7.5, color: INK_MUTED, textAlign: 'center', borderTopWidth: 1, borderTopColor: LINE, paddingTop: 6 },
})

function fmt(d: string | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

interface Props {
  profile: Profile | null
  education: Education[]
  experience: Experience[]
  skillCategories: SkillCategory[]
  skills: Skill[]
  research: ResearchProject[]
  projects: Project[]
  certifications: Certification[]
  publications: Publication[]
}

export function CvDocument({ profile, education, experience, skillCategories, skills, research, projects, certifications, publications }: Props) {
  const grouped = skillCategories
    .map((c) => ({ cat: c, items: skills.filter((s) => s.category_id === c.id) }))
    .filter((g) => g.items.length > 0)

  return (
    <Document title={`${profile?.full_name ?? 'Helmi Jbili'} — CV`} author={profile?.full_name ?? 'Helmi Jbili'}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.headerBand}>
          {profile?.avatar_url && <Image src={profile.avatar_url} style={styles.avatar} />}
          <Text style={styles.name}>{profile?.full_name ?? 'Helmi Jbili'}</Text>
          <Text style={styles.headline}>{profile?.headline} · {profile?.tagline}</Text>
          <View style={styles.contactRow}>
            {profile?.email && <Text style={styles.contactItem}>{profile.email}</Text>}
            {profile?.phone && <Text style={styles.contactItem}>{profile.phone}</Text>}
            {profile?.location && <Text style={styles.contactItem}>{profile.location}</Text>}
            {profile?.github_url && <Link src={profile.github_url}><Text style={styles.contactItem}>GitHub</Text></Link>}
            {profile?.linkedin_url && <Link src={profile.linkedin_url}><Text style={styles.contactItem}>LinkedIn</Text></Link>}
          </View>
        </View>

        {profile?.bio && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.itemDesc}>{profile.bio}</Text>
          </View>
        )}

        <View style={styles.twoCol}>
          <View style={styles.colMain}>
            {education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((e) => (
                  <View key={e.id} wrap={false}>
                    <View style={styles.row}>
                      <Text style={styles.itemTitle}>{e.degree}</Text>
                      <Text style={styles.itemDate}>{fmt(e.start_date)} — {e.is_current ? 'Present' : fmt(e.end_date)}</Text>
                    </View>
                    <Text style={styles.itemSub}>{e.institution}{e.location ? ` · ${e.location}` : ''}</Text>
                    {e.description ? <Text style={styles.itemDesc}>{e.description}</Text> : <View style={{ marginBottom: 6 }} />}
                  </View>
                ))}
              </View>
            )}

            {research.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Research Projects</Text>
                {research.map((r) => (
                  <View key={r.id} wrap={false} style={{ marginBottom: 8 }}>
                    <Text style={styles.itemTitle}>{r.title}</Text>
                    <Text style={styles.itemDesc}>{r.summary}</Text>
                    <View style={styles.chipRow}>
                      {[...r.methods, ...r.technologies].slice(0, 10).map((t) => (
                        <Text key={t} style={styles.chip}>{t}</Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Projects</Text>
                {projects.map((p) => (
                  <View key={p.id} wrap={false} style={{ marginBottom: 8 }}>
                    <Text style={styles.itemTitle}>{p.title}</Text>
                    <Text style={styles.itemDesc}>{p.short_description}</Text>
                    <View style={styles.chipRow}>
                      {p.technologies.slice(0, 8).map((t) => (
                        <Text key={t} style={styles.chip}>{t}</Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {experience.map((e) => (
                  <View key={e.id} wrap={false} style={{ marginBottom: 8 }}>
                    <View style={styles.row}>
                      <Text style={styles.itemTitle}>{e.position}</Text>
                      <Text style={styles.itemDate}>{fmt(e.start_date)} — {e.is_current ? 'Present' : fmt(e.end_date)}</Text>
                    </View>
                    <Text style={styles.itemSub}>{e.organization}{e.location ? ` · ${e.location}` : ''}</Text>
                    {e.description && <Text style={styles.itemDesc}>{e.description}</Text>}
                  </View>
                ))}
              </View>
            )}

            {publications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Publications</Text>
                {publications.map((p) => (
                  <View key={p.id} wrap={false} style={{ marginBottom: 6 }}>
                    <Text style={styles.itemTitle}>{p.title} <Text style={styles.itemDate}>({p.category})</Text></Text>
                    {p.description && <Text style={styles.itemDesc}>{p.description}</Text>}
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.colSide}>
            {profile?.research_interests && profile.research_interests.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Research Interests</Text>
                <View style={styles.chipRow}>
                  {profile.research_interests.map((r) => (
                    <Text key={r} style={styles.chip}>{r}</Text>
                  ))}
                </View>
              </View>
            )}

            {grouped.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Technical Skills</Text>
                {grouped.map((g) => (
                  <View key={g.cat.id} wrap={false}>
                    <Text style={styles.skillCatTitle}>{g.cat.name}</Text>
                    {g.items.map((s) => (
                      <Text key={s.id} style={styles.skillItem}>• {s.name}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {certifications.map((c) => (
                  <View key={c.id} wrap={false} style={{ marginBottom: 6 }}>
                    <Text style={styles.itemTitle}>{c.name}</Text>
                    <Text style={styles.itemSub}>{c.organization}</Text>
                  </View>
                ))}
              </View>
            )}

            {profile?.languages && profile.languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Languages</Text>
                {profile.languages.map((l) => (
                  <Text key={l.name} style={styles.skillItem}>{l.name} — {l.level}</Text>
                ))}
              </View>
            )}
          </View>
        </View>

        <Text style={styles.footer} fixed>
          {profile?.full_name ?? 'Helmi Jbili'} · {profile?.email} · Generated from a live profile — content may be updated after this PDF was produced.
        </Text>
      </Page>
    </Document>
  )
}
