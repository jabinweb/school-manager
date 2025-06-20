"use client"

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion'
import { Calendar, Clock, ArrowRight, MapPin } from 'lucide-react'
import Link from 'next/link'

export function NewsEventsSection() {
  const news = [
    {
      title: "Science Fair Winners Announced",
      excerpt: "Congratulations to our students who excelled in the annual science fair with innovative projects.",
      date: "2024-01-15",
      category: "Academic"
    },
    {
      title: "New STEM Lab Opening",
      excerpt: "State-of-the-art STEM laboratory opens next month, featuring cutting-edge equipment and technology.",
      date: "2024-01-10", 
      category: "Facilities"
    },
    {
      title: "Basketball Team Wins Regional Championship",
      excerpt: "Our varsity basketball team brings home the regional championship trophy after an outstanding season.",
      date: "2024-01-08",
      category: "Sports"
    }
  ]

  const events = [
    {
      title: "Open House & Campus Tour",
      date: "2024-02-15",
      time: "10:00 AM - 2:00 PM",
      location: "Main Campus",
      description: "Join us for a comprehensive tour and meet our faculty.",
      type: "Admission"
    },
    {
      title: "Parent-Teacher Conference",
      date: "2024-02-20",
      time: "3:00 PM - 7:00 PM", 
      location: "All Classrooms",
      description: "Discuss your child's progress with their teachers.",
      type: "Academic"
    },
    {
      title: "Annual Arts Festival",
      date: "2024-03-01",
      time: "6:00 PM - 9:00 PM",
      location: "Auditorium",
      description: "Celebrate creativity with student performances and exhibitions.",
      type: "Cultural"
    }
  ]

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Calendar className="h-4 w-4 text-accent mr-2" />
            <span className="text-sm font-medium text-accent">Stay Connected</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Latest <span className="text-accent">News & Events</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Stay updated with the latest happenings at Greenwood High School.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* News Section */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <div className="w-4 h-4 bg-primary rounded-full mr-3"></div>
              Latest News
            </h3>
            <motion.div 
              className="space-y-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {news.map((item, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-slate-50 dark:bg-slate-800">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        {item.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/news">
                View All News <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Events Section */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <div className="w-4 h-4 bg-accent rounded-full mr-3"></div>
              Upcoming Events
            </h3>
            <motion.div 
              className="space-y-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {events.map((event, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-slate-50 dark:bg-slate-800">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="outline" className="text-xs border-accent text-accent">
                          {event.type}
                        </Badge>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.time}
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
                        {event.description}
                      </p>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/events">
                View All Events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
