import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
}

export function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, i) => {
        const ratingValue = i + 1
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${
              ratingValue <= rating
                ? "fill-yellow-400 text-yellow-400"
                : ratingValue <= rating + 0.5
                  ? "fill-yellow-400 text-yellow-400 fill-[50%]"
                  : "text-gray-300"
            }`}
          />
        )
      })}
    </div>
  )
}
