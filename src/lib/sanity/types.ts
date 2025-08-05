export interface Character {
  _id: string
  name: string
  description?: string
  image?: {
    asset?: {
      url: string
    }
  }
}