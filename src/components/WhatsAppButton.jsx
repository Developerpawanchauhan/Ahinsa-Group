// Floating WhatsApp chat-support button — sticky at the bottom-right on
// every page. Tapping it opens a WhatsApp chat with the support number.

const WHATSAPP_NUMBER = '916398730582' // +91 98081 88568 (intl format, no +/spaces)
const WHATSAPP_MESSAGE = 'Hello Ahinsa Group, I would like to know more about your projects.'

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center justify-center"
    >
      {/* Pulsing ring */}
      <span className="absolute inline-flex h-14 w-14 rounded-full bg-[#25D366] opacity-60 animate-ping" />

      {/* Button */}
      <span
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]
                   text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/20
                   transition-transform duration-300 group-hover:scale-110"
      >
        <svg
          viewBox="0 0 32 32"
          className="h-8 w-8 fill-current"
          aria-hidden="true"
        >
          <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.46 1.73 6.4L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.23 1.6h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05a12.7 12.7 0 0 0-9.06-3.63zm0 23.36h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4 1.05 1.07-3.9-.25-.4a10.56 10.56 0 0 1-1.62-5.6c0-5.86 4.77-10.63 10.64-10.63 2.84 0 5.51 1.11 7.52 3.12a10.56 10.56 0 0 1 3.11 7.52c0 5.87-4.77 10.64-10.63 10.64zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.99-2.37-.26-.62-.52-.54-.72-.55-.19-.01-.4-.01-.61-.01-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66 0 1.57 1.14 3.08 1.3 3.29.16.21 2.25 3.44 5.46 4.82.76.33 1.36.53 1.82.68.77.24 1.47.21 2.02.13.62-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37z" />
        </svg>
      </span>

      {/* Tooltip label (desktop) */}
      <span
        className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-md bg-ink-900/95
                   px-3 py-2 text-xs font-medium text-cream opacity-0 shadow-lg ring-1 ring-white/10
                   transition-opacity duration-300 group-hover:opacity-100 md:block"
      >
        Chat with us
      </span>
    </a>
  )
}
