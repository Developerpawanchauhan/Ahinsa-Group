import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { COMPANY } from '../data/site'

const LAST_UPDATED = 'May 30, 2026'

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    paragraphs: [
      `These Terms & Conditions ("Terms") govern your access to and use of the Ahinsa Group website (the "Website"). By using the Website, you agree to be bound by these Terms. If you do not agree, please do not use the Website.`,
    ],
  },
  {
    title: '2. Use of the Website',
    paragraphs: [`You agree to use the Website only for lawful purposes. You agree not to:`],
    list: [
      `Use the Website in any way that breaches any applicable law or regulation.`,
      `Attempt to gain unauthorized access to any part of the Website, related systems, networks or data.`,
      `Introduce viruses, malware or any other harmful code to the Website.`,
      `Scrape, copy or reproduce any content from the Website without our prior written permission.`,
      `Use the Website to send spam, unsolicited communications or impersonate any person or entity.`,
    ],
  },
  {
    title: '3. Information & Visuals',
    paragraphs: [
      `All information, images, plans, layouts, renders, walkthroughs, brochures and other content displayed on the Website are for general information and indicative purposes only.`,
      `Specifications, configurations, amenities, materials, finishes, dimensions and prices are subject to change without prior notice. The actual project, unit or service delivered may differ from what is shown on the Website.`,
      `Nothing on this Website constitutes an offer or contract. Any allotment, sale, lease or service shall be governed solely by the relevant agreement signed between the parties and the disclosures filed with the relevant Real Estate Regulatory Authority (RERA) for the applicable project.`,
    ],
  },
  {
    title: '4. RERA & Project Disclosures',
    paragraphs: [
      `Each of our projects is registered (or being registered) under the applicable RERA framework, and details are disclosed on the relevant RERA portal. Where a RERA registration number is provided on a project page, it should be relied upon for official project-level information. We encourage you to verify project details directly on the official RERA portal of the relevant State.`,
    ],
  },
  {
    title: '5. Intellectual Property',
    paragraphs: [
      `The Website, its design, layout, content, logos, graphics, images and trademarks are the property of Ahinsa Group or its licensors and are protected by applicable intellectual-property laws.`,
      `You may not copy, reproduce, modify, distribute, publish, transmit, display or otherwise commercially exploit any content from the Website without our prior written permission.`,
    ],
  },
  {
    title: '6. Enquiries & Personal Information',
    paragraphs: [
      `When you submit an enquiry, schedule a site visit or otherwise share information with us, you agree to do so accurately and in good faith. The handling of your personal information is governed by our Privacy Policy, which forms an integral part of these Terms.`,
    ],
  },
  {
    title: '7. Third-Party Links',
    paragraphs: [
      `The Website may contain links to third-party websites. We do not endorse and are not responsible for the content, accuracy, products or services of those websites. Accessing them is at your own risk.`,
    ],
  },
  {
    title: '8. Limitation of Liability',
    paragraphs: [
      `To the maximum extent permitted by law, Ahinsa Group, its directors, employees, partners and affiliates shall not be liable for any direct, indirect, incidental, consequential or punitive damages arising out of your access to or use of the Website, including any reliance placed on the information displayed on it.`,
      `The Website is provided on an "as is" and "as available" basis, without any warranty of any kind, express or implied.`,
    ],
  },
  {
    title: '9. Indemnity',
    paragraphs: [
      `You agree to indemnify and hold Ahinsa Group, its directors, employees and partners harmless against any claim, demand, loss, liability, damage or cost arising out of your breach of these Terms or your misuse of the Website.`,
    ],
  },
  {
    title: '10. Modifications',
    paragraphs: [
      `We may modify these Terms at any time by posting the updated version on this page. Your continued use of the Website after such changes constitutes acceptance of the modified Terms.`,
    ],
  },
  {
    title: '11. Governing Law & Jurisdiction',
    paragraphs: [
      `These Terms are governed by the laws of India. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts at Agra, Uttar Pradesh.`,
    ],
  },
  {
    title: '12. Contact Us',
    paragraphs: [`For any questions or concerns about these Terms, please contact us at:`],
    contact: true,
  },
]

export default function Terms() {
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        subtitle="The terms governing your use of the Ahinsa Group website."
        breadcrumb="Terms & Conditions"
        image="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=85&auto=format&fit=crop"
      />

      <section className="section-pad bg-page">
        <div className="container-x max-w-4xl">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-soft">
              <div>
                <p className="eyebrow">Legal</p>
                <h2 className="heading-serif text-fg text-3xl md:text-4xl mt-3">Terms & Conditions</h2>
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
                <strong className="text-fg">Disclaimer:</strong> These Terms & Conditions are provided for general
                information and should be reviewed by qualified legal counsel before being relied upon as final,
                binding terms. Specific obligations may vary depending on the laws applicable to your interactions
                with Ahinsa Group.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
