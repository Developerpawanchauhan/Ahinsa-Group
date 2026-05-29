import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, subtitle, center = false, light = false }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2
          className={`heading-serif text-4xl md:text-5xl lg:text-6xl mt-5 ${
            light ? 'text-cream' : 'text-cream'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="text-ink-300 mt-5 text-base md:text-lg leading-relaxed">{subtitle}</p>
        </Reveal>
      )}
      {center && <div className="gold-divider" />}
    </div>
  )
}
