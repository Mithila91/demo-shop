'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { Product } from '../lib/sanity'

export interface CartItem {
  product: Product
  quantity: number
  selectedVariant?: {
    name: string
    sku: string
    price?: number
  }
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  total: number
  itemCount: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number; variant?: CartItem['selectedVariant'] } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; variantSku?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number; variantSku?: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }

const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
  itemCount: 0,
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const price = item.selectedVariant?.price ?? item.product.price
    return total + (price * item.quantity)
  }, 0)
}

function calculateItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0)
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1, variant } = action.payload
      const existingItemIndex = state.items.findIndex(
        item => 
          item.product._id === product._id && 
          item.selectedVariant?.sku === variant?.sku
      )

      let newItems: CartItem[]
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        newItems = [...state.items, { product, quantity, selectedVariant: variant }]
      }

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      }
    }

    case 'REMOVE_ITEM': {
      const { productId, variantSku } = action.payload
      const newItems = state.items.filter(
        item => !(
          item.product._id === productId && 
          item.selectedVariant?.sku === variantSku
        )
      )

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      }
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity, variantSku } = action.payload
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { productId, variantSku } })
      }

      const newItems = state.items.map(item =>
        item.product._id === productId && item.selectedVariant?.sku === variantSku
          ? { ...item, quantity }
          : item
      )

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      }
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      }

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      }

    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true,
      }

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      }

    case 'LOAD_CART': {
      const items = action.payload
      return {
        ...state,
        items,
        total: calculateTotal(items),
        itemCount: calculateItemCount(items),
      }
    }

    default:
      return state
  }
}

interface CartContextType extends CartState {
  addItem: (product: Product, quantity?: number, variant?: CartItem['selectedVariant']) => void
  removeItem: (productId: string, variantSku?: string) => void
  updateQuantity: (productId: string, quantity: number, variantSku?: string) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items))
  }, [state.items])

  const addItem = (product: Product, quantity = 1, variant?: CartItem['selectedVariant']) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, variant } })
  }

  const removeItem = (productId: string, variantSku?: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantSku } })
  }

  const updateQuantity = (productId: string, quantity: number, variantSku?: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity, variantSku } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' })
  }

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}