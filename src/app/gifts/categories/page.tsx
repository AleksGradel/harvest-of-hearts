import { sanityClient } from "@/lib/sanity/sanity";
import groq from "groq";
import Link from "next/link";

const categoriesQuery = groq`
  array::unique(
    *[_type == "item" && defined(category)].category
  ) | order(@ asc)
`;

export default async function CategoriesIndexPage() {
  const categories: string[] = await sanityClient.fetch(categoriesQuery);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-amber-900 mb-6">Categories</h1>

      {(!categories || categories.length === 0) ? (
        <p className="text-gray-600">No categories found.</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <li key={cat}>
              <Link
                href={`/gifts/categories/${encodeURIComponent(cat)}`}
                className="block p-4 bg-amber-50 border border-amber-200 rounded-xl shadow hover:bg-amber-100 transition text-center"
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