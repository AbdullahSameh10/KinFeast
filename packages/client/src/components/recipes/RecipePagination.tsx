import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

interface RecipePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
}

function RecipePagination({
  currentPage,
  totalPages,
  onPageChange,
  previousLabel = "Previous page",
  nextLabel = "Next page",
}: RecipePaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages: Array<number | "ellipsis"> = [];

  if (totalPages <= 5) {
    for (let page = 1; page <= totalPages; page += 1) {
      pages.push(page);
    }
  } else {
    // 3-page window, clamped to the edges
    let windowStart: number;
    let windowEnd: number;

    if (currentPage <= 2) {
      windowStart = 1;
      windowEnd = 3;
    } else if (currentPage >= totalPages - 1) {
      windowStart = totalPages - 2;
      windowEnd = totalPages;
    } else {
      windowStart = currentPage - 1;
      windowEnd = currentPage + 1;
    }

    // Always include first + last page, plus the window
    const visible = new Set<number>([1, totalPages]);
    for (let page = windowStart; page <= windowEnd; page += 1) {
      visible.add(page);
    }

    const sorted = Array.from(visible).sort((a, b) => a - b);

    // Insert an ellipsis wherever there is a gap
    sorted.forEach((page, i) => {
      if (i > 0 && page - sorted[i - 1] > 1) {
        pages.push("ellipsis");
      }
      pages.push(page);
    });
  }

  const renderPage = (
    page: number | "ellipsis",
    index: number,
    mobile = false,
  ) => {
    if (page === "ellipsis") {
      return (
        <span
          key={`${mobile ? "mobile" : "desktop"}-ellipsis-${index}`}
          className={
            mobile
              ? "flex h-9 w-6 shrink-0 items-center justify-center text-stone-400 dark:text-stone-600"
              : "flex h-10 w-10 shrink-0 items-center justify-center text-stone-400 dark:text-stone-600"
          }
          aria-hidden="true"
        >
          <MoreHorizontal size={mobile ? 16 : 18} />
        </span>
      );
    }

    const isCurrent = page === currentPage;

    return (
      <button
        key={`${mobile ? "mobile" : "desktop"}-${page}`}
        type="button"
        onClick={() => onPageChange(page)}
        aria-current={isCurrent ? "page" : undefined}
        className={
          mobile
            ? `inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg px-2 text-xs font-semibold transition ${
                isCurrent
                  ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20"
                  : "border border-stone-200 bg-white text-stone-700 hover:border-orange-300 hover:text-orange-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-800 dark:hover:text-orange-400"
              }`
            : `inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-xl px-3 text-sm font-semibold transition ${
                isCurrent
                  ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20"
                  : "border border-stone-200 bg-white text-stone-700 hover:border-orange-300 hover:text-orange-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-800 dark:hover:text-orange-400"
              }`
        }
      >
        {page}
      </button>
    );
  };

  return (
    <nav
      aria-label="Recipe pagination"
      className="mt-10 w-full"
    >
      {/* Desktop pagination */}
      <div className="hidden items-center justify-center gap-2 md:flex">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label={previousLabel}
          className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white px-3 text-sm font-semibold text-stone-700 transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-800 dark:hover:text-orange-400"
        >
          <ChevronLeft
            size={17}
            className="rtl:rotate-180"
          />
        </button>

        {pages.map((page, index) =>
          renderPage(page, index),
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label={nextLabel}
          className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white px-3 text-sm font-semibold text-stone-700 transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-800 dark:hover:text-orange-400"
        >
          <ChevronRight
            size={17}
            className="rtl:rotate-180"
          />
        </button>
      </div>

      {/* Mobile pagination */}
      <div className="flex w-full items-center justify-center gap-1 overflow-hidden md:hidden">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label={previousLabel}
          className="inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-white px-2 text-xs font-semibold text-stone-700 transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-800 dark:hover:text-orange-400"
        >
          <ChevronLeft
            size={15}
            className="rtl:rotate-180"
          />
        </button>

        {pages.map((page, index) =>
          renderPage(page, index, true),
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label={nextLabel}
          className="inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-white px-2 text-xs font-semibold text-stone-700 transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-800 dark:hover:text-orange-400"
        >
          <ChevronRight
            size={15}
            className="rtl:rotate-180"
          />
        </button>
      </div>
    </nav>
  );
}

export default RecipePagination;