"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import {
  AlertTriangle,
  Upload,
  Sparkles,
  Plus,
  X,
  Calendar,
  ChevronDown,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface WorkExperience {
  id: number;
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  keyResponsibilities: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CompletionRing({ percent }: { percent: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width="96" height="96" viewBox="0 0 96 96" className="shrink-0">
      <circle
        cx="48"
        cy="48"
        r={radius}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="8"
      />
      <circle
        cx="48"
        cy="48"
        r={radius}
        fill="none"
        stroke="var(--color-error)"
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 48 48)"
      />
      <text
        x="48"
        y="48"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-sm font-semibold fill-text-primary"
        style={{ fontSize: 16, fontWeight: 600 }}
      >
        {percent}%
      </text>
    </svg>
  );
}

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-text-primary">{title}</h2>
        {subtitle && (
          <p className="mt-0.5 text-sm text-text-secondary">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors";

const selectClass =
  "w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent appearance-none cursor-pointer transition-colors";

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
      />
    </div>
  );
}

function TagInput({
  tags,
  onAdd,
  onRemove,
  placeholder,
}: {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  placeholder: string;
}) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onAdd(trimmed);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder={placeholder}
          className={inputClass}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-surface border border-border text-text-primary text-sm font-medium rounded-lg hover:bg-surface-secondary transition-colors shrink-0"
        >
          Add
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-accent-light text-accent text-xs font-medium rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemove(tag)}
                className="hover:opacity-70 transition-opacity"
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Work Experience Card ─────────────────────────────────────────────────────

