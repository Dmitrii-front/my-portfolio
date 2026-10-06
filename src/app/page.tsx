import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  return (
    <main>
      <section className="foundation" aria-labelledby="foundation-title">
        <p className="eyebrow">{siteConfig.name}</p>
        <h1 id="foundation-title">Portfolio 2026</h1>
        <p>Production foundation is ready. Product interface work starts in Phase 1.</p>
      </section>
    </main>
  );
}
