export interface ItemReference {
  _id: string
  name: string
  imageUrl?: string
}

export interface Character {
  _id: string
  name: string
  description?: string
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