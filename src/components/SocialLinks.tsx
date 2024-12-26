import { Github, Mail } from 'lucide-react'
import Link from 'next/link'

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/tsolami/daily2kay',
    icon: Github,
  },
  {
    name: 'Email',
    url: 'mailto:support@daily2kay.com',
    icon: Mail,
  }
]

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {socialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.url}
          target={link.url.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label={link.name}
        >
          <link.icon className="h-5 w-5" />
        </Link>
      ))}
    </div>
  )
} 