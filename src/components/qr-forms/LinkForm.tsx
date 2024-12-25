import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function LinkForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [url, setUrl] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ url })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Enter URL"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <Button type="submit" className="w-full">Generate QR Code</Button>
    </form>
  )
} 