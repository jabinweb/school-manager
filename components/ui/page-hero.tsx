"use client"

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'
import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface PageHeroProps {
  title: string
  subtitle?: string
  description?: string
  badge?: {
    icon?: LucideIcon
    text: string
  }
  gradient?: 'blue' | 'green' | 'purple' | 'orange' | 'teal'
  children?: ReactNode
}

const gradientClasses = {
  blue: 'from-primary/10 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900',
  green: 'from-accent/10 via-green-50 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900',
  purple: 'from-purple-50 via-indigo-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900',
  orange: 'from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900',
  teal: 'from-teal-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'
}

export function PageHero({ 
  title, 
  subtitle, 
  description, 
  badge, 
  gradient = 'blue',
  children 
}: PageHeroProps) {
  return (
    <section className={`relative py-24 bg-gradient-to-br ${gradientClasses[gradient]}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              {badge.icon && <badge.icon className="h-4 w-4 text-primary mr-2" />}
              <span className="text-sm font-medium text-primary">{badge.text}</span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-700 dark:text-slate-300">
              {subtitle}
            </h2>
          )}

          {/* Description */}
          {description && (
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}

          {/* Children (for buttons, additional content) */}
          {children && (
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