function WorkExperienceCard({
  exp,
  onChange,
  onRemove,
  canRemove,
}: {
  exp: WorkExperience;
  onChange: (
    id: number,
    field: keyof WorkExperience,
    value: string | boolean,
  ) => void;
  onRemove: (id: number) => void;
  canRemove: boolean;
}) {
  return (
    <div className="border border-border rounded-xl p-5 flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Company Name">
          <input
            type="text"
            value={exp.companyName}
            onChange={(e) => onChange(exp.id, "companyName", e.target.value)}
            placeholder="Vercel"
            className={inputClass}
          />
        </FormField>
        <FormField label="Job Title">
          <input
            type="text"
            value={exp.jobTitle}
            onChange={(e) => onChange(exp.id, "jobTitle", e.target.value)}
            placeholder="Frontend Engineer"
            className={inputClass}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Start Date">
          <div className="relative">
            <input
              type="text"
              value={exp.startDate}
              onChange={(e) => onChange(exp.id, "startDate", e.target.value)}
              placeholder="January 2022"
              className={inputClass}
            />
            <Calendar
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
            />
          </div>
        </FormField>
        <FormField label="End Date">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={exp.currentlyWorking ? "" : exp.endDate}
                onChange={(e) => onChange(exp.id, "endDate", e.target.value)}
                placeholder="End Date"
                disabled={exp.currentlyWorking}
                className={`${inputClass} disabled:opacity-40`}
              />
            </div>
            <label className="flex items-center gap-2 text-xs text-text-secondary whitespace-nowrap cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={exp.currentlyWorking}
                onChange={(e) =>
                  onChange(exp.id, "currentlyWorking", e.target.checked)
                }
                className="w-4 h-4 accent-accent rounded"
              />
              Currently working here
            </label>
          </div>
        </FormField>
      </div>

      <FormField label="Key Responsibilities">
        <textarea
          value={exp.keyResponsibilities}
          onChange={(e) =>
            onChange(exp.id, "keyResponsibilities", e.target.value)
          }
          placeholder="Built Next.js features and optimized web vitals. Led a team of 3 developers."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </FormField>

      {canRemove && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onRemove(exp.id)}
            className="text-xs text-error hover:opacity-70 transition-opacity"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  // Personal Info
  const [fullName, setFullName] = useState("John Doe");
  const [email] = useState("johndoe@jobpilot.pro");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("linkedin.com/in/johndoe");
  const [portfolioUrl, setPortfolioUrl] = useState("github.com/johndoe");
  const [workAuth, setWorkAuth] = useState("Citizen");

  // Professional Info
  const [currentTitle, setCurrentTitle] = useState("Forward Deployed Engineer");
  const [experienceLevel, setExperienceLevel] = useState("Junior");
  const [yearsOfExperience, setYearsOfExperience] = useState("2");
  const [skills, setSkills] = useState([
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
  ]);
  const [industries, setIndustries] = useState<string[]>([]);

  // Work Experience
  const [experiences, setExperiences] = useState<WorkExperience[]>([
    {
      id: 1,
      companyName: "JobPilot",
      jobTitle: "Forward Deployed Engineer",
      startDate: "January 2022",
      endDate: "",
      currentlyWorking: true,
      keyResponsibilities:
        "Built Next.js features and optimized web vitals. Led a team of 3 developers.",
    },
  ]);

  // Education
  const [highestDegree, setHighestDegree] = useState("High School");
  const [fieldOfStudy, setFieldOfStudy] = useState("Computer Science");
  const [institutionName, setInstitutionName] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  // Job Preferences
  const [jobTitlesSeeking, setJobTitlesSeeking] = useState("");
  const [remotePref, setRemotePref] = useState("Any");
  const [salaryExpectation, setSalaryExpectation] = useState("");
  const [preferredLocations, setPreferredLocations] = useState("");

  // Resume drag state
  const [isDragging, setIsDragging] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // ── Completion calculation ────────────────────────────────────────────────
  const missingFields: string[] = [];
  if (!phone) missingFields.push("PHONE");
  if (!location) missingFields.push("LOCATION");
  if (!highestDegree || highestDegree === "") missingFields.push("EDUCATION");

  const totalRequired = 10;
  const filled = totalRequired - Math.min(missingFields.length, totalRequired);
  const completionPercent = Math.round((filled / totalRequired) * 100);

  // ── Work experience handlers ──────────────────────────────────────────────
  const handleExpChange = (
    id: number,
    field: keyof WorkExperience,
    value: string | boolean,
  ) => {
    setExperiences((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );
  };

  const addExperience = () => {
    if (experiences.length >= 3) return;
    setExperiences((prev) => [
      ...prev,
      {
        id: Date.now(),
        companyName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        keyResponsibilities: "",
      },
    ]);
  };

  const removeExperience = (id: number) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  // ── Drag & drop ───────────────────────────────────────────────────────────
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") setResumeFile(file);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-8">
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            {/* ── Completion Banner ───────────────────────────────────────── */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] flex items-center justify-between gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-error">
                  <AlertTriangle size={16} />
                  <span className="text-sm font-semibold">
                    Profile needs attention
                  </span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
                  Complete the missing fields to improve your chance of getting
                  tailored matches and generating quality resumes.
                </p>
                <div className="flex flex-wrap gap-2">
                  {missingFields.map((f) => (
                    <span
                      key={f}
                      className="px-2.5 py-0.5 bg-error/10 text-error text-xs font-semibold rounded-full tracking-wide"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <CompletionRing percent={completionPercent} />
            </div>

            {/* ── Resume ──────────────────────────────────────────────────── */}
            <SectionCard
              title="Resume"
              subtitle="Upload an existing resume to auto-fill the profile, or generate a new tailored one from your details below."
            >
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl py-10 px-6 transition-colors ${
                  isDragging
                    ? "border-accent bg-accent-muted"
                    : "border-border bg-surface-secondary"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center">
                  <Upload size={18} className="text-accent" />
                </div>
                {resumeFile ? (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-medium text-text-primary">
                      {resumeFile.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setResumeFile(null)}
                      className="text-xs text-error hover:opacity-70 transition-opacity"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-center">
                      <p className="text-sm font-medium text-text-primary">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        PDF formatting only. Maximum file size 5MB.
                      </p>
                    </div>
                    <label className="px-4 py-2 bg-surface border border-border text-text-primary text-sm font-medium rounded-lg hover:bg-surface-secondary transition-colors cursor-pointer">
                      Select Resume
                      <input
                        type="file"
                        accept=".pdf"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setResumeFile(file);
                        }}
                      />
                    </label>
                  </>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-xs text-text-muted">
                  Need a fresh document based on the fields below?
                </p>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity shrink-0"
                >
                  <Sparkles size={14} />
                  Generate Resume from Profile
                </button>
              </div>
            </SectionCard>

            {/* ── Profile Information ─────────────────────────────────────── */}
            <SectionCard
              title="Profile Information"
              subtitle="This context is used to accurately represent you in agent interactions."
            >
              <div className="flex flex-col gap-8">
                {/* Personal Info */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-4">
                    Personal Info
                  </h3>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Full Name">
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Full Name"
                          className={inputClass}
                        />
                      </FormField>
                      <FormField label="Email">
                        <input
                          type="email"
                          value={email}
                          readOnly
                          className={`${inputClass} opacity-60 cursor-not-allowed`}
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Phone Number">
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className={inputClass}
                        />
                      </FormField>
                      <FormField label="Location">
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="City, Country"
                          className={inputClass}
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="LinkedIn URL">
                        <input
                          type="url"
                          value={linkedinUrl}
                          onChange={(e) => setLinkedinUrl(e.target.value)}
                          placeholder="https://linkedin.com/in/you"
                          className={inputClass}
                        />
                      </FormField>
                      <FormField label="Portfolio / GitHub">
                        <input
                          type="url"
                          value={portfolioUrl}
                          onChange={(e) => setPortfolioUrl(e.target.value)}
                          placeholder="https://github.com/you"
                          className={inputClass}
                        />
                      </FormField>
                    </div>

                    <div className="max-w-xs">
                      <FormField label="Work Authorization">
                        <SelectWrapper>
                          <select
                            value={workAuth}
                            onChange={(e) => setWorkAuth(e.target.value)}
                            className={selectClass}
                          >
                            <option>Citizen</option>
                            <option>Permanent Resident</option>
                            <option>Work Visa (Ex: H-1B)</option>
                            <option>
                              OPT / CPT (Only for the United States)
                            </option>
                            <option>Require Sponsorship</option>
                          </select>
                        </SelectWrapper>
                      </FormField>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border" />

                {/* Professional Info */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-4">
                    Professional Info
                  </h3>
                  <div className="flex flex-col gap-4">
                    <FormField label="Current / Most Recent Job Title">
                      <input
                        type="text"
                        value={currentTitle}
                        onChange={(e) => setCurrentTitle(e.target.value)}
                        placeholder="Frontend Engineer"
                        className={inputClass}
                      />
                    </FormField>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Experience Level">
                        <SelectWrapper>
                          <select
                            value={experienceLevel}
                            onChange={(e) => setExperienceLevel(e.target.value)}
                            className={selectClass}
                          >
                            <option>Intern</option>
                            <option>Junior</option>
                            <option>Mid-Level</option>
                            <option>Senior</option>
                            <option>Lead</option>
                            <option>Principal</option>
                          </select>
                        </SelectWrapper>
                      </FormField>
                      <FormField label="Years of Experience">
                        <input
                          type="number"
                          value={yearsOfExperience}
                          onChange={(e) => setYearsOfExperience(e.target.value)}
                          placeholder="4"
                          min="0"
                          max="50"
                          className={inputClass}
                        />
                      </FormField>
                    </div>

                    <FormField label="Skills">
                      <TagInput
                        tags={skills}
                        onAdd={(t) => setSkills((p) => [...p, t])}
                        onRemove={(t) =>
                          setSkills((p) => p.filter((s) => s !== t))
                        }
                        placeholder="Add a skill..."
                      />
                    </FormField>

                    <FormField label="Industries (Optional)">
                      <TagInput
                        tags={industries}
                        onAdd={(t) => setIndustries((p) => [...p, t])}
                        onRemove={(t) =>
                          setIndustries((p) => p.filter((s) => s !== t))
                        }
                        placeholder="E.g. FinTech, Healthcare"
                      />
                    </FormField>
                  </div>
                </div>

                <div className="border-t border-border" />

                {/* Work Experience */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-text-primary">
                      Work Experience
                    </h3>
                    {experiences.length < 3 && (
                      <button
                        type="button"
                        onClick={addExperience}
                        className="flex items-center gap-1.5 text-xs font-medium text-accent hover:opacity-70 transition-opacity"
                      >
                        <Plus size={13} />
                        Add role
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col gap-4">
                    {experiences.map((exp) => (
                      <WorkExperienceCard
                        key={exp.id}
                        exp={exp}
                        onChange={handleExpChange}
                        onRemove={removeExperience}
                        canRemove={experiences.length > 1}
                      />
                    ))}
                  </div>
                </div>

                <div className="border-t border-border" />

                {/* Education */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-4">
                    Education
                  </h3>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Highest Degree">
                        <SelectWrapper>
                          <select
                            value={highestDegree}
                            onChange={(e) => setHighestDegree(e.target.value)}
                            className={selectClass}
                          >
                            <option>High School</option>
                            <option>Associate&apos;s</option>
                            <option>Bachelor&apos;s</option>
                            <option>Master&apos;s</option>
                            <option>PhD</option>
                            <option>Bootcamp</option>
                            <option>Self-taught</option>
                          </select>
                        </SelectWrapper>
                      </FormField>
                      <FormField label="Field of Study">
                        <input
                          type="text"
                          value={fieldOfStudy}
                          onChange={(e) => setFieldOfStudy(e.target.value)}
                          placeholder="Computer Science"
                          className={inputClass}
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Institution Name">
                        <input
                          type="text"
                          value={institutionName}
                          onChange={(e) => setInstitutionName(e.target.value)}
                          placeholder="E.g. State University"
                          className={inputClass}
                        />
                      </FormField>
                      <FormField label="Graduation Year">
                        <input
                          type="text"
                          value={graduationYear}
                          onChange={(e) => setGraduationYear(e.target.value)}
                          placeholder="YYYY"
                          className={inputClass}
                        />
                      </FormField>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border" />

                {/* Job Preferences */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-4">
                    Job Preferences
                  </h3>
                  <div className="flex flex-col gap-4">
                    <FormField label="Job Titles Seeking">
                      <input
                        type="text"
                        value={jobTitlesSeeking}
                        onChange={(e) => setJobTitlesSeeking(e.target.value)}
                        placeholder="Frontend Engineer, React Developer"
                        className={inputClass}
                      />
                    </FormField>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Remote Preference">
                        <SelectWrapper>
                          <select
                            value={remotePref}
                            onChange={(e) => setRemotePref(e.target.value)}
                            className={selectClass}
                          >
                            <option>Any</option>
                            <option>Remote Only</option>
                            <option>Hybrid</option>
                            <option>On-site Only</option>
                          </select>
                        </SelectWrapper>
                      </FormField>
                      <FormField label="Salary Expectation (Optional)">
                        <input
                          type="text"
                          value={salaryExpectation}
                          onChange={(e) => setSalaryExpectation(e.target.value)}
                          placeholder="E.g. $120k+"
                          className={inputClass}
                        />
                      </FormField>
                    </div>

                    <FormField label="Preferred Locations (Optional)">
                      <input
                        type="text"
                        value={preferredLocations}
                        onChange={(e) => setPreferredLocations(e.target.value)}
                        placeholder="E.g. New York, London"
                        className={inputClass}
                      />
                    </FormField>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* ── Connected Accounts ──────────────────────────────────────── */}
            <SectionCard
              title="Connected Accounts"
              subtitle="Connect your LinkedIn to let the agent handle manual apply with LinkedIn workflows."
            >
              <div className="flex items-center justify-between gap-4 border border-border rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-linkedin-light flex items-center justify-center shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="var(--color-linkedin)"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">LinkedIn</p>
                    <p className="text-xs text-text-muted">Not connected</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-linkedin text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity shrink-0"
                >
                  Connect LinkedIn
                </button>
              </div>
            </SectionCard>

            {/* ── Save Button ─────────────────────────────────────────────── */}
            <button
              type="button"
              className="w-full py-3 bg-accent text-accent-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Save Profile
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
