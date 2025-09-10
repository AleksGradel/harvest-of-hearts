export interface Slug {
  current: string
}
export interface ItemReference {
  _id: string
  name: string
  slug?: Slug
  imageUrl?: string
}

export interface CharacterReference {
  _id: string
  name: string
  slug?: Slug
  image?: {
    asset?: {
      url: string
    }
  }
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
  }
  loves?: ItemReference[]
  likes?: ItemReference[]
  dislikes?: ItemReference[]
  hates?: ItemReference[]
}

export interface Item {
  _id: string;
  _type: "item";
  name: string;
  slug: {
    _type: "slug";
    current: string;
  };
  imageUrl?: string;
  description?: string;
  category?:
    | "food"
    | "artisan"
    | "crop"
    | "fish"
    | "mineral"
    | "forage"
    | "animal"
    | "cooking"
    | "cooking-ingredient"
    | "resource"
    | "trash"
    | "artifacts"
    | "trinkets"
    | "books"
    | "other";
}