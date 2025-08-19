export const charactersQuery = `*[_type == "character"]{
  _id,
  name,
  description,
  "slug": slug.current,
  image {
    asset->{
      url
    }
  }
}`