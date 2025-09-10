import { NextResponse } from "next/server"
import { sanityClient } from "@/lib/sanity/sanity";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q") || ""

  const results = await sanityClient.fetch(
    `*[_type == "item" && name match $search + "*"] | order(name asc){
      _id, name, slug, imageUrl
    }`,
    { search: query }
  )

  return NextResponse.json(results)
}