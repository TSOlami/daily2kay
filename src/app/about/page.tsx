export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-16rem)] p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold">About Daily2kay</h1>
        
        <div className="space-y-6">
          <section className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Daily2kay QR Code Generator is a modern, feature-rich tool designed to create customizable QR codes for various purposes.
              Our platform provides a simple yet powerful solution for all your QR code needs.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              We aim to provide an intuitive and powerful QR code generation solution that meets the needs of both individuals and businesses.
              Our focus is on combining simplicity with advanced customization options.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Features</h2>
            <ul className="grid gap-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-primary/10 p-1 mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <span>Multiple QR code types including URLs, text, WiFi, contact details, and more</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-primary/10 p-1 mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <span>Advanced customization options for colors, patterns, and styles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-primary/10 p-1 mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <span>Logo integration capabilities for branded QR codes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-primary/10 p-1 mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <span>High-quality downloads in multiple formats</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-primary/10 p-1 mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <span>Mobile-friendly interface for on-the-go QR code generation</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
} 