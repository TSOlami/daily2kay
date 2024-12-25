import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function SMSForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ phone, message })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Phone number"
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