"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { useEffect } from "react"

// Enhanced theme injection with proper dark mode colors
function injectDynamicTheme() {
  if (typeof window === 'undefined') return

  const colors = {
    primary: "#1E40AF",     // Deep Blue
    secondary: "#64748B",   // Slate Gray
    accent: "#059669",      // Forest Green
    warning: "#D97706",     // Warm Orange
    success: "#16A34A",     // Rich Green
    error: "#DC2626"        // Deep Red
  }

  function hexToHsl(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s
    const l = (max + min) / 2
    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h! /= 6
    }
    return `${Math.round(h! * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
  }

  // Create lighter variants for dark mode visibility
  function createDarkModeVariant(hsl: string): string {
    const [h, s, l] = hsl.split(' ')
    const lightness = parseInt(l)
    // Increase lightness significantly for dark mode
    const newLightness = Math.min(88, lightness + 35)
    return `${h} ${s} ${newLightness}%`
  }

  const existingStyle = document.getElementById('dynamic-theme-override')
  if (existingStyle) existingStyle.remove()

  const primaryHsl = hexToHsl(colors.primary)
  const accentHsl = hexToHsl(colors.accent)
  const warningHsl = hexToHsl(colors.warning)
  const successHsl = hexToHsl(colors.success)
  const errorHsl = hexToHsl(colors.error)

  const style = document.createElement('style')
  style.id = 'dynamic-theme-override'
  style.textContent = `
    /* Light Mode - Original Colors */
    :root {
      --primary: ${primaryHsl} !important;
      --primary-foreground: 0 0% 100% !important;
      --accent: ${accentHsl} !important;
      --accent-foreground: 0 0% 100% !important;
      --warning: ${warningHsl} !important;
      --success: ${successHsl} !important;
      --error: ${errorHsl} !important;
    }
    
    /* Dark Mode - Enhanced Visibility */
    .dark {
      --primary: ${createDarkModeVariant(primaryHsl)} !important;
      --primary-foreground: 222.2 84% 4.9% !important;
      --accent: ${createDarkModeVariant(accentHsl)} !important;
      --accent-foreground: 222.2 84% 4.9% !important;
      --warning: ${createDarkModeVariant(warningHsl)} !important;
      --success: ${createDarkModeVariant(successHsl)} !important;
      --error: ${createDarkModeVariant(errorHsl)} !important;
    }

    /* Enhanced utilities for both modes */
    .text-primary { color: hsl(var(--primary)) !important; }
    .text-accent { color: hsl(var(--accent)) !important; }
    .text-warning { color: hsl(var(--warning)) !important; }
    .text-success { color: hsl(var(--success)) !important; }
    .text-error { color: hsl(var(--error)) !important; }
    
    .bg-primary { 
      background-color: hsl(var(--primary)) !important; 
      color: hsl(var(--primary-foreground)) !important;
    }
    .bg-accent { 
      background-color: hsl(var(--accent)) !important; 
      color: hsl(var(--accent-foreground)) !important;
    }
    
    .border-primary { border-color: hsl(var(--primary)) !important; }
    .border-accent { border-color: hsl(var(--accent)) !important; }
    
    /* Enhanced button styling for dark mode */
    .dark .border-primary\\/40 {
      border-color: hsl(var(--primary) / 0.6) !important;
    }
    
    /* Button and hover enhancements */
    .hover\\:bg-primary\\/90:hover { 
      background-color: hsl(var(--primary) / 0.9) !important; 
    }
    .hover\\:bg-primary\\/10:hover { 
      background-color: hsl(var(--primary) / 0.1) !important; 
    }
    
    /* Dark mode specific enhancements */
    .dark .bg-primary\\/10 {
      background-color: hsl(var(--primary) / 0.15) !important;
    }
    .dark .bg-accent\\/10 {
      background-color: hsl(var(--accent) / 0.15) !important;
    }
    .dark .bg-warning\\/10 {
      background-color: hsl(var(--warning) / 0.15) !important;
    }
    
    /* Gradient text fixes for dark mode */
    .dark .bg-gradient-to-r {
      background: linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent))) !important;
      -webkit-background-clip: text !important;
      background-clip: text !important;
    }
  `

  document.head.appendChild(style)
}

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initial injection
    injectDynamicTheme()
    
    // Re-inject on theme changes with better timing
    const observer = new MutationObserver(() => {
      setTimeout(injectDynamicTheme, 100)
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Handle system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleThemeChange = () => {
      setTimeout(injectDynamicTheme, 100)
    }
    
    mediaQuery.addEventListener('change', handleThemeChange)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [])

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange={false}
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}
