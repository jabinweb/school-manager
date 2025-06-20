import { prisma } from '@/lib/prisma'

interface SchoolSettings {
  schoolName: string
  schoolShortName: string
  schoolTagline: string
  schoolDescription: string
  schoolAddress: string
  schoolPhone: string
  schoolEmail: string
  schoolWebsite: string
  adminEmail: string
  currency: string
  currencySymbol: string
  currencyPosition: 'before' | 'after'
  timeZone: string
  dateFormat: string
  academicYearStart: Date
  academicYearEnd: Date
  language: string
  theme: string
  logoUrl?: string
  bannerUrl?: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
}

// Cache for settings to avoid frequent database calls
let settingsCache: SchoolSettings | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function getSchoolSettings(): Promise<SchoolSettings> {
  const now = Date.now()
  
  // Return cached settings if still valid
  if (settingsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return settingsCache
  }

  try {
    const settings = await prisma.schoolSettings.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    if (settings) {
      settingsCache = {
        schoolName: settings.schoolName,
        schoolShortName: settings.schoolShortName,
        schoolTagline: settings.schoolTagline || '',
        schoolDescription: settings.schoolDescription || '',
        schoolAddress: settings.schoolAddress || '',
        schoolPhone: settings.schoolPhone || '',
        schoolEmail: settings.schoolEmail || '',
        schoolWebsite: settings.schoolWebsite || '',
        adminEmail: settings.adminEmail || '',
        currency: settings.currency,
        currencySymbol: settings.currencySymbol,
        currencyPosition: settings.currencyPosition as 'before' | 'after',
        timeZone: settings.timeZone,
        dateFormat: settings.dateFormat,
        academicYearStart: settings.academicYearStart,
        academicYearEnd: settings.academicYearEnd,
        language: settings.language,
        theme: settings.theme,
        logoUrl: settings.logoUrl || undefined,
        bannerUrl: settings.bannerUrl || undefined,
        primaryColor: settings.primaryColor,
        secondaryColor: settings.secondaryColor,
        accentColor: settings.accentColor
      }
    } else {
      // Default settings if none exist
      settingsCache = {
        schoolName: 'Greenwood High School',
        schoolShortName: 'GHS',
        schoolTagline: 'Excellence in Education Since 1999',
        schoolDescription: 'Nurturing minds, building futures with innovative learning and character development.',
        schoolAddress: '123 Education Boulevard, Learning City, LC 12345',
        schoolPhone: '(555) 123-4567',
        schoolEmail: 'info@greenwoodhigh.edu',
        schoolWebsite: 'https://greenwoodhigh.edu',
        adminEmail: 'admin@greenwoodhigh.edu',
        currency: 'USD',
        currencySymbol: '$',
        currencyPosition: 'before',
        timeZone: 'America/New_York',
        dateFormat: 'MM/dd/yyyy',
        academicYearStart: new Date('2024-08-01'),
        academicYearEnd: new Date('2025-06-30'),
        language: 'en',
        theme: 'system',
        primaryColor: '#1E40AF',
        secondaryColor: '#64748B',
        accentColor: '#059669'
      }
    }

    cacheTimestamp = now
    return settingsCache
  } catch (error) {
    console.error('Error fetching school settings:', error)
    // Return default settings on error
    return {
      schoolName: 'Greenwood High School',
      schoolShortName: 'GHS',
      schoolTagline: 'Excellence in Education Since 1999',
      schoolDescription: 'Nurturing minds, building futures with innovative learning and character development.',
      schoolAddress: '123 Education Boulevard, Learning City, LC 12345',
      schoolPhone: '(555) 123-4567',
      schoolEmail: 'info@greenwoodhigh.edu',
      schoolWebsite: 'https://greenwoodhigh.edu',
      adminEmail: 'admin@greenwoodhigh.edu',
      currency: 'USD',
      currencySymbol: '$',
      currencyPosition: 'before',
      timeZone: 'America/New_York',
      dateFormat: 'MM/dd/yyyy',
      academicYearStart: new Date('2024-08-01'),
      academicYearEnd: new Date('2025-06-30'),
      language: 'en',
      theme: 'system',
      primaryColor: '#1E40AF',
      secondaryColor: '#64748B',
      accentColor: '#059669'
    }
  }
}

// Helper function to format currency amounts
export function formatCurrency(amount: number, settings?: SchoolSettings): string {
  if (!settings) {
    return `$${amount.toFixed(2)}`
  }

  const formatted = amount.toFixed(2)
  return settings.currencyPosition === 'before' 
    ? `${settings.currencySymbol}${formatted}`
    : `${formatted}${settings.currencySymbol}`
}

// Helper function to clear settings cache (call when settings are updated)
export function clearSettingsCache(): void {
  settingsCache = null
  cacheTimestamp = 0
}

// Helper function to format dates according to settings
export function formatDate(date: Date, settings?: SchoolSettings): string {
  if (!settings) {
    return date.toLocaleDateString('en-US')
  }

  const format = settings.dateFormat
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()

  switch (format) {
    case 'dd/MM/yyyy':
      return `${day}/${month}/${year}`
    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`
    case 'dd-MM-yyyy':
      return `${day}-${month}-${year}`
    case 'MM/dd/yyyy':
    default:
      return `${month}/${day}/${year}`
  }
}
