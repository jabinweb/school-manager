"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp } from '@/lib/motion'
import * as LucideIcons from 'lucide-react'

type PageHeroProps = {
  title: string
  description?: string
  badge?: {
    icon?: LucideIcons.LucideIcon // Changed from icon component to iconName string
    text: string
  }
  gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'gray'
  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children?: React.ReactNode // Add children prop
}

export function PageHero({ 
  title, 
  description, 
  badge, 
  gradient = 'blue',
  align = 'center',
  size = 'md',
  className,
  children // Add children to destructuring
}: PageHeroProps) {
  const gradientStyles = {
    blue: 'from-blue-600/20 via-blue-500/10 to-transparent',
    purple: 'from-purple-600/20 via-purple-500/10 to-transparent',
    green: 'from-green-600/20 via-green-500/10 to-transparent',
    orange: 'from-orange-600/20 via-orange-500/10 to-transparent',
    red: 'from-red-600/20 via-red-500/10 to-transparent',
    gray: 'from-slate-600/20 via-slate-500/10 to-transparent'
  }
  
  const sizePadding = {
    sm: 'py-12',
    md: 'py-20',
    lg: 'py-28'
  }

  // Render icon from the iconName string
  const renderIcon = (iconName: string | undefined) => {
    if (!iconName) return null
    
    const IconComponent = LucideIcons[iconName]
    
    if (!IconComponent) return null
    return <IconComponent className="h-4 w-4 mr-2" />
  }

  return (
    <div
      className={cn(
        'relative bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800',
        className
      )}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${gradientStyles[gradient]} opacity-70`} />
      <div className={`relative container mx-auto px-4 ${sizePadding[size]}`}>
        <motion.div
          className={`max-w-3xl mx-auto ${align === 'center' ? 'text-center' : 'text-left'}`}
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {badge && (
            <div className="inline-flex items-center rounded-full px-3 py-1 mb-4 bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              {badge.iconName && renderIcon(badge.iconName)}
              <span>{badge.text}</span>
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

