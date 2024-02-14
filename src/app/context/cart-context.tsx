'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface CartItem {
  productId: string
  quantity: number
  price: number
  name: string
  imageUrl: string
  priceId: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: CartItem) => void
  removeToCart: (productId: string) => void
  totalPriceInCart: () => number
  totalAmountItems: () => number
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(product: CartItem) {
    setCartItems((state) => {
      const productInCart = state.some(
        (item) => item.productId === product.productId,
      )

      if (productInCart) {
        return state.map((item) => {
          if (item.productId === product.productId) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      } else {
        return [...state, { ...product, quantity: 1 }]
      }
    })
  }

  function removeToCart(productId: string) {
    const filteredItem = cartItems.find((item) => item.productId === productId)

    if (!!filteredItem && filteredItem.quantity > 1) {
      setCartItems((state) => {
        return state.map((item) => {
          if (item.productId === productId) {
            return {
              ...item,
              quantity: item.quantity - 1,
            }
          } else {
            return item
          }
        })
      })
    } else {
      setCartItems((state) => {
        return state.filter((item) => item.productId !== productId)
      })
    }
  }

  function totalPriceInCart() {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.price
    }, 0)
  }

  function totalAmountItems() {
    return cartItems.reduce((total, item) => {
      return total + item.quantity
    }, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addToCart,
        removeToCart,
        totalPriceInCart,
        totalAmountItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
