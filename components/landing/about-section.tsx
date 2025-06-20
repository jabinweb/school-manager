"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { schoolConfig } from '@/lib/config'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion'
import { Target, Heart, Lightbulb, Users, BookOpen, Award, Globe, Zap } from 'lucide-react'
import Image from 'next/image'

export function AboutSection() {
  const values = [
    {
      icon: Target,
      title: "Academic Excellence",
      description: "Striving for the highest academic standards with innovative teaching methods and comprehensive curriculum.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Heart,
      title: "Community Focus", 
      description: "Building strong relationships and fostering collaboration between students, faculty, and families.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Lightbulb,
      title: "Innovation & Growth",
      description: "Embracing new technologies and creative problem-solving to prepare students for the future.",
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ]

  const features = [
    { icon: Users, title: "Expert Faculty", desc: "Dedicated & qualified teachers" },
    { icon: BookOpen, title: "Modern Curriculum", desc: "Updated & comprehensive programs" },
    { icon: Award, title: "Excellence Awards", desc: "Recognized achievements" },
    { icon: Globe, title: "Global Perspective", desc: "International partnerships" }
  ]

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-20"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">About {schoolConfig.shortName}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Empowering the Next Generation of 
            <span className="text-primary"> Leaders</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            For over {schoolConfig.stats.yearsEstablished} years, we&apos;ve been committed to providing exceptional education 
            that nurtures both academic excellence and character development.
          </p>
        </motion.div>

        {/* Enhanced Layout with Images */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Left: Core Values */}
          <motion.div 
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="group h-full border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${value.bgColor} mb-4`}>
                      <value.icon className={`h-7 w-7 ${value.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Image Gallery */}
          <motion.div 
            className="relative"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image */}
              <div className="col-span-2 relative h-64 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80"
                  alt="Modern classroom with engaged students"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold">Interactive Learning</h4>
                  <p className="text-sm opacity-90">Engaging classroom environments</p>
                </div>
              </div>

              {/* Small Images */}
              <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1562774053-701939374585?w=400&auto=format&fit=crop&q=80"
                  alt="Science laboratory"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=80"
                  alt="Students in library"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div 
              className="absolute -bottom-8 -right-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-600"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">{schoolConfig.stats.yearsEstablished}+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Years of Excellence</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-4 gap-6 mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="text-center p-6 rounded-xl bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all"
              variants={staggerItem}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{feature.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Stats */}
        <motion.div 
          className="relative"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-0 p-8 shadow-xl">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Students Enrolled", value: schoolConfig.stats.studentsCount, suffix: "+", icon: Users },
                { label: "Expert Faculty", value: schoolConfig.stats.teachersCount, suffix: "+", icon: Award },
                { label: "Success Rate", value: schoolConfig.stats.passRate, suffix: "%", icon: Target },
                { label: "Years of Excellence", value: schoolConfig.stats.yearsEstablished, suffix: "", icon: Zap }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="space-y-3"
                  variants={staggerItem}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-2">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
