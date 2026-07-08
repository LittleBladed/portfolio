import "dotenv/config";
import { prisma } from "../lib/prisma";

const welcome = {
  slug: "hello-world",
  title: "Hello, world",
  summary:
    "Why I built this site: a place to write about the systems I build and what I learn shipping them.",
  content: `I'm Roan, a freelance full-stack engineer from Belgium. Over the past few years I've built and scaled platforms to hundreds of thousands of users — social platforms, community bots, and most recently a prediction-markets aggregator.

This site is where I write about that work: architecture decisions, scaling lessons, and the occasional post-mortem.

More entries coming soon — I'll be backfilling write-ups of past projects.`,
  titleNl: "Hallo, wereld",
  summaryNl:
    "Waarom ik deze site bouwde: een plek om te schrijven over de systemen die ik bouw en wat ik daarbij leer.",
  contentNl: `Ik ben Roan, freelance full-stack engineer uit België. De voorbije jaren bouwde en schaalde ik platformen naar honderdduizenden gebruikers — sociale platformen, community-bots en recent een aggregator voor prediction markets.

Op deze site schrijf ik over dat werk: architectuurkeuzes, lessen over schalen en af en toe een post-mortem.

Binnenkort meer artikels — ik werk aan verslagen van eerdere projecten.`,
  tags: "meta",
  publishedAt: new Date(),
};

async function main() {
  await prisma.post.upsert({
    where: { slug: welcome.slug },
    update: {
      titleNl: welcome.titleNl,
      summaryNl: welcome.summaryNl,
      contentNl: welcome.contentNl,
    },
    create: welcome,
  });
  console.log("Seeded:", welcome.slug);
}

main().finally(() => prisma.$disconnect());
