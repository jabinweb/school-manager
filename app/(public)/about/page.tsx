"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/ui/page-hero"
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion'
import { GraduationCap, Users, Award, BookOpen, Heart, Target, Lightbulb, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { schoolConfig } from '@/lib/config'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Academic Excellence",
      description: "We maintain the highest academic standards through innovative teaching methods, rigorous curriculum, and personalized attention to each student's learning needs."
    },
    {
      icon: Heart,
      title: "Character Development",
      description: "Beyond academics, we focus on building strong moral character, leadership skills, and social responsibility in our students."
    },
    {
      icon: Lightbulb,
      title: "Innovation & Creativity",
      description: "We encourage creative thinking, problem-solving, and innovation through hands-on learning experiences and cutting-edge educational technology."
    }
  ]

  const achievements = [
    { icon: Award, title: "National Excellence Award", year: "2023" },
    { icon: Users, title: "Top 10 Schools", year: "2022-2024" },
    { icon: BookOpen, title: "Curriculum Innovation Award", year: "2023" },
    { icon: GraduationCap, title: "Teacher Excellence Recognition", year: "2024" }
  ]

  const staff = [
    {
      name: "Dr. Sarah Johnson",
      role: "Principal",
      image: "https://images.unsplash.com/photo-1559209172-4c0d4d415ffe?w=300&h=300&fit=crop&crop=face",
      bio: "20+ years in educational leadership"
    },
    {
      name: "Prof. Michael Chen",
      role: "Academic Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Expert in curriculum development"
    },
    {
      name: "Ms. Emily Davis",
      role: "Student Affairs Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616c2a0cc3b?w=300&h=300&fit=crop&crop=face",
      bio: "Dedicated to student success"
    }
  ]

  return (
    <div className="min-h-screen">
      <PageHero
        title="About Our School"
        description={`${schoolConfig.description} Since 1999, we've been committed to providing exceptional education that nurtures both academic excellence and character development.`}
        badge={{
          iconName: "GraduationCap",
          text: "About Our School"
        }}
        gradient="blue"
      />

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          {/* School Overview */}
          <motion.div 
            className="max-w-4xl mx-auto mb-20"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
                  Our Story & Mission
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  Founded in 1999, {schoolConfig.name} has been a beacon of educational excellence for over two decades. 
                  We believe that every student has the potential to achieve greatness, and our mission is to provide 
                  the tools, support, and environment necessary for them to flourish.
                </p>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  Our comprehensive approach to education combines rigorous academics with character development, 
                  ensuring our graduates are well-prepared for the challenges and opportunities of the 21st century.
                </p>
                <Button asChild>
                  <Link href="/programs">
                    Explore Our Programs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=500&fit=crop"
                    alt="School building"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div 
            className="max-w-6xl mx-auto mb-20"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                Our Core Values
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                These fundamental principles guide everything we do and shape the character of our school community.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <Card className="h-full text-center p-6 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <value.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-300">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div 
            className="max-w-4xl mx-auto mb-20"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                Recognition & Achievements
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Our commitment to excellence has been recognized by various educational bodies and organizations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center p-6">
                  <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <achievement.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{achievement.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{achievement.year}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Leadership Team */}
          <motion.div 
            className="max-w-6xl mx-auto mb-20"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                Leadership Team
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Meet the dedicated leaders who guide our school&apos;s vision and mission.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {staff.map((member, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <Card className="text-center overflow-hidden">
                    <div className="relative h-64">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{member.name}</h3>
                      <p className="text-primary font-medium mb-2">{member.role}</p>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Card className="bg-slate-50 dark:bg-slate-800">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                    Visit Our Campus
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300">
                    We welcome you to visit our campus and experience our learning environment firsthand.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-3">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Address</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      {schoolConfig.contact.address}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Phone</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      {schoolConfig.contact.phone}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Email</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      {schoolConfig.contact.email}
                    </p>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Schedule a Visit
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
