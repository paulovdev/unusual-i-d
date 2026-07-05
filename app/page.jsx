import Nav from "@/components/layout/nav";

import Hero from "@/features/home/home";
import { client } from "@/lib/sanity.client";
import { WORK_QUERY, ARTICLE_QUERY } from "@/lib/sanity.queries";

export default async function Page() {
  const work = await client.fetch(WORK_QUERY);
  const article = await client.fetch(ARTICLE_QUERY);
  if (!work) {
    return <div>asdasdas</div>;
  }
  if (!article) {
    return <div>asdasdas</div>;
  }
  return (
    <>
      <main className="relative min-h-screen">
        <Hero work={work} article={article} />
      </main>
    </>
  );
}
