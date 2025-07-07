"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, BookOpen, Calendar, Award, CreditCard, Bell, FileText, MessageSquare, UserCheck } from "lucide-react"

export function DashboardSidebar({ user }: { user: { role: string } }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Role-based menu items
  const menu: Record<string, Array<{ title: string; href: string; icon: React.ElementType }>> = {
    STUDENT: [
      { title: "My Grades", href: "/dashboard/grades", icon: Award },
      { title: "Assignments", href: "/dashboard/assignments", icon: FileText },
      { title: "Schedule", href: "/dashboard/schedule", icon: Calendar },
      { title: "Library", href: "/dashboard/library", icon: BookOpen },
      { title: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    ],
    TEACHER: [
      { title: "My Classes", href: "/dashboard/classes", icon: BookOpen },
      { title: "Grade Assignments", href: "/dashboard/grades", icon: FileText },
      { title: "Attendance", href: "/dashboard/attendance", icon: UserCheck },
      { title: "Announcements", href: "/dashboard/announcements", icon: Bell },
      { title: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    ],
    PARENT: [
      { title: "My Children", href: "/dashboard/children", icon: Users },
      { title: "Grades", href: "/dashboard/grades", icon: Award },
      { title: "Meetings", href: "/dashboard/meetings", icon: Calendar },
      { title: "Payments", href: "/dashboard/payments", icon: CreditCard },
      { title: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    ],
    ADMIN: [
      { title: "Admin Panel", href: "/admin", icon: Users },
      { title: "Dashboard", href: "/dashboard", icon: BookOpen },
    ],
  }

  const items = menu[user.role] || []

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-primary text-white rounded-full p-2 shadow-lg focus:outline-none"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
        type="button"
      >
        <BookOpen className="h-6 w-6" />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-40">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <span className="font-bold text-lg text-primary">Dashboard</span>
        </div>
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-120px)]">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`
          fixed inset-0 z-50 transition-all duration-300
          ${mobileOpen ? "block" : "pointer-events-none"}
          lg:hidden
        `}
        style={{ background: mobileOpen ? "rgba(0,0,0,0.3)" : "transparent" }}
        onClick={() => setMobileOpen(false)}
        aria-label="Sidebar overlay"
      >
        <div
          className={`
            fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-50
            transform transition-transform duration-300
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-primary"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
            type="button"
          >
            <BookOpen className="h-6 w-6" />
          </button>
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <span className="font-bold text-lg text-primary">Dashboard</span>
          </div>
          <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-120px)]">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
