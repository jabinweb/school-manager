"use client"

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PageHero } from '@/components/ui/page-hero'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion'
import { 
  Clock, 
  ArrowRight, 
  MapPin,
  Newspaper,
} from 'lucide-react'
import Image from 'next/image'

export default function NewsPage() {
  const newsArticles = [
    {
      title: "Science Fair Winners Announced",
      excerpt: "Congratulations to our students who excelled in the annual science fair with innovative projects in renewable energy and biotechnology.",
      date: "2024-01-15",
      category: "Academic Achievement",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80",
      featured: true
    },
    {
      title: "New STEM Lab Opening Ceremony",
      excerpt: "State-of-the-art STEM laboratory opens next month, featuring cutting-edge equipment and technology for hands-on learning.",
      date: "2024-01-10",
      category: "Facilities",
      image: "https://images.unsplash.com/photo-1581726690015-c9861251f35f?w=600&auto=format&fit=crop&q=80"
    },
    {
      title: "Basketball Team Wins Regional Championship",
      excerpt: "Our varsity basketball team brings home the regional championship trophy after an outstanding season of teamwork and dedication.",
      date: "2024-01-08",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80"
    },
    {
      title: "Student Art Exhibition Opens",
      excerpt: "Annual student art exhibition showcases creativity and talent of our young artists across various mediums and styles.",
      date: "2024-01-05",
      category: "Arts & Culture",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80"
    }
  ]

  const upcomingEvents = [
    {
      title: "Open House & Campus Tour",
      date: "2024-02-15",
      time: "10:00 AM - 2:00 PM",
      location: "Main Campus",
      description: "Join us for a comprehensive tour and meet our faculty."
    },
    {
      title: "Parent-Teacher Conference",
      date: "2024-02-20",
      time: "3:00 PM - 7:00 PM",
      location: "All Classrooms",
      description: "Discuss your child's progress with their teachers."
    },
    {
      title: "Annual Arts Festival",
      date: "2024-03-01",
      time: "6:00 PM - 9:00 PM",
      location: "Auditorium",
      description: "Celebrate creativity with student performances and exhibitions."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="News & Events"
        description="Stay updated with the latest happenings, achievements, and upcoming events at Greenwood High School."
        badge={{
          icon: Newspaper,
          text: "Latest Updates"
        }}
        gradient="orange"
      />

      {/* Featured News */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-slate-900 dark:text-white text-center">
              Featured News
            </h2>
            
            {/* Featured Article */}
            <Card className="overflow-hidden mb-12 shadow-xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={newsArticles[0].image}
                    alt={newsArticles[0].title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-white">
                    {newsArticles[0].category}
                  </Badge>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    {new Date(newsArticles[0].date).toLocaleDateString()}
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                    {newsArticles[0].title}
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                    {newsArticles[0].excerpt}
                  </p>
                  <Button variant="outline">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Other News */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {newsArticles.slice(1).map((article, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-accent text-white text-xs">
                      {article.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                      {article.excerpt}
                    </p>
                    <Button variant="ghost" size="sm">
                      Read More
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Upcoming Events
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Mark your calendars for these important school events
            </p>
          </motion.div>

          <motion.div 
            className="space-y-6 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {upcomingEvents.map((event, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="md:w-1/4">
                      <div className="text-2xl font-bold text-primary">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">
                        {event.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-3">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
