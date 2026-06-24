/**
 * Ahinsa Group Logo
 *
 * Uses /public/logo.png — replace that file with your final logo asset.
 * For best results, use a transparent-background PNG so it looks clean
 * on both light and dark themes.
 */
export default function Logo({ className = '', size = 'md' }) {
  const sizes = {
    sm: 'h-28',   // ~48px — used on scrolled navbar
    md: 'h-28',  // ~48px — default navbar
    lg: 'h-28',  // ~64px — footer / large displays
    xl: 'h-24',  // ~96px — hero / about page accents
  }
  const heightClass = sizes[size] || sizes.md

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/logo.png"
        alt="Ahinsa Group Agra"
        className={`${heightClass} w-auto object-contain select-none`}
        draggable="false"
      />
    </div>
  )
}
