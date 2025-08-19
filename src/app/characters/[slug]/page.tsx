import { sanityClient } from "@/lib/sanity/sanity";

const characterQuery = `
  *[_type == "character" && slug.current == $slug][0]{
    _id,
    name,
    description,
    image {
      asset->{
        url
      }
    }
  }
`

interface Props {
  params: { slug: string }
}

export default async function CharacterPage({ params }: Props) {
  const character = await sanityClient.fetch(characterQuery, {
    slug: params.slug,
  })

  if (!character) {
    return <div className="p-8">Character not found</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{character.name}</h1>
      {character.image?.asset?.url && (
        <img
          src={character.image.asset.url}
          alt={character.name}
          className="w-64 h-auto mb-4"
        />
      )}
      <p className="text-gray-700">{character.description}</p>
    </div>
  )
}