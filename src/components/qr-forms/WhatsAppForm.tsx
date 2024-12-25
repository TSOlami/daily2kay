import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function WhatsAppForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Remove any non-numeric characters from phone number
    const cleanPhone = phone.replace(/\D/g, '')
    onSubmit({ phone: cleanPhone, message })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Phone number (with country code)"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <Textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" className="w-full">Generate QR Code</Button>
    </form>
  )
} 