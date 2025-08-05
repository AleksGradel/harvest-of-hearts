export const charactersQuery = `*[_type == "character"]{
  _id,
  name,
  description,
  image {
    asset->{
      url
    }
  }
}`