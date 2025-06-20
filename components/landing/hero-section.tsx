"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { schoolConfig } from '@/lib/config'
import { fadeInUp } from '@/lib/motion'
import { Users, BookOpen, Award, Star, ArrowRight, CheckCircle, TrendingUp, Calendar } from 'lucide-react'

export function HeroSection() {
  return (
    <motion.section
      className="relative overflow-hidden min-h-screen flex items-center justify-center pt-28 pb-16
        bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30
        dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-900"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Main Content - Takes 6 columns */}
          <div className="lg:col-span-6 space-y-8">

            {/* Enhanced Main Heading */}
            <motion.div className="space-y-6" variants={fadeInUp} transition={{ delay: 0.2 }}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold !leading-[1.2] tracking-tight">
                <span className="text-slate-900 dark:text-white">Shaping</span>
                <br />
                <span className="relative">
                  <span className="text-primary bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                    Bright Futures
                  </span>
                  <motion.div 
                    className="absolute -bottom-2 left-0 h-3 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 1 }}
                  />
                </span>
                <br />
                <span className="text-slate-700 dark:text-slate-300 text-3xl md:text-4xl lg:text-5xl">
                  Through Education
                </span>
              </h1>
              <p className="md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Empowering students with world-class education, innovative learning approaches, and character development for tomorrow&apos;s leaders.
              </p>
            </motion.div>

            {/* Key Benefits */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              { [
                  { icon: CheckCircle, text: "Personalized Learning Paths" },
                  { icon: TrendingUp, text: "98% Success Rate" },
                  { icon: Users, text: "Expert Faculty" },
                  { icon: Calendar, text: "Modern Facilities" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                      <benefit.icon className="h-4 w-4 text-accent" />
                    </div>
                    <span className="font-medium">{benefit.text}</span>
                  </div>
                )) }
            </motion.div>



            {/* Enhanced CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="group bg-primary hover:bg-primary/90 text-white h-14 px-8 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all text-lg border-0"
              >
                <Link href="/admissions">
                  <Users className="mr-3 h-6 w-6" />
                  Start Admission
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="group border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-white hover:border-primary hover:text-primary dark:hover:bg-slate-800 dark:hover:text-primary h-14 px-8 rounded-2xl font-semibold transition-all text-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm"
              >
                <Link href="#about">
                  <BookOpen className="mr-3 h-6 w-6" />
                  Discover More
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right: Video + Features - Takes 6 columns */}
          <div className="lg:col-span-6 space-y-8">
            {/* Video Section */}
            <motion.div
              className="relative"
              variants={fadeInUp}
              transition={{ delay: 0.6 }}
            >
              <div className="relative">
                {/* Enhanced Video Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-4">
                  <div className="aspect-video rounded-2xl overflow-hidden relative">
                    <video 
                      className="w-full h-full object-cover"
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                    >
                      <source 
                        src="https://videos.pexels.com/video-files/5734826/5734826-sd_640_360_30fps.mp4" 
                        type="video/mp4" 
                      />
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <span className="text-slate-500 dark:text-slate-400">Video not supported</span>
                      </div>
                    </video>
                    {/* Video Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>

                {/* Enhanced Floating Elements */}
                <motion.div 
                  className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-600 backdrop-blur-sm"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-success rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-slate-100">98% Success</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">University Admission</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-600 backdrop-blur-sm"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                >
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-slate-100">Award Winner</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Excellence in Education</div>
                    </div>
                  </div>
                </motion.div>

                {/* New Achievement Badge */}
                <motion.div 
                  className="absolute top-6 left-6 bg-gradient-to-r from-accent to-accent/80 text-white px-4 py-2 rounded-full shadow-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-semibold">Top Rated School</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Trust Indicators moved to right */}
            <motion.div 
              className="flex flex-col pt-6 sm:flex-row items-start sm:items-center gap-6"
              variants={fadeInUp}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  {[...Array(1)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-slate-900 dark:text-white">4.9/5 Rating</div>
                  <div className="text-slate-600 dark:text-slate-400">From 500+ families</div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-slate-300 dark:bg-slate-600" />
              <div className="text-sm">
                <div className="font-semibold text-slate-900 dark:text-white">Accredited Institution</div>
                <div className="text-slate-600 dark:text-slate-400">Ministry of Education Certified</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

