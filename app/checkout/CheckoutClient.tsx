'use client'

import { useState } from 'react'
import { useCart } from '@/app/context/CartContext'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Separator } from '@/app/components/ui/separator'
import { Badge } from '@/app/components/ui/badge'
import { ArrowLeft, CreditCard, MapPin, Truck, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useToast } from '@/app/hooks/use-toast'

interface CustomerInfo {
  email: string
  firstName: string
  lastName: string
  phone: string
  address: string
  city: string
  zipCode: string
  country: string
}

interface ShippingOption {
  id: string
  name: string
  description: string
  price: number
  estimatedDays: string
}

export function CheckoutClient() {
  const { items, total, clearCart } = useCart()
  const { toast } = useToast()
  
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping')
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Sverige'
  })
  const [selectedShipping, setSelectedShipping] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const shippingOptions: ShippingOption[] = [
    {
      id: 'standard',
      name: 'Standard frakt',
      description: 'Leverans till utlämningsställe',
      price: 49,
      estimatedDays: '2-4 arbetsdagar'
    },
    {
      id: 'express',
      name: 'Express frakt',
      description: 'Snabb leverans hem till dig',
      price: 99,
      estimatedDays: '1-2 arbetsdagar'
    },
    {
      id: 'free',
      name: 'Fri frakt',
      description: 'Gratis leverans (vid köp över 500 kr)',
      price: 0,
      estimatedDays: '3-5 arbetsdagar'
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
    }).format(price)
  }

  const selectedShippingOption = shippingOptions.find(option => option.id === selectedShipping)
  const shippingCost = selectedShippingOption?.price || 0
  const subtotal = total
  const totalWithShipping = subtotal + shippingCost

  // Auto-select free shipping if eligible
  const isFreeShippingEligible = subtotal >= 500
  
  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }))
  }

  const validateShippingInfo = () => {
    const required = ['email', 'firstName', 'lastName', 'address', 'city', 'zipCode']
    return required.every(field => customerInfo[field as keyof CustomerInfo].trim() !== '') && selectedShipping !== ''
  }

  const handleContinueToPayment = () => {
    if (!validateShippingInfo()) {
      toast({
        title: 'Ofullständig information',
        description: 'Vänligen fyll i alla obligatoriska fält.',
        variant: 'destructive'
      })
      return
    }
    setCurrentStep('payment')
  }

  const handlePlaceOrder = async () => {
    if (!paymentMethod || !agreeToTerms) {
      toast({
        title: 'Betalningsmetod saknas',
        description: 'Vänligen välj betalningsmetod och acceptera villkoren.',
        variant: 'destructive'
      })
      return
    }

    setIsProcessing(true)

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false)
      setCurrentStep('confirmation')
      clearCart()
      toast({
        title: 'Beställning genomförd!',
        description: 'Du kommer att få en bekräftelse via e-post inom kort.',
      })
    }, 2000)
  }

  if (items.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Din varukorg är tom</h1>
          <p className="text-muted-foreground mb-6">
            Lägg till produkter i din varukorg för att fortsätta till kassan.
          </p>
          <Button asChild>
            <Link href="/products">Fortsätt handla</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (currentStep === 'confirmation') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Tack för din beställning!</h1>
            <p className="text-muted-foreground">
              Din beställning har tagits emot och kommer att behandlas inom kort.
            </p>
          </div>
          
          <div className="space-y-4">
            <p>En bekräftelse har skickats till: <strong>{customerInfo.email}</strong></p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/products">Fortsätt handla</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Tillbaka hem</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/products" className="text-muted-foreground hover:text-foreground flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Fortsätt handla
              </Link>
            </li>
          </ol>
        </nav>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-8">
            <div className={`flex items-center ${currentStep === 'shipping' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === 'shipping' ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Leverans</span>
            </div>
            <div className="w-16 h-px bg-muted-foreground"></div>
            <div className={`flex items-center ${currentStep === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === 'payment' ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Betalning</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 'shipping' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Leveransadress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-post *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                        placeholder="din@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                        placeholder="070-123 45 67"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Förnamn *</Label>
                      <Input
                        id="firstName"
                        value={customerInfo.firstName}
                        onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                        placeholder="Anna"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Efternamn *</Label>
                      <Input
                        id="lastName"
                        value={customerInfo.lastName}
                        onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                        placeholder="Andersson"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Adress *</Label>
                      <Input
                        id="address"
                        value={customerInfo.address}
                        onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                        placeholder="Storgatan 123"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Stad *</Label>
                      <Input
                        id="city"
                        value={customerInfo.city}
                        onChange={(e) => handleCustomerInfoChange('city', e.target.value)}
                        placeholder="Stockholm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Postnummer *</Label>
                      <Input
                        id="zipCode"
                        value={customerInfo.zipCode}
                        onChange={(e) => handleCustomerInfoChange('zipCode', e.target.value)}
                        placeholder="123 45"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center">
                      <Truck className="w-5 h-5 mr-2" />
                      Välj leveranssätt
                    </h3>
                    <div className="space-y-3">
                      {shippingOptions.map((option) => {
                        const isDisabled = option.id === 'free' && !isFreeShippingEligible
                        return (
                          <div
                            key={option.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              selectedShipping === option.id
                                ? 'border-primary bg-primary/5'
                                : isDisabled
                                ? 'border-muted bg-muted/20 cursor-not-allowed'
                                : 'border-muted hover:border-primary/50'
                            }`}
                            onClick={() => !isDisabled && setSelectedShipping(option.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-4 h-4 rounded-full border-2 ${
                                  selectedShipping === option.id ? 'border-primary bg-primary' : 'border-muted-foreground'
                                }`}>
                                  {selectedShipping === option.id && (
                                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                  )}
                                </div>
                                <div>
                                  <p className={`font-medium ${isDisabled ? 'text-muted-foreground' : ''}`}>
                                    {option.name}
                                  </p>
                                  <p className={`text-sm ${isDisabled ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                                    {option.description} • {option.estimatedDays}
                                  </p>
                                  {isDisabled && (
                                    <p className="text-xs text-muted-foreground">
                                      Kräver köp över 500 kr
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className={`font-semibold ${isDisabled ? 'text-muted-foreground' : ''}`}>
                                {option.price === 0 ? 'Gratis' : formatPrice(option.price)}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <Button 
                    onClick={handleContinueToPayment} 
                    className="w-full"
                    size="lg"
                  >
                    Fortsätt till betalning
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === 'payment' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Betalning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Välj betalningsmetod</h3>
                    
                    {/* Payment Methods */}
                    <div className="space-y-3">
                      {[
                        { id: 'klarna', name: 'Klarna', description: 'Betala nu, senare eller dela upp' },
                        { id: 'card', name: 'Kort', description: 'Visa, Mastercard, American Express' },
                        { id: 'swish', name: 'Swish', description: 'Betala direkt med din mobil' },
                      ].map((method) => (
                        <div
                          key={method.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            paymentMethod === method.id
                              ? 'border-primary bg-primary/5'
                              : 'border-muted hover:border-primary/50'
                          }`}
                          onClick={() => setPaymentMethod(method.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              paymentMethod === method.id ? 'border-primary bg-primary' : 'border-muted-foreground'
                            }`}>
                              {paymentMethod === method.id && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{method.name}</p>
                              <p className="text-sm text-muted-foreground">{method.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={agreeToTerms}
                        onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        Jag accepterar{' '}
                        <Link href="/terms" className="text-primary hover:underline">
                          användarvillkoren
                        </Link>{' '}
                        och{' '}
                        <Link href="/privacy" className="text-primary hover:underline">
                          integritetspolicyn
                        </Link>
                      </Label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep('shipping')}
                      className="w-full"
                    >
                      Tillbaka
                    </Button>
                    <Button 
                      onClick={handlePlaceOrder} 
                      className="w-full"
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Bearbetar...' : `Slutför köp ${formatPrice(totalWithShipping)}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Ordersammanfattning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {items.map((item) => {
                    const price = item.selectedVariant?.price ?? item.product.price
                    const imageUrl = item.product.images[0]?.asset?.url
                    
                    return (
                      <div key={`${item.product._id}-${item.selectedVariant?.sku || 'default'}`} className="flex gap-3">
                        {imageUrl && (
                          <div className="relative h-12 w-12 rounded border overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={item.product.images[0]?.alt || item.product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.product.title}</p>
                          {item.selectedVariant && (
                            <p className="text-xs text-muted-foreground">{item.selectedVariant.name}</p>
                          )}
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Antal: {item.quantity}</span>
                            <span className="text-sm font-medium">{formatPrice(price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Delsumma:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Frakt:</span>
                    <span>
                      {selectedShippingOption 
                        ? (selectedShippingOption.price === 0 ? 'Gratis' : formatPrice(selectedShippingOption.price))
                        : 'Välj leveranssätt'
                      }
                    </span>
                  </div>

                  {isFreeShippingEligible && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Fri frakt tillämpas
                      </Badge>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Totalt:</span>
                  <span>{formatPrice(totalWithShipping)}</span>
                </div>

                <p className="text-xs text-muted-foreground">
                  Inkl. moms
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}