"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHero } from '@/components/ui/page-hero'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion'
import { 
  GraduationCap, 
  Target, 
  Heart, 
  Lightbulb, 
  Users, 
  BookOpen,
  Globe,
  History,
  Eye,
  Star,
  Zap
} from 'lucide-react'
import { schoolConfig } from '@/lib/config'
import Image from 'next/image'

export default function AboutPage() {
  const leadership = [
    {
      name: "Dr. Sarah Mitchell",
      position: "Principal",
      bio: "With over 20 years in education, Dr. Mitchell brings innovative leadership and a passion for student success.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80",
      qualifications: ["Ph.D. in Educational Leadership", "M.Ed. in Curriculum & Instruction"]
    },
    {
      name: "Prof. Michael Chen",
      position: "Vice Principal",
      bio: "A former university professor specializing in STEM education with a focus on innovative teaching methods.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
      qualifications: ["Ph.D. in Mathematics", "M.Sc. in Computer Science"]
    },
    {
      name: "Ms. Emily Rodriguez",
      position: "Academic Director",
      bio: "Leading curriculum development and academic excellence initiatives across all grade levels.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1ba?w=300&auto=format&fit=crop&q=80",
      qualifications: ["M.Ed. in Curriculum Design", "B.A. in Education"]
    },
    {
      name: "Mr. James Wilson",
      position: "Student Affairs Director",
      bio: "Dedicated to student welfare, extracurricular activities, and building a supportive school community.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      qualifications: ["M.A. in Psychology", "B.Ed. in Physical Education"]
    }
  ]

  const milestones = [
    { year: "1999", event: "School Founded", description: "Greenwood High School established with 150 students" },
    { year: "2005", event: "First Graduation", description: "Our first graduating class of 45 students with 100% university acceptance" },
    { year: "2010", event: "STEM Lab Opening", description: "State-of-the-art science and technology laboratories inaugurated" },
    { year: "2015", event: "International Recognition", description: "Awarded 'Excellence in Education' by the National Education Board" },
    { year: "2020", event: "Digital Transformation", description: "Complete digital learning infrastructure implemented" },
    { year: "2024", event: "Expansion Project", description: "New campus wing with modern facilities and increased capacity" }
  ]

  const coreValues = [
    {
      icon: Target,
      title: "Academic Excellence",
      description: "Striving for the highest academic standards through innovative teaching methods and comprehensive curriculum.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Heart,
      title: "Community & Character",
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
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "Preparing students to be responsible global citizens with cultural awareness and understanding.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    }
  ]

  const achievements = [
    { metric: "98%", label: "University Acceptance Rate" },
    { metric: "25+", label: "Years of Excellence" },
    { metric: "1,250+", label: "Happy Students" },
    { metric: "85+", label: "Expert Faculty" },
    { metric: "15+", label: "Academic Awards" },
    { metric: "100%", label: "Teacher Certification" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title={`Welcome to ${schoolConfig.name}`}
        description={`${schoolConfig.description} Since 1999, we've been committed to providing exceptional education that nurtures both academic excellence and character development.`}
        badge={{
          icon: GraduationCap,
          text: "About Our School"
        }}
        gradient="blue"
      />

      {/* Mission & Vision */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    To provide a nurturing and academically rigorous environment that empowers students 
                    to achieve their full potential, develop critical thinking skills, and become 
                    responsible global citizens who contribute positively to society.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Eye className="h-6 w-6 text-accent" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Vision</h2>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    To be a leading educational institution recognized for excellence in teaching, 
                    learning, and character development, preparing students to thrive in an 
                    ever-changing global landscape.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80"
                  alt="Students in collaborative learning environment"
                  width={600}
                  height={400}
                  className="object-cover w-full h-96"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Collaborative Learning</h3>
                  <p className="text-sm opacity-90">Students working together toward success</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
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
              Our Core Values
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              The principles that guide everything we do at Greenwood High School
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {coreValues.map((value, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className={`mx-auto w-16 h-16 rounded-full ${value.bgColor} flex items-center justify-center mb-4`}>
                      <value.icon className={`h-8 w-8 ${value.color}`} />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership Team */}
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
              Leadership Team
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Meet the dedicated professionals leading our school community
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {leadership.map((leader, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg">{leader.name}</h3>
                      <p className="text-sm opacity-90">{leader.position}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                      {leader.bio}
                    </p>
                    <div className="space-y-1">
                      {leader.qualifications.map((qual, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                          {qual}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* School History & Milestones */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <History className="h-4 w-4 text-accent mr-2" />
              <span className="text-sm font-medium text-accent">Our Journey</span>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              25 Years of Excellence
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Key milestones in our journey toward educational excellence
            </p>
          </motion.div>

          <motion.div 
            className="relative"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Timeline */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary/30"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  variants={staggerItem}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-primary text-white">{milestone.year}</Badge>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                          {milestone.event}
                        </h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        {milestone.description}
                      </p>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative z-10 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-slate-800 shadow-lg"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements & Statistics */}
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
              Our Achievements
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={staggerItem}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {achievement.metric}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {achievement.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Campus & Facilities Preview */}
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
                Modern Campus & Facilities
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Our state-of-the-art campus provides the perfect environment for learning, 
                creativity, and personal growth. From advanced science laboratories to 
                comfortable dormitories, every facility is designed with student success in mind.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: BookOpen, label: "Modern Library", desc: "10,000+ books" },
                  { icon: Users, label: "Science Labs", desc: "Fully equipped" },
                  { icon: Star, label: "Sports Complex", desc: "Indoor & outdoor" },
                  { icon: Zap, label: "Innovation Hub", desc: "Maker space" }
                ].map((facility, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <facility.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm">
                        {facility.label}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {facility.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=80"
                      alt="Modern library"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1562774053-701939374585?w=400&auto=format&fit=crop&q=80"
                      alt="Science laboratory"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&auto=format&fit=crop&q=80"
                      alt="Sports facility"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&auto=format&fit=crop&q=80"
                      alt="Arts studio"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
                   