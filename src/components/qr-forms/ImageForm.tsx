import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function ImageForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [url, setUrl] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ url })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="url"
        placeholder="Enter image URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <Button type="submit" className="w-full">Generate QR Code</Button>
    </form>
  )
} 