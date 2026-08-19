import Link from "next/link";
import { notFound } from "next/navigation";
import { beginnerAcademyLessons, getLesson } from "@/lib/content/beginner-academy";
import { scenesBySlug } from "@/lib/content/chart-scenes";
import LessonChart from "@/components/chart/LessonChart";
import {
  CalloutBlock,
  ConceptGrid,
  DataTableBlock,
  DecisionChainBlock,
  FormulaCardBlock,
  RecallCheckBlock,
  TruthTableBlock,
} from "@/components/lesson/LessonBlocks";
import { LessonNextButton } from "@/components/lesson/LessonNav";

export function generateStaticParams() {
  return beginnerAcademyLessons.map((l) => ({ lesson: l.slug }));
}

export default async function BeginnerLessonPage(props: PageProps<"/start/beginner-academy/[lesson]">) {
  const { lesson: slug } = await props.params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const scene = lesson.hasChart ? scenesBySlug[lesson.slug] : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/start/beginner-academy" className="text-xs font-bold uppercase tracking-wide text-accent">
        {lesson.stageKicker}
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-text sm:text-3xl">{lesson.title}</h1>
      <p className="mt-2 text-sm text-text-muted">Goal: {lesson.goal}</p>

      <div className="mt-6 space-y-6">
        {scene && <LessonChart scene={scene} />}
        {lesson.concepts && <ConceptGrid concepts={lesson.concepts} />}
        {lesson.formulaCard && <FormulaCardBlock card={lesson.formulaCard} />}
        {lesson.dataTable && <DataTableBlock table={lesson.dataTable} />}
        {lesson.truthTable && <TruthTableBlock pair={lesson.truthTable} />}
        {lesson.decisionChain && <DecisionChainBlock steps={lesson.decisionChain} />}
        {lesson.callout && <CalloutBlock callout={lesson.callout} />}
        {lesson.recallChecks.map((check) => (
          <RecallCheckBlock key={check.id} check={check} />
        ))}
      </div>

      <LessonNextButton slug={lesson.slug} nextSlug={lesson.nextSlug} nextLabel={lesson.nextLabel} />
    </div>
  );
}
