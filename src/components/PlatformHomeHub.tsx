import React from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bot,
  FileCheck2,
  Layers,
  LogOut,
  Radar,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { SUBJECTS } from "../data/lessons.ts";
import type {
  AccessibilitySettings,
  LessonData,
  SubjectId,
  UILanguage,
  UserRole,
} from "../types.ts";
import { SubjectSculpture } from "./SubjectSculptures.tsx";
import { DailyScienceFact } from "./DailyScienceFact.tsx";
import { speakWithBrowser } from "../utils/speech.ts";

export type WorkspaceDestination =
  | "home"
  | "library"
  | "studio"
  | "radar"
  | "kahoot"
  | "chatbot"
  | "inclusive";

interface PlatformHomeHubProps {
  uiLang: UILanguage;
  userRole: UserRole;
  userName: string;
  activeLesson: LessonData;
  lessonsCount: number;
  settings: AccessibilitySettings;
  onNavigate: (destination: WorkspaceDestination, subjectId?: SubjectId) => void;
  onBackToEntry: () => void;
  onLaunchBuzzerMap?: () => void;
}

const HUB_CARDS: Array<{
  id: Exclude<WorkspaceDestination, "home">;
  num: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: "radar",
    num: "01",
    titleAr: "رادار الفهم المباشر",
    titleEn: "AI Understanding Radar",
    descAr: "فحص فهم الفصل لحظياً، كشف التصورات الخاطئة، تدخل تدريسي ذكي وقياس التحسن.",
    descEn: "Live comprehension radar, misconception diagnosis, AI intervention & impact tracking.",
    icon: Radar,
  },
  {
    id: "library",
    num: "02",
    titleAr: "الكتب، فورمة التحضير، والدروس",
    titleEn: "Books, Prep Form & Lessons",
    descAr: "مكتبة الكتب الدائمة وفهرسة الدروس وفورمة التحضير وتصوير الصفحات.",
    descEn: "Permanent textbook library, Prep Form templates & lesson camera.",
    icon: BookOpen,
  },
  {
    id: "studio",
    num: "03",
    titleAr: "استوديو إنتاج المحتوى",
    titleEn: "Content Studio",
    descAr: "تحضير الدروس، عروض PowerPoint التلقائية، أوراق العمل، والفيديو.",
    descEn: "Lesson plans, auto-generated PowerPoint, worksheets & video.",
    icon: Layers,
  },
  {
    id: "kahoot",
    num: "04",
    titleAr: "المسابقات التفاعلية المباشرة",
    titleEn: "Live Classroom Quiz",
    descAr: "إنشاء مسابقات حية برمز غرفة ولوحة متصدرين وتقارير أداء فورية.",
    descEn: "Host live room competitions with instant leaderboard & reports.",
    icon: Trophy,
  },
  {
    id: "chatbot",
    num: "05",
    titleAr: "المساعد التعليمي الذكي",
    titleEn: "AI Science Tutor",
    descAr: "محادثة صوتية وكتابية تكتشف مواطن الضعف وتبسط الشرح.",
    descEn: "Voice and text tutoring with remediation & level tuning.",
    icon: Bot,
  },
  {
    id: "inclusive",
    num: "06",
    titleAr: "التعلم الشامل لذوي الهمم",
    titleEn: "Inclusive Learning",
    descAr: "محاكاة تفاعلية، قراءة صوتية، ترجمة فيديو، واختبارات مرنة.",
    descEn: "Labs, neural TTS, video captions & untimed adaptive quizzes.",
    icon: Sparkles,
  },
];

