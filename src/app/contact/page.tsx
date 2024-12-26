import { SocialLinks } from '@/components/SocialLinks'
import { Mail } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-16rem)] p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
        
        <div className="space-y-8">
          <section className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have questions, suggestions, or need assistance? We're here to help!
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-5 w-5" />
              <a 
                href="mailto:support@daily2kay.com"
                className="hover:text-foreground transition-colors"
              >
                support@daily2kay.com
              </a>
            </div>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Find Us Online</h2>
            <p className="text-muted-foreground">
              Check out our open-source code and contribute to our project:
            </p>
            <SocialLinks className="justify-start" />
          </section>
        </div>
      </div>
    </div>
  )
} 