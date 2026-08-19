import Link from "next/link";
import { notFound } from "next/navigation";
import { depthModules, getDepthModule } from "@/lib/content/depth-library";
import { depthScenesBySlug } from "@/lib/content/depth-chart-scenes";
import { LessonBlockList } from "@/components/lesson/LessonBlocks";
import { LegendStrip } from "@/components/diagrams/LegendStrip";

export function generateStaticParams() {
  return depthModules.map((m) => ({ module: m.slug }));
}

export default async function DepthModulePage(props: PageProps<"/learn/[module]">) {
  const { module: slug } = await props.params;
  const mod = getDepthModule(slug);
  if (!mod) notFound();

  const index = depthModules.findIndex((m) => m.slug === mod.slug);
  const prev = index > 0 ? depthModules[index - 1] : null;
  const next = index < depthModules.length - 1 ? depthModules[index + 1] : null;
  const scene = mod.hasChart ? depthScenesBySlug[mod.slug] : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/learn" className="text-xs font-bold uppercase tracking-wide text-accent">
        {mod.phase} · Module {String(mod.number).padStart(2, "0")}
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-text sm:text-3xl">{mod.title}</h1>

      <div className="mt-6">
        {mod.status === "ready" && <LegendStrip />}
        <LessonBlockList blocks={mod.blocks} scene={scene} />
      </div>

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-5 text-sm">
        {prev ? (
          <Link href={`/learn/${prev.slug}`} className="text-text-muted hover:text-text">
            ← {prev.title}
          </Link>
        ) : (
          <Link href="/learn" className="text-text-muted hover:text-text">
            ← Depth library
          </Link>
        )}
        {next && (
          <Link href={`/learn/${next.slug}`} className="font-bold text-accent hover:text-accent/80">
            {next.title} →
          </Link>
        )}
      </div>
    </div>
  );
}
