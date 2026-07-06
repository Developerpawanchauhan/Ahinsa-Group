import { useState } from 'react'
import { Download } from 'lucide-react'
import PageHero from '../components/PageHero'
import BrochureGallery from '../components/BrochureGallery'
import BrochureDownloadModal from '../components/BrochureDownloadModal'

export default function Brochure() {
  const [downloadOpen, setDownloadOpen] = useState(false)

  return (
    <>
      <PageHero
        title="Project Brochures"
        subtitle="Explore the complete visual journey of every Ahinsa project — layouts, amenities and master plans."
        breadcrumb="Gallery / Brochures"
        image="/images/home/hero/silde-1.jpg"
      />

      <BrochureGallery />

      {/* Download CTA — below the brochure gallery */}
      <section className="bg-page-alt pb-16 -mt-10 md:-mt-14">
        <div className="container-x flex justify-center">
          <button onClick={() => setDownloadOpen(true)} className="btn-gold">
            <Download className="w-4 h-4" /> Download Brochure
          </button>
        </div>
      </section>

      <BrochureDownloadModal
        open={downloadOpen}
        onClose={() => setDownloadOpen(false)}
      />
    </>
  )
}
