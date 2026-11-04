"use client";

import { clsx } from "clsx";

interface CaseStudyFiltersProps {
  categories: string[];
  tags: string[];
  selectedCategories: string[];
  selectedTags: string[];
  resultCount: number;
  onToggleCategory: (category: string) => void;
  onToggleTag: (tag: string) => void;
  onClear: () => void;
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={clsx(
        "rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors sm:px-4 sm:text-xs",
        active
          ? "green-pill border-transparent font-bold"
          : "border-surface bg-surface-strong text-muted hover:border-accent-green hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

export default function CaseStudyFilters({
  categories,
  tags,
  selectedCategories,
  selectedTags,
  resultCount,
  onToggleCategory,
  onToggleTag,
  onClear,
}: CaseStudyFiltersProps) {
  const hasFilters = selectedCategories.length > 0 || selectedTags.length > 0;

  return (
    <section
      aria-label="Filter case studies"
      className="relative z-10 w-full border-b border-surface bg-section-alt px-3 py-8 sm:px-4 sm:py-10 md:px-12"
    >
      <div className="mx-auto w-full max-w-7xl space-y-5">
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accent-green sm:text-xs">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <FilterPill
                key={category}
                label={category}
                active={selectedCategories.includes(category)}
                onClick={() => onToggleCategory(category)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accent-green sm:text-xs">
            {selectedCategories.length ? "Tags in selected categories" : "Tags"}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <FilterPill
                key={tag}
                label={tag}
                active={selectedTags.includes(tag)}
                onClick={() => onToggleTag(tag)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-muted sm:text-xs">
          <span aria-live="polite">
            {resultCount} case {resultCount === 1 ? "study" : "studies"}
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={onClear}
              className="underline underline-offset-4 hover:text-foreground"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
