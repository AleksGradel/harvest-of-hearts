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
  }
}`