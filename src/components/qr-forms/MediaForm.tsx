import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type MediaType = 'image' | 'video'

export function MediaForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [url, setUrl] = useState('')
  const [mediaType, setMediaType] = useState<MediaType>('image')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ url, type: mediaType })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select value={mediaType} onValueChange={(value) => setMediaType(value as MediaType)}>
        <SelectTrigger>
          <SelectValue placeholder="Media Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="image">Image</SelectItem>
          <SelectItem value="video">Video</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="url"
        placeholder={`Enter ${mediaType} URL`}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <Button type="submit" className="w-full">Generate QR Code</Button>
    </form>
  )
} 