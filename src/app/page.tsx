import QRCodeGenerator from '@/components/QRCodeGenerator'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Daily2kay QR Code Generator</h1>
        <QRCodeGenerator />
      </div>
    </main>
  )
} 