import { useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export default function FavoriteButton({ productId, name }) {
  const key = `favorite:${productId}`
  const [isFavorite, setIsFavorite] = useLocalStorage(key, false)

  useEffect(() => {
    localStorage.setItem(key, String(isFavorite))
  }, [key, isFavorite])

  return (
    <button
      type="button"
      className="favorite-button"
      aria-label={`До обраного: ${name}`}
      aria-pressed={isFavorite}
      onClick={() => setIsFavorite(!isFavorite)}
    >
      {isFavorite ? '♥' : '♡'}
    </button>
  )
}
