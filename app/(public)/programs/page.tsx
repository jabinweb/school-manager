"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PageHero } from '@/components/ui/page-hero'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion'
import { 
  BookOpen, 
  Calculator, 
  Globe, 
  Palette, 
  Trophy,
  Code,
  Heart,
  Users,
  ArrowRight,
  Clock
} from 'lucide-react'
import Image from 'next/image'

export default function ProgramsPage() {
  const academicPrograms = [
    {
      title: "Mathematics & Sciences",
      description: "Advanced STEM curriculum with hands-on laboratory experiences",
      icon: Calculator,
      subjects: ["Advanced Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"],
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80",
      color: "text-blue-600"
    },
    {
      title: "Language Arts & Literature",
      description: "Comprehensive language development and literary analysis",
      icon: BookOpen,
      subjects: ["English Literature", "Creative Writing", "Public Speaking", "Journalism", "Foreign Languages"],
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&auto=format&fit=crop&q=80",
      color: "text-green-600"
    },
    {
      title: "Social Sciences",
      description: "Understanding society, culture, and global perspectives",
      icon: Globe,
      subjects: ["World History", "Geography", "Economics", "Political Science", "Psychology"],
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80",
      color: "text-purple-600"
    },
    {
      title: "Arts & Creative Expression",
      description: "Fostering creativity through various artistic mediums",
      icon: Palette,
      subjects: ["Visual Arts", "Digital Design", "Drama", "Music Theory", "Creative Writing"],
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80",
      color: "text-pink-600"
    }
  ]

  const specialPrograms = [
    {
      title: "Advanced Placement (AP)",
      description: "College-level courses for high-achieving students",
      icon: Trophy,
      features: ["15+ AP Courses", "College Credit", "Expert Faculty", "High Success Rate"],
      badge: "Grades 9-12"
    },
    {
      title: "STEM Innovation Lab",
      description: "Hands-on technology and engineering experiences",
      icon: Code,
      features: ["Robotics", "3D Printing", "Programming", "Design Thinking"],
      badge: "All Grades"
    },
    {
      title: "Leadership Development",
      description: "Building tomorrow's leaders through practical experience",
      icon: Users,
      features: ["Student Government", "Peer Mentoring", "Community Service", "Public Speaking"],
      badge: "Grades 6-12"
    },
    {
      title: "Wellness & Life Skills",
      description: "Comprehensive health and personal development program",
      icon: Heart,
      features: ["Mental Health", "Nutrition", "Financial Literacy", "Time Management"],
      badge: "All Grades"
    }
  ]

  const extracurriculars = [
    {
      category: "Academic Clubs",
      activities: ["Math Olympiad", "Science Fair", "Debate Team", "Model UN", "Academic Decathlon"]
    },
    {
      category: "Sports Teams",
      activities: ["Basketball", "Soccer", "Tennis", "Swimming", "Track & Field"]
    },
    {
      category: "Arts Programs", 
      activities: ["School Band", "Drama Club", "Art Society", "Photography Club", "Creative Writing"]
    },
    {
      category: "Community Service",
      activities: ["Environmental Club", "Volunteer Corps", "Tutoring Program", "Food Drive", "Senior Center Visits"]
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Our Academic Programs"
        description="Comprehensive educational programs designed to challenge, inspire, and prepare students for success in higher education and beyond."
        badge={{
          icon: BookOpen,
          text: "Academic Excellence"
        }}
        gradient="purple"
      />

      {/* Academic Programs */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Core Academic Departments
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Our rigorous curriculum spans all essential academic disciplines
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {academicPrograms.map((program, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm mb-2`}>
                        <program.icon className={`h-6 w-6 text-white`} />
                      </div>
                      <h3 className="text-xl font-bold text-white">{program.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {program.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">Key Subjects:</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.subjects.map((subject, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Special Programs */}
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
              Specialized Programs
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Unique opportunities for advanced learning and personal development
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {specialPrograms.map((program, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <program.icon className="h-8 w-8 text-primary" />
                    </div>
                    <Badge className="mb-2 bg-accent text-white">{program.badge}</Badge>
                    <CardTitle className="text-lg">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {program.description}
                    </p>
                    <ul className="space-y-1 text-sm text-slate-500 dark:text-slate-400">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Extracurricular Activities */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Extracurricular Activities
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Beyond academics - opportunities for personal growth and discovery
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {extracurriculars.map((category, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                          <ArrowRight className="h-3 w-3 mr-2 text-accent" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Daily Schedule Preview */}
      <section className="py-24 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                A Day in the Life
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                Our structured yet flexible daily schedule balances academic rigor with 
                creative expression and physical activity.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                View Full Schedule
                <Clock className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                  Sample High School Schedule
                </h3>
                <div className="space-y-3">
                  {[
                    { time: "8:00 - 8:45 AM", subject: "First Period - Mathematics" },
                    { time: "8:50 - 9:35 AM", subject: "Second Period - English Literature" },
                    { time: "9:40 - 10:25 AM", subject: "Third Period - Science" },
                    { time: "10:25 - 10:40 AM", subject: "Morning Break" },
                    { time: "10:40 - 11:25 AM", subject: "Fourth Period - History" },
                    { time: "11:30 - 12:15 PM", subject: "Fifth Period - Elective" },
                    { time: "12:15 - 1:00 PM", subject: "Lunch & Recreation" },
                    { time: "1:00 - 2:30 PM", subject: "Study Hall / Lab Time" },
                    { time: "2:30 - 4:00 PM", subject: "Extracurricular Activities" },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                      <span className="font-medium text-slate-900 dark:text-white">{item.time}</span>
                      <span className="text-slate-600 dark:text-slate-300">{item.subject}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
                  
