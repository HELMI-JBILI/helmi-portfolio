import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const links = [
  { href: '#research', label: 'Research' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#publications', label: 'Publications' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-space-950/80 backdrop-blur-md border-b border-linedark' : 'bg-transparent'
        }`}
      >
        <nav className="container-page flex h-[68px] items-center justify-between">
          <Link to="/" className="font-serif text-[17px] tracking-tight text-mist-100">
            Helmi Jbili
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[12.5px] font-medium text-mist-300 hover:text-mist-100 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link
              to="/cv"
              className="inline-flex items-center gap-1.5 rounded-sm border border-linedark px-4 py-2 text-[12.5px] font-medium text-mist-100 hover:border-signal-400/50 hover:text-signal-300 transition-colors"
            >
              View CV
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>

          <button className="lg:hidden text-mist-100" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-space-950 lg:hidden"
          >
            <div className="container-page flex h-[68px] items-center justify-between">
              <span className="font-serif text-[17px] text-mist-100">Helmi Jbili</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6 text-mist-100" strokeWidth={1.5} />
              </button>
            </div>
            <ul className="container-page mt-8 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-linedark"
                >
                  <a href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-5 font-serif text-2xl text-mist-100">
                    {l.label}
                    <ArrowUpRight className="h-5 w-5 text-mist-500" strokeWidth={1.5} />
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-page mt-8">
              <Link to="/cv" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-sm bg-mist-100 px-6 py-3 text-sm font-medium text-space-950">
                View CV
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