export const PlatformHomeHub: React.FC<PlatformHomeHubProps> = ({
  uiLang,
  userRole,
  userName,
  activeLesson,
  lessonsCount,
  settings,
  onNavigate,
  onBackToEntry,
  onLaunchBuzzerMap,
}) => {
  const isAr = uiLang === "ar";
  const EnterArrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-6 pb-8">
      {/* Workspace Welcome Strip */}
      <motion.section
        initial={settings.reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="science-card rounded-3xl border p-6 flex flex-wrap items-center justify-between gap-4"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-hairline)",
        }}
      >
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
            <span>smart science ai</span>
            <span aria-hidden="true">·</span>
            <span>
              {userRole === "teacher"
                ? isAr
                  ? "مساحة عمل المعلم"
                  : "Teacher Workspace"
                : isAr
                  ? "مساحة عمل الطالب"
                  : "Student Workspace"}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-num">
              {isAr ? `${lessonsCount} دروس متاحة` : `${lessonsCount} Lessons`}
            </span>
          </div>
          <h1 className="font-display text-xl md:text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            {userName.trim()
              ? isAr
                ? `أهلاً بك يا ${userName.trim()} في لوحة smart science ai`
                : `Welcome, ${userName.trim()}, to smart science ai`
              : isAr
                ? "لوحة التحكم والأدوات التعليمية — smart science ai"
                : "Learning & Teaching Hub — smart science ai"}
          </h1>
          <p className="text-xs md:text-sm" style={{ color: "var(--text-secondary)" }}>
            {isAr
              ? `الدرس النشط حالياً: «${activeLesson.title}» (${activeLesson.subject}) — اختر الأداة أو المادة للمتابعة.`
              : `Active lesson: "${activeLesson.title}" (${activeLesson.subject}) — choose a workspace tool or subject.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate(userRole === "teacher" ? "studio" : "library")}
            className="min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "var(--accent-contrast)",
            }}
          >
            <span>
              {userRole === "teacher"
                ? isAr
                  ? "فتح استوديو التحضير والعروض"
                  : "Open Content Studio"
                : isAr
                  ? "استعراض المواد والدروس"
                  : "Browse Subjects & Lessons"}
            </span>
            <EnterArrow className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate("radar")}
            className="min-h-[42px] px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 whitespace-nowrap"
            style={{
              backgroundColor: "var(--bg-subtle)",
              borderColor: "var(--accent-primary)",
              color: "var(--accent-primary)",
            }}
          >
            <Radar className="w-4 h-4" />
            <span>{isAr ? "رادار الفهم المباشر" : "Understanding Radar"}</span>
          </button>

          {onLaunchBuzzerMap && (
            <button
              type="button"
              onClick={onLaunchBuzzerMap}
              className="min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap shadow-sm"
              style={{
                backgroundColor: "#d97706",
                color: "#ffffff",
              }}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{isAr ? "خريطة المراحل والبزر" : "Buzzer Quest Map"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onNavigate("library")}
            className="min-h-[42px] px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap"
            style={{
              backgroundColor: "var(--bg-subtle)",
              borderColor: "var(--border-hairline)",
              color: "var(--text-primary)",
            }}
          >
            <FileCheck2 className="w-4 h-4" style={{ color: "var(--accent-primary)" }} />
            <span>{isAr ? "الكتب وفورمة التحضير" : "Books & Prep Form"}</span>
          </button>

          <button
            type="button"
            onClick={onBackToEntry}
            className="min-h-[42px] px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap"
            style={{
              backgroundColor: "transparent",
              borderColor: "var(--border-hairline)",
              color: "var(--text-secondary)",
            }}
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isAr ? "العودة لصفحة الدخول 3D" : "3D Entry Page"}</span>
          </button>
        </div>
      </motion.section>

      {/* Core Workspace Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {HUB_CARDS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className="group text-start p-4 rounded-2xl border transition-all hover:-translate-y-0.5 flex flex-col justify-between gap-3 science-card"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-hairline)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  borderColor: "var(--border-hairline)",
                  color: "var(--accent-primary)",
                }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-sm font-bold block" style={{ color: "var(--text-primary)" }}>
                  <span className="font-mono-num opacity-65 mx-1">{item.num}.</span>
                  {isAr ? item.titleAr : item.titleEn}
                </span>
                <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Daily Science Fact Card */}
      <DailyScienceFact
        uiLang={uiLang}
        settings={settings}
        onRobotReadFact={(speechText) => {
          speakWithBrowser(speechText, settings.speechRate, undefined, undefined, uiLang);
        }}
        onAskRobotAboutFact={() => {
          onNavigate("chatbot");
        }}
      />

      {/* 5 Science Subjects Gateway */}
      <section
        className="rounded-3xl border p-5 md:p-6 science-card space-y-4"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-hairline)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              {isAr ? "بوابات المواد العلمية" : "Science Subject Gateways"}
            </h2>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              {isAr
                ? "اختر المادة لفتح مكتبتها وكتبها الدائمة ودروسها."
                : "Select a subject to open its permanent textbooks and lessons."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {SUBJECTS.map((subj) => (
            <button
              key={subj.id}
              type="button"
              onClick={() => onNavigate("library", subj.id)}
              className="group p-4 rounded-2xl border text-start transition-all hover:-translate-y-1 flex flex-col items-center text-center gap-2.5"
              style={{
                backgroundColor: "var(--bg-subtle)",
                borderColor: "var(--border-hairline)",
              }}
            >
              <SubjectSculpture
                subjectId={subj.id}
                size="sm"
                reducedMotion={settings.reduceMotion}
              />
              <div>
                <div className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                  {isAr ? subj.nameAr : subj.nameEn}
                </div>
                <div className="text-[11px] line-clamp-1 mt-0.5" style={{ color: "var(--text-secondary)" }}>
                  {isAr ? "فتح القسم" : "Open Subject"}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
