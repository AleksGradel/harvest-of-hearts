import { sanityClient } from "@/lib/sanity/sanity";
import groq from "groq";
import Link from "next/link";

const categoriesQuery = groq`
  array::unique(
    *[_type == "item" && defined(category)].category
  ) | order(@ asc)
`;

export async function generateMetadata() {
  return {
		title: 'Categories - Harvest of Hearts',
	}
}

export default async function CategoriesIndexPage() {
  const categories: string[] = await sanityClient.fetch(categoriesQuery);

  return (
    <main className="rounded-2xl shadow-lg p-4 bg-white">
      <h1 className="flex justify-center text-xl font-bold mb-6">Categories</h1>

      {(!categories || categories.length === 0) ? (
        <p className="text-gray-600">No categories found.</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <li key={cat}>
              <Link
                href={`/gifts/categories/${encodeURIComponent(cat)}`}
                className="block p-4 bg-[#f2c0cd] border border-[#d98fa3] rounded-xl shadow 
				hover:bg-[#e6a9b9] transition text-white text-center"
              >
                <span className="capitalize">
                  {cat.replace(/-/g, " ")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}