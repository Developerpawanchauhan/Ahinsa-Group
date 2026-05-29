export default function Logo({ className = '', showTag = true, size = 'md' }) {
  const sizes = {
    sm: { wrap: 'h-9', mark: 'h-9 w-9', text: 'text-base', tag: 'text-[8px]' },
    md: { wrap: 'h-12', mark: 'h-12 w-12', text: 'text-xl', tag: 'text-[9px]' },
    lg: { wrap: 'h-16', mark: 'h-16 w-16', text: 'text-3xl', tag: 'text-[10px]' },
  }
  const s = sizes[size] || sizes.md

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 100 100" className={s.mark} aria-hidden="true">
        <defs>
          <linearGradient id={`lg-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D77A" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#876818" />
          </linearGradient>
        </defs>
        {/* Center flame */}
        <path
          d="M 50 12 C 44 30 36 40 34 55 C 34 70 42 78 50 78 C 58 78 66 70 66 55 C 64 40 56 30 50 12 Z"
          fill={`url(#lg-${size})`}
        />
        {/* Side flames */}
        <path
          d="M 22 30 C 18 48 22 62 30 70 C 34 72 40 70 40 66 C 34 56 32 44 32 36 C 28 32 24 30 22 30 Z"
          fill={`url(#lg-${size})`}
          opacity="0.9"
        />
        <path
          d="M 78 30 C 82 48 78 62 70 70 C 66 72 60 70 60 66 C 66 56 68 44 68 36 C 72 32 76 30 78 30 Z"
          fill={`url(#lg-${size})`}
          opacity="0.9"
        />
        {/* Outer flames */}
        <path
          d="M 8 50 C 6 64 12 74 20 78 C 22 76 24 72 22 68 C 16 60 14 50 14 42 C 12 44 10 48 8 50 Z"
          fill={`url(#lg-${size})`}
          opacity="0.7"
        />
        <path
          d="M 92 50 C 94 64 88 74 80 78 C 78 76 76 72 78 68 C 84 60 86 50 86 42 C 88 44 90 48 92 50 Z"
          fill={`url(#lg-${size})`}
          opacity="0.7"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`font-serif font-bold tracking-wider gold-text ${s.text}`}>
          AHINSA
        </span>
        {showTag && (
          <span className={`text-gold-500/80 tracking-[0.3em] mt-1 ${s.tag}`}>
            GROUP &middot; AGRA
          </span>
        )}
      </div>
    </div>
  )
}
