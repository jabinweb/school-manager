"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { schoolConfig } from '@/lib/config'
import { GraduationCap, Menu, X, ChevronDown } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs', hasDropdown: true },
    { name: 'Admissions', href: '/admissions' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ]

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { delay: 0.2, type: "spring", stiffness: 200 }
    }
  }

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.1 + 0.3 }
    })
  }

  if (!mounted) return null

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-colors duration-300
        bg-background/80 dark:bg-background/80 border-b border-border/50 dark:border-border/50
        ${isScrolled ? 'shadow-md' : ''}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div className="flex items-center space-x-3"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
              >
                <GraduationCap
                  className="h-8 w-8 transition-colors text-primary"
                />
              </motion.div>
              <div>
                <span className="text-xl font-bold font-display text-foreground dark:text-foreground">
                  {schoolConfig.shortName}
                </span>
                <div className="text-xs text-muted-foreground dark:text-muted-foreground">
                  Excellence in Education
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <Link
                  href={item.href}
                  className="relative font-medium text-foreground/80 dark:text-foreground/80 
                    transition-colors hover:text-primary dark:hover:text-primary"
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className="inline ml-1 h-4 w-4" />
                  )}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 rounded-full bg-primary"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="ghost" className="rounded-full">
                <Link href="/auth/signin">Staff Portal</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                asChild 
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="/auth/signin">Student Portal</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground dark:text-foreground rounded-full"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden mt-2 bg-card/95 dark:bg-card/95 backdrop-blur-md rounded-lg p-4 
                space-y-2 border border-border dark:border-border shadow-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block py-2 px-3 text-foreground dark:text-foreground hover:bg-primary/10 
                      dark:hover:bg-primary/10 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 space-y-2 border-t border-border dark:border-border">
                <Button asChild variant="ghost" className="w-full rounded-full">
                  <Link href="/auth/signin">Staff Portal</Link>
                </Button>
                <Button 
                  asChild 
                  className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link href="/auth/signin">Student Portal</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
