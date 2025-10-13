import { useEffect, useRef, useState, type ReactNode } from "react";

interface ReadMoreProps {
  children: ReactNode;
  question: string;
  slug: string;
}

export default function ReadMore({ children, question, slug }: ReadMoreProps) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === `#${slug}`) {
      setExpanded(true);
      // Let the browser handle the natural anchor scroll
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
      }, 10);
    }
  }, [slug]);

  const handleClick = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);

    if (newExpanded) {
      // set hash to this question’s slug
      window.history.replaceState(null, "", `#${slug}`);

      // scroll smoothly like a heading
      ref.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      // remove hash when collapsing
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <div ref={ref} className="scroll-m-40">
      <button
        className="text-left hover:bg-neutral-800 p-3 rounded-md w-full cursor-pointer grid grid-cols-[1fr_auto] gap-2"
        onClick={handleClick}
      >
        <h4 className="text-foreground text-pretty">{question}</h4>

        <div className="h-[1lh] grid place-items-center">
          <svg
            data-open={expanded}
            className="data-[open=true]:rotate-180 size-4"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </button>
      {expanded && (
        <div className="mt-2 space-y-2 *:*:pb-2 px-3">{children}</div>
      )}
    </div>
  );
}
