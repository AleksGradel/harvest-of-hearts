export const charactersQuery = `*[_type == "character"]{
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
