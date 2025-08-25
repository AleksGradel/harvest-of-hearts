export const charactersQuery = `*[_type == "character"] | order(name asc){
  _id,
  name,
  description,
  birthday,
  location,
  "slug": slug.current,
  image {
    asset->{
      url
    }
  },
  loves[]->{
      _id, name, imageUrl
    },
    likes[]->{
      _id, name, imageUrl
    },
    dislikes[]->{
      _id, name, imageUrl
    },
    hates[]->{
      _id, name, imageUrl
    }
}`

export const itemQuery = `*[_type == "item" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    imageUrl,
    description,
    category,
    "lovedBy": *[_type == "character" && references(^._id)]{
      _id,
      name,
      slug
    }
  }`
