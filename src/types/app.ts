export interface MovieListProps {
  title: string
  path: string
  coverType: 'poster' | 'backdrop'
}

export interface Movie {
  backdrop_path: string
  genres: { id: number; name: string }
  homepage: string
  id: number
  original_title: string
  overview: string
  popularity: number
  poster_path: number
  original_language: string
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }
  production_countries: {
    iso_3166_1: string
    name: string
  }
  release_date: Date
  revenue: number
  runtime: number
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface MovieItemProps {
  movie: Movie
  size: { width: number; height: number }
  coverType: 'poster' | 'backdrop'
}