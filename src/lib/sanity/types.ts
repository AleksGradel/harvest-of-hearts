export interface Slug {
  current: string
}
export interface ItemReference {
  _id: string
  name: string
  slug?: Slug
  imageUrl?: string
}

export interface Character {
  _id: string
  name: string
  description?: string
  slug?: string
  birthday?: string
  location?: string
  image?: {
    asset?: {
      url: string
    }
  },
  loves?: ItemReference[]
  likes?: ItemReference[]
  dislikes?: ItemReference[]
  hates?: ItemReference[]
}