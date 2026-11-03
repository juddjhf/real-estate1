import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const WishlistContext = createContext(null)
const STORAGE_KEY = 'aurel-estates-wishlist'

function readWishlist() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const value = stored ? JSON.parse(stored) : []
    return Array.isArray(value) ? value.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(readWishlist)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  const value = useMemo(
    () => ({
      wishlist,
      isSaved: (id) => wishlist.includes(id),
      toggleWishlist: (id) =>
        setWishlist((current) =>
          current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id],
        ),
      removeFromWishlist: (id) =>
        setWishlist((current) => current.filter((savedId) => savedId !== id)),
    }),
    [wishlist],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider')
  return context
}
