import { NextResponse } from "next/server";

import { resolveSite } from "@/lib/sanity/site";
import { sanityServerClient, sanityServerClientCanReadDrafts } from "@/lib/sanity/serverClient";
import { aboutQuery, contactQuery, filtersQuery, projectsQuery, researchQuery, siteQuery } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const [site, work, filters, contact, research, about] = await Promise.all([
    sanityServerClient.fetch(siteQuery),
    sanityServerClient.fetch(projectsQuery),
    sanityServerClient.fetch(filtersQuery),
    sanityServerClient.fetch(contactQuery),
    sanityServerClient.fetch(researchQuery),
    sanityServerClient.fetch(aboutQuery),
  ]);

  return NextResponse.json({
    site: resolveSite(site),
    work,
    filters: filters.map((filter) => filter.title).filter(Boolean),
    contact,
    research,
    about,
    canReadDrafts: sanityServerClientCanReadDrafts,
  });
}
