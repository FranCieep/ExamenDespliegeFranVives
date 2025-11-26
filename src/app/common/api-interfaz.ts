export interface Characters{
    
  id: number
  name: string
  ki: string
  maxKi: string
  race: string
  gender: string
  description: string
  image: string
  affiliation: string
  deletedAt: any
}

export interface CharactersResponse {
  items: Characters[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
  links: {
    first: string
    previous: string
    next: string
    last: string
  }
}

