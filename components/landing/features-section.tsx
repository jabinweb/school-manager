"use client"

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion'
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Trophy, 
  Laptop, 
  Music, 
  Palette, 
  Zap,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export function FeaturesSection() {
  const programs = [
    {
      icon: BookOpen,
      title: "Academic Programs",
      description: "Comprehensive curriculum covering all core subjects with advanced placement options.",
      features: ["Advanced Placement", "STEM Focus", "Liberal Arts", "Language Programs"]
    },
    {
      icon: Laptop,
      title: "Technology Integration",
      description: "Modern technology labs and digital learning tools to prepare students for the future.",
      features: ["Computer Labs", "Digital Classrooms", "Online Learning", "Tech Support"]
    },
    {
      icon: Trophy,
      title: "Sports & Athletics",
      description: "Comprehensive sports programs that build character, teamwork, and physical fitness.",
      features: ["Team Sports", "Individual Sports", "Fitness Programs", "Championships"]
    },
    {
      icon: Palette,
      title: "Arts & Culture",
      description: "Creative programs that foster artistic expression and cultural appreciation.",
      features: ["Visual Arts", "Performing Arts", "Music Programs", "Cultural Events"]
    }
  ]

  const facilities = [
    { icon: BookOpen, name: "Modern Library", desc: "10,000+ books & digital resources" },
    { icon: Laptop, name: "Computer Labs", desc: "State-of-the-art technology" },
    { icon: Users, name: "Science Labs", desc: "Fully equipped for experiments" },
    { icon: Music, name: "Music Room", desc: "Professional instruments & studio" },
    { icon: Trophy, name: "Sports Complex", desc: "Indoor & outdoor facilities" },
    { icon: Zap, name: "Innovation Hub", desc: "Maker space & creativity lab" }
  ]

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <GraduationCap className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Programs & Facilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            World-Class Education <span className="text-primary">Environment</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Our comprehensive programs and modern facilities create the perfect environment for learning, 
            growth, and achievement.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {programs.map((program, index) => (
            <motion.div key={index} variants={staggerItem}>
              <Card className="h-full p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800 group hover:-translate-y-1">
                <CardContent className="p-0 space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <program.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{program.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {program.description}
                  </p>
                  <ul className="space-y-1">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
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

        {/* Facilities */}
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Modern Facilities
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              State-of-the-art facilities designed to enhance the learning experience
            </p>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {facilities.map((facility, index) => (
              <motion.div 
                key={index} 
                className="text-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                variants={staggerItem}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
                  <facility.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                  {facility.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {facility.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
              <Link href="#contact">
                Schedule a Tour
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
