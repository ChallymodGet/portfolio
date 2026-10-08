import Hero from "@/components/canvas/Hero";

export default function Home() {
  return (
    <main className="bg-charcoal-900">
      <Hero />
      {/* We will add the Case Studies and IDE section here next */}
      <section className="h-screen w-full flex items-center justify-center">
        <h2 className="text-3xl font-mono text-gray-600">Next Section: The Case Studies...</h2>
      </section>
    </main>
  );
}
