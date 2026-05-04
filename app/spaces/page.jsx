import Nav from "@/components/layout/nav";

import SpacesHero from "@/features/spaces/spaces";
import { client } from "@/lib/sanity.client";
import { WORK_QUERY } from "@/lib/sanity.queries";

export default async function Page() {
  const work = await client.fetch(WORK_QUERY);

  return (
    <>
      <Nav />
      <main className="relative min-h-screen">
        <SpacesHero work={work} />
      </main>
    </>
  );
}
