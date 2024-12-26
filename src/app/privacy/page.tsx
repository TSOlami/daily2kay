export default function PrivacyPolicy() {
  return (
    <div className="min-h-[calc(100vh-16rem)] p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Information Collection and Use</h2>
            <p className="text-muted-foreground leading-relaxed">
              Daily2kay QR Code Generator does not store any of the text or URLs you use to generate QR codes. All QR code generation is performed client-side in your browser.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your privacy is important to us. We do not collect, store, or transmit any personal information when you use our QR code generator.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              This website does not use cookies or any form of tracking.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Third-party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not use any third-party services that collect user data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a 
                href="mailto:support@daily2kay.com"
                className="text-primary hover:underline"
              >
                support@daily2kay.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 