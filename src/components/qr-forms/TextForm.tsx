import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function TextForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [text, setText] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ text })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <Button type="submit" className="w-full">Generate QR Code</Button>
    </form>
  )
} 