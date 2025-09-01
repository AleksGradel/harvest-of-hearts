import Link from "next/link";
import Image from "next/image";
import { sanityClient } from "@/lib/sanity/sanity";
import groq from "groq";
import { Item } from "@/lib/sanity/types";

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

const query = groq`
  *[_type == "item" && category == $category] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    imageUrl,
    category
  }
`;

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;

  return {
    title: `${category} - Harvest of Hearts`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const items: Item[] = await sanityClient.fetch(query, { category: category });

  if (!items || items.length === 0) {
    return <div>No items found for category {category}.</div>;
  }

  return (
    <div className="rounded-2xl shadow-lg p-4 bg-white">
      <h1 className="flex justify-center text-xl font-bold mb-6 capitalize">
        {category} Gifts
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <Link
            key={item._id}
            href={`/gifts/${item.slug}`}
            className="border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col items-center"
          >
            {item.imageUrl && (
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-lg mb-2"
              />
            )}
            <span className="text-center">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
