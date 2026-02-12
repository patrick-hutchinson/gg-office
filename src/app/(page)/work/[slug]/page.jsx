import Project from "./Project";
import sanityClient from "/src/client";

export async function generateStaticParams() {
  const projects = await sanityClient.fetch(`*[_type=="project"]{ slug }`);

  return projects.map((project) => ({
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
