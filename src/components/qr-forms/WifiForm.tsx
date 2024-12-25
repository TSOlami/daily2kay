import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type WifiEncryption = 'WPA' | 'WEP' | 'nopass'

export function WifiForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [ssid, setSsid] = useState('')
  const [password, setPassword] = useState('')
  const [encryption, setEncryption] = useState<WifiEncryption>('WPA')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ssid, password, encryption })
  }

  const requiresPassword = (encryption: WifiEncryption) => encryption !== 'nopass'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Network Name (SSID)"
        value={ssid}
        onChange={(e) => setSsid(e.target.value)}
        required
      />
      <Select value={encryption} onValueChange={(value) => setEncryption(value as WifiEncryption)}>
        <SelectTrigger>
          <SelectValue placeholder="Security" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="WPA">WPA/WPA2</SelectItem>
          <SelectItem value="WEP">WEP</SelectItem>
          <SelectItem value="nopass">No Password</SelectItem>
        </SelectContent>
      </Select>
      {encryption !== 'nopass' && (
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={requiresPassword(encryption)}
        />
      )}
      <Button type="submit" className="w-full">Generate QR Code</Button>
    </form>
  )
} 