import PageHero from '../components/PageHero'
import BrochureGallery from '../components/BrochureGallery'

export default function Brochure() {
  return (
    <>
      <PageHero
        title="Project Brochures"
        subtitle="Explore the complete visual journey of every Ahinsa project — layouts, amenities and master plans."
        breadcrumb="Gallery / Brochures"
        image="/images/home/hero/silde-1.jpg"
      />
      <BrochureGallery />
    </>
  )
}
