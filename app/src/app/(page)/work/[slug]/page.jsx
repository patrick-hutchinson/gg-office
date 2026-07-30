import Project from "./Project";
import { sanityServerClient } from "@/lib/sanity/serverClient";

export async function generateStaticParams() {
  const projects = await sanityServerClient.fetch(`*[_type=="project"]{ slug }`);

  return projects
    .filter((project) => project.slug?.current)
    .map((project) => ({
      slug: project.slug.current,
    }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  return (
    <main className="project">
      <Project slug={slug} />
    </main>
  );
}
