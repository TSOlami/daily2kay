'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LinkForm } from './qr-forms/LinkForm'
import { EmailForm } from './qr-forms/EmailForm'
import { TextForm } from './qr-forms/TextForm'
import { WifiForm } from './qr-forms/WifiForm'
import { CallForm } from './qr-forms/CallForm'
import { SMSForm } from './qr-forms/SMSForm'
import { WhatsAppForm } from './qr-forms/WhatsAppForm'
import { ImageForm } from './qr-forms/ImageForm'
import { VideoForm } from './qr-forms/VideoForm'
import type { QRCodeType } from '@/types/qr-types'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type FormType = 'text' | 'link' | 'wifi' | 'whatsapp' | 'sms' | 'call' | 'email' | 'image' | 'video'
type QRShape = 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded'
type QROptions = {
  backgroundColor: string
  dotsColor: string
  markerBorderColor: string
  markerCenterColor: string
  dotsStyle: QRShape
  markerStyle: QRShape
  markerCenterStyle: QRShape
}

export default function QRCodeGenerator() {
  const [selectedType, setSelectedType] = useState<QRCodeType>('link')
  const [qrValue, setQrValue] = useState('')
  const { toast } = useToast()
  const [logo, setLogo] = useState<string>('')
  const [logoSize, setLogoSize] = useState<number>(64)
  const [qrOptions, setQrOptions] = useState<QROptions>({
    backgroundColor: '#FFFFFF',
    dotsColor: '#000000',
    markerBorderColor: '#000000',
    markerCenterColor: '#000000',
    dotsStyle: 'square',
    markerStyle: 'square',
    markerCenterStyle: 'square'
  })
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)

  const handleGenerate = (formData: any) => {
    const value = generateQRValue(formData)
    if (!value) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }
    setQrValue(value)
  }

  const generateQRValue = (formData: any) => {
    if (!formData) return ''
    
    switch (selectedType) {
      case 'link':
        return formData.url || ''
      case 'email':
        return `mailto:${formData.email}?subject=${formData.subject}&body=${formData.body}`
      case 'text':
        return formData.text
      case 'call':
        return `tel:${formData.phone}`
      case 'sms':
        return `sms:${formData.phone}?body=${formData.message}`
      case 'whatsapp':
        return `https://wa.me/${formData.phone}?text=${formData.message}`
      case 'wifi':
        if (!formData.ssid) return ''
        return `WIFI:T:${formData.encryption};S:${formData.ssid};P:${formData.password || ''};H:${formData.encryption === 'nopass' ? 'true' : 'false'};;`
      case 'image':
        return formData.url || ''
      case 'video':
        return formData.url || ''
      default:
        return ''
    }
  }

  const handleDownload = () => {
    const svg = document.getElementById("QRCode")
    if (!svg) {
      toast({
        title: "Error",
        description: "QR Code not found",
        variant: "destructive",
      })
      return
    }

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      
      if (logo) {
        const logoImg = new Image()
        logoImg.onload = () => {
          const x = (canvas.width - logoSize) / 2
          const y = (canvas.height - logoSize) / 2
          ctx?.drawImage(logoImg, x, y, logoSize, logoSize)
          
          const pngFile = canvas.toDataURL("image/png")
          const downloadLink = document.createElement("a")
          downloadLink.download = "qrcode.png"
          downloadLink.href = pngFile
          downloadLink.click()
        }
        logoImg.src = logo
      } else {
        const pngFile = canvas.toDataURL("image/png")
        const downloadLink = document.createElement("a")
        downloadLink.download = "qrcode.png"
        downloadLink.href = pngFile
        downloadLink.click()
      }
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogo(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="p-6">
      <Tabs defaultValue="link" onValueChange={(value) => setSelectedType(value as QRCodeType)}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-2">
          <TabsTrigger value="link">Link</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="call">Call</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="wifi">Wi-Fi</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
        </TabsList>

        <div className="mt-4 space-y-4">
          <TabsContent value="link">
            <LinkForm onSubmit={handleGenerate} />
          </TabsContent>
          <TabsContent value="email">
            <EmailForm onSubmit={handleGenerate} />
          </TabsContent>
          <TabsContent value="text">
            <TextForm onSubmit={handleGenerate} />
          </TabsContent>
          <TabsContent value="call">
            <CallForm onSubmit={handleGenerate} />
          </TabsContent>
          <TabsContent value="sms">
            <SMSForm onSubmit={handleGenerate} />
          </TabsContent>
          <TabsContent value="whatsapp">
            <WhatsAppForm onSubmit={handleGenerate} />
          </TabsContent>
          <TabsContent value="wifi">
            <WifiForm onSubmit={handleGenerate} />
          </TabsContent>
          <TabsContent value="image">
            <ImageForm onSubmit={handleGenerate} />
          </TabsContent>
          <TabsContent value="video">
            <VideoForm onSubmit={handleGenerate} />
          </TabsContent>

          <Collapsible open={isOptionsOpen} onOpenChange={setIsOptionsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between">
                Customize QR Code
                <ChevronDown className={`w-4 h-4 transition-transform ${isOptionsOpen ? 'transform rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={qrOptions.backgroundColor}
                    onChange={(e) => setQrOptions({...qrOptions, backgroundColor: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dotsColor">Dots Color</Label>
                  <Input
                    id="dotsColor"
                    type="color"
                    value={qrOptions.dotsColor}
                    onChange={(e) => setQrOptions({...qrOptions, dotsColor: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="markerBorderColor">Marker Border Color</Label>
                  <Input
                    id="markerBorderColor"
                    type="color"
                    value={qrOptions.markerBorderColor}
                    onChange={(e) => setQrOptions({...qrOptions, markerBorderColor: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="markerCenterColor">Marker Center Color</Label>
                  <Input
                    id="markerCenterColor"
                    type="color"
                    value={qrOptions.markerCenterColor}
                    onChange={(e) => setQrOptions({...qrOptions, markerCenterColor: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Dots Style</Label>
                  <Select 
                    value={qrOptions.dotsStyle} 
                    onValueChange={(value: QRShape) => setQrOptions({...qrOptions, dotsStyle: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="dots">Dots</SelectItem>
                      <SelectItem value="rounded">Rounded</SelectItem>
                      <SelectItem value="classy">Classy</SelectItem>
                      <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Marker Style</Label>
                  <Select 
                    value={qrOptions.markerStyle} 
                    onValueChange={(value: QRShape) => setQrOptions({...qrOptions, markerStyle: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="dots">Dots</SelectItem>
                      <SelectItem value="rounded">Rounded</SelectItem>
                      <SelectItem value="classy">Classy</SelectItem>
                      <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Marker Center Style</Label>
                  <Select 
                    value={qrOptions.markerCenterStyle} 
                    onValueChange={(value: QRShape) => setQrOptions({...qrOptions, markerCenterStyle: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="dots">Dots</SelectItem>
                      <SelectItem value="rounded">Rounded</SelectItem>
                      <SelectItem value="classy">Classy</SelectItem>
                      <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logo">Add Logo (optional)</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
              />
            </div>
            
            {logo && (
              <div className="space-y-2">
                <Label htmlFor="logoSize">Logo Size</Label>
                <Input
                  id="logoSize"
                  type="range"
                  min="32"
                  max="128"
                  value={logoSize}
                  onChange={(e) => setLogoSize(Number(e.target.value))}
                />
              </div>
            )}
          </div>

          {qrValue && (
            <div className="mt-4 space-y-4">
              <div className="flex justify-center p-4 bg-white rounded-lg">
                <QRCodeSVG
                  id="QRCode"
                  value={qrValue}
                  size={256}
                  level="H"
                  bgColor={qrOptions.backgroundColor}
                  fgColor={qrOptions.dotsColor}
                  includeMargin={true}
                  imageSettings={logo ? {
                    src: logo,
                    height: logoSize,
                    width: logoSize,
                    excavate: true,
                  } : undefined}
                />
              </div>
              <Button onClick={handleDownload} className="w-full">
                Download QR Code
              </Button>
            </div>
          )}
        </div>
      </Tabs>
    </Card>
  )
} 