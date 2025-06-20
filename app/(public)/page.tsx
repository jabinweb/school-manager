import { HeroSection } from '@/components/landing/hero-section'
import { AboutSection } from '@/components/landing/about-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { GallerySection } from '@/components/landing/gallery-section'
import { NewsEventsSection } from '@/components/landing/news-events-section'

export default function SchoolHomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <GallerySection />
      <TestimonialsSection />
      <NewsEventsSection />
    </div>
  )
}
