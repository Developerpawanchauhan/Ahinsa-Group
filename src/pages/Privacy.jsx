import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { COMPANY } from '../data/site'

const LAST_UPDATED = 'May 30, 2026'

const SECTIONS = [
  {
    title: '1. Introduction',
    paragraphs: [
      `Ahinsa Group ("we", "us", "our") respects your privacy. This Privacy Policy explains how we collect, use, share and protect your personal information when you visit our website, contact us, schedule a site visit, register interest in any of our projects or otherwise interact with us.`,
      `By using this website you agree to the practices described in this policy. If you do not agree, please do not use the website or share your information with us.`,
    ],
  },
  {
    title: '2. Information We Collect',
    paragraphs: [`We may collect the following categories of information:`],
    list: [
      `Personal details you submit through enquiry forms — including name, email, phone number, project of interest and any message content you provide.`,
      `Communication records — emails, calls, WhatsApp messages and other correspondence between you and our teams.`,
      `Visit information — including site-visit dates, locations visited and feedback shared.`,
      `Technical information — IP address, browser type, device type, pages visited and similar analytics data collected through cookies and similar technologies.`,
    ],
  },
  {
    title: '3. How We Use Your Information',
    paragraphs: [`We use your information to:`],
    list: [
      `Respond to your enquiries and schedule site visits or callbacks.`,
      `Share information about projects, pricing, availability, brochures and floor plans you have requested.`,
      `Process bookings, allotments and post-booking customer service.`,
      `Send relevant updates, launch announcements and marketing communications, where you have agreed to receive them.`,
      `Comply with applicable legal, regulatory and RERA-related obligations.`,
      `Improve our website, services and customer experience.`,
    ],
  },
  {
    title: '4. Sharing of Information',
    paragraphs: [`We do not sell your personal information. We may share it only with:`],
    list: [
      `Authorized internal teams who need it to serve you.`,
      `Channel partners or sales associates working with us on the specific project you have enquired about.`,
      `Service providers (such as CRM, communication, analytics or hosting providers) who help us operate the website and our customer-experience tools, and who are bound by confidentiality obligations.`,
      `Government, regulatory or judicial authorities, where disclosure is required by law.`,
    ],
  },
  {
    title: '5. Cookies & Analytics',
    paragraphs: [
      `Our website may use cookies and similar technologies to remember preferences, understand how visitors use the site and improve performance. You can control cookies through your browser settings. Disabling cookies may affect some site features.`,
    ],
  },
  {
    title: '6. Data Security',
    paragraphs: [
      `We follow reasonable technical and organisational measures to protect your information against unauthorised access, loss or misuse. However, no method of transmission over the Internet is fully secure, and we cannot guarantee absolute security.`,
    ],
  },
  {
    title: '7. Data Retention',
    paragraphs: [
      `We retain your information for as long as needed to fulfil the purposes described in this policy, comply with our legal obligations and resolve disputes. When information is no longer required, we delete or anonymise it.`,
    ],
  },
  {
    title: '8. Your Choices & Rights',
    paragraphs: [`Subject to applicable law, you may:`],
    list: [
      `Request access to the personal information we hold about you.`,
      `Request correction of inaccurate or incomplete information.`,
      `Request deletion of your information, subject to our legal and contractual obligations.`,
      `Opt out of marketing communications at any time using the unsubscribe link in our emails or by writing to us.`,
    ],
    paragraphsAfter: [`To exercise any of these rights, please contact us using the details at the end of this page.`],
  },
  {
    title: '9. Third-Party Links',
    paragraphs: [
      `Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to read their privacy policies before sharing any information with them.`,
    ],
  },
  {
    title: "10. Children's Privacy",
    paragraphs: [
      `Our services are intended for adults. We do not knowingly collect personal information from children under 18. If you believe we have collected such information, please contact us and we will take appropriate action.`,
    ],
  },
  {
    title: '11. Changes to This Policy',
    paragraphs: [
      `We may update this Privacy Policy from time to time. The updated version will be posted on this page with a new "Last Updated" date. We encourage you to review the policy periodically.`,
    ],
  },
  {
    title: '12. Contact Us',
    paragraphs: [`If you have any questions about this Privacy Policy or how we handle your information, please contact us at:`],
    contact: true,
  },
]

export default function Privacy() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="How Ahinsa Group collects, uses and protects your information."
        breadcrumb="Privacy Policy"
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=85&auto=format&fit=crop"
      />

      <section className="section-pad bg-page">
        <div className="container-x max-w-4xl">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-soft">
              <div>
                <p className="eyebrow">Legal</p>
                <h2 className="heading-serif text-fg text-3xl md:text-4xl mt-3">Privacy Policy</h2>
              </div>
              <div className="text-fg-soft text-xs uppercase tracking-[0.2em]">
                Last Updated: <span className="text-gold-700 dark:text-gold-500">{LAST_UPDATED}</span>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 space-y-12">
            {SECTIONS.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 0.05}>
                <article>
                  <h3 className="font-serif text-fg text-xl md:text-2xl">{s.title}</h3>
                  <div className="gold-divider mx-0 my-4" />
                  {s.paragraphs?.map((p, j) => (
                    <p key={j} className="text-fg-muted leading-relaxed mt-3 text-sm md:text-base">{p}</p>
                  ))}
                  {s.list && (
                    <ul className="mt-4 space-y-2">
                      {s.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-fg-muted text-sm md:text-base">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.paragraphsAfter?.map((p, j) => (
                    <p key={j} className="text-fg-muted leading-relaxed mt-4 text-sm md:text-base">{p}</p>
                  ))}
                  {s.contact && (
                    <div className="mt-5 card-glass p-5 text-sm">
                      <div className="text-fg font-medium">{COMPANY.name} &mdash; {COMPANY.city}</div>
                      <div className="text-fg-soft mt-2 space-y-1">
                        <div>{COMPANY.address}</div>
                        <div>Email: <a href={`mailto:${COMPANY.email}`} className="text-gold-700 dark:text-gold-500 hover:underline">{COMPANY.email}</a></div>
                        <div>Phone: <a href={`tel:${COMPANY.phone}`} className="text-gold-700 dark:text-gold-500 hover:underline">{COMPANY.phone}</a></div>
                      </div>
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 p-6 border border-soft bg-page-soft">
              <p className="text-fg-soft text-xs italic leading-relaxed">
                <strong className="text-fg">Disclaimer:</strong> This Privacy Policy is provided for general
                information purposes and should be reviewed by qualified legal counsel before being relied upon as a
                final, binding statement of practice. Specific obligations may vary depending on the laws applicable
                to you and your interactions with Ahinsa Group.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
