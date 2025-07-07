import Link from 'next/link'
import { schoolConfig } from '@/lib/config'
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 dark:text-slate-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-white dark:text-white">
                {schoolConfig.shortName}
              </span>
            </div>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              {schoolConfig.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-accent" />
                <span>{schoolConfig.contact.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-accent" />
                <span>{schoolConfig.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{schoolConfig.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-primary transition-colors">
                  Academic Programs
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-primary transition-colors">
                  Faculty & Staff
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  School Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Admissions */}
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-white mb-4">Admissions</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/admissions/apply" className="hover:text-primary transition-colors">
                  Apply Now
                </Link>
              </li>
              <li>
                <Link href="/admissions/requirements" className="hover:text-primary transition-colors">
                  Admission Requirements
                </Link>
              </li>
              <li>
                <Link href="/admissions/tuition" className="hover:text-primary transition-colors">
                  Tuition & Fees
                </Link>
              </li>
              <li>
                <Link href="/admissions/financial-aid" className="hover:text-primary transition-colors">
                  Financial Aid
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/auth/signin" className="hover:text-primary transition-colors">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="hover:text-primary transition-colors">
                  Parent Portal
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="hover:text-primary transition-colors">
                  Staff Portal
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Library
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 dark:border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-slate-400 dark:text-slate-500">
              © 2024 {schoolConfig.name}. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms of Use
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

