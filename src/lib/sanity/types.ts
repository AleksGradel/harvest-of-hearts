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
  }
}