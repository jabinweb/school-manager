"use client"

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion'
import { Quote, Star } from 'lucide-react'
import Image from 'next/image'

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1ba?w=200&auto=format&fit=crop&q=80",
      content: "Greenwood High has exceeded our expectations. The teachers are dedicated, and my daughter has thrived in this nurturing environment.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Alumni, Class of 2020",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      content: "The education I received here prepared me perfectly for university. The skills I learned are invaluable in my engineering studies.",
      rating: 5
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Parent & Local Physician",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80",
      content: "As a healthcare professional, I value the school's emphasis on both academic excellence and character development.",
      rating: 5
    },
    {
      name: "James Wilson",
      role: "Student, Grade 11",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
      content: "I love the variety of programs offered here. From robotics to drama club, there's something for everyone to explore their passions.",
      rating: 5
    }
  ]

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Quote className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">What Our Community Says</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Trusted by <span className="text-primary">Families</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Hear from our students, parents, and alumni about their experience at Greenwood High School.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={staggerItem}>
              <Card className="h-full bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <p className="text-slate-600 dark:text-slate-300 mb-6 italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
