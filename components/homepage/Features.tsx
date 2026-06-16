import Image from "next/image";
import { Zap, Building2, LayoutDashboard, FileText, Search, TrendingUp } from "lucide-react";

type FeaturePoint = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const managePoints: FeaturePoint[] = [
  {
    icon: Zap,
    title: "Find Jobs Automatically",
    description:
      "AI scans thousands of listings and scores each one against your profile so you only see the roles worth your time.",
  },
  {
    icon: Building2,
    title: "Know the Company Before You Apply",
    description:
      "One click researches every company's tech stack, culture, and values — pulled directly from their own website.",
  },
  {
    icon: LayoutDashboard,
    title: "Keep Track of Every Application",
    description:
      "Your dashboard shows all jobs, match scores, and research in one place. No more spreadsheets or sticky notes.",
  },
];

const applyPoints: FeaturePoint[] = [
  {
    icon: FileText,
    title: "Tailored Resumes in Seconds",
    description:
      "AI rewrites your resume to match each job's exact requirements, highlighting the right skills every time.",
  },
  {
    icon: Search,
    title: "Research the Company Before Your Interview",
    description:
      "Get a full briefing on tech stack, culture, and smart questions to ask — all generated before you walk in.",
  },
  {
    icon: TrendingUp,
    title: "Know Your Match Score Upfront",
    description:
      "See exactly how well you fit a role before spending time applying. Stop guessing, start winning.",
  },
];

function FeatureList({ points }: { points: FeaturePoint[] }) {
  return (
    <div className="flex flex-col gap-6 md:gap-7">
      {points.map((point) => (
        <div key={point.title} className="flex gap-4">
          <div className="w-10 h-10 bg-accent-muted rounded-lg flex items-center justify-center shrink-0">
            <point.icon className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-1">
              {point.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {point.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Features() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-16 md:gap-24">

        {/* Block 1 — text left, image right (both orders fine on mobile: text → image) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary leading-snug mb-8 md:mb-10">
              Manage Your Job Search
              <br />
              With Ease
            </h2>
            <FeatureList points={managePoints} />
          </div>
          <div>
            <Image
              src="/images/jobs-lists.png"
              alt="Job listings table with match scores"
              width={580}
              height={480}
              className="rounded-xl md:rounded-2xl shadow-xl w-full"
            />
          </div>
        </div>

        {/* Block 2 — on mobile: text first, image second. On desktop: image left, text right. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text — order-1 on mobile (shows first), order-2 on desktop (right column) */}
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary leading-snug mb-8 md:mb-10">
              Apply With More
              <br />
              Confidence, Every Time
            </h2>
            <FeatureList points={applyPoints} />
          </div>
          {/* Image — order-2 on mobile (shows second), order-1 on desktop (left column) */}
          <div className="order-2 lg:order-1">
            <Image
              src="/images/agnet-log.png"
              alt="AI agent log running job search"
              width={580}
              height={420}
              className="rounded-xl md:rounded-2xl shadow-xl w-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
