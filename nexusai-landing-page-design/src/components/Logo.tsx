export function Logo({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect x="1" y="1" width="30" height="30" rx="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M11 22V10M11 16H17M17 22V10M21 10V22M21 10L25 10M21 16H25"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight">NexusAI</span>
    </div>
  );
}
