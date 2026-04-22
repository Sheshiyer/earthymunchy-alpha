import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { Instagram, Facebook, Mail } from 'lucide-react'

export function Footer() {
  const footerLinks = {
    Shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'Honey', href: '/shop/honey' },
      { name: 'Spices', href: '/shop/spices' },
    ],
    About: [
      { name: 'Our Story', href: '/story' },
      { name: 'Sourcing', href: '/story#sourcing' },
      { name: 'Contact', href: '/contact' },
    ],
  }
  
  return (
    <footer className="bg-sage-dark text-white">
      <div className="container-custom py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="type-card-title text-white mb-4 tracking-[0.4em]">
              EARTHY MUNCHY
            </h3>
            <p className="type-body text-white/80 max-w-md">
              Sourced with intention, delivered with reverence. Premium organic products 
              from the earth's pantry.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-terracotta transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-terracotta transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:hello@earthymunchy.com" className="hover:text-terracotta transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="type-overline text-white/90 mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href}
                      className="type-body text-white/70 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <Separator className="bg-white/20 mb-8" />
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="type-caption text-white/60">
            © 2026 Earthy Munchy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="type-caption text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="type-caption text-white/60 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
