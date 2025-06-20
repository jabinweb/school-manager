import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Bell,
  UserCheck,
  CreditCard,
  Award,
  BarChart3,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle,
  FileText,
  MessageSquare
} from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/auth/signin")
  }

  // Redirect admin users to admin panel
  if (session.user?.role === "ADMIN") {
    redirect("/admin")
  }

  const userRole = session.user?.role || "STUDENT"

  // Role-based stats
  const getStatsForRole = (role: string) => {
    switch (role) {
      case "TEACHER":
        return {
          myClasses: 5,
          totalStudents: 125,
          todayAttendance: 95.2,
          pendingGrades: 23,
          upcomingLessons: 8,
          assignmentsDue: 12
        }
      case "STUDENT":
        return {
          myGrades: "A-",
          attendanceRate: 96.5,
          assignmentsDue: 3,
          upcomingExams: 2,
          extracurriculars: 4,
          creditsCompleted: 45
        }
      case "PARENT":
        return {
          children: 2,
          attendanceRate: 94.8,
          averageGrade: "B+",
          upcomingEvents: 4,
          pendingPayments: 1,
          teacherMeetings: 2
        }
      default:
        return {}
    }
  }

  const stats = getStatsForRole(userRole)

  // Role-based activities
  const getActivitiesForRole = (role: string) => {
    switch (role) {
      case "TEACHER":
        return [
          { id: 1, message: 'Grade 10-A Math assignment submitted', time: '2 hours ago', status: 'pending' },
          { id: 2, message: 'Parent meeting scheduled with Sarah Johnson', time: '4 hours ago', status: 'completed' },
          { id: 3, message: 'New announcement posted to Grade 9-B', time: '6 hours ago', status: 'active' },
          { id: 4, message: 'Attendance marked for all classes', time: '1 day ago', status: 'completed' }
        ]
      case "STUDENT":
        return [
          { id: 1, message: 'Mathematics assignment due tomorrow', time: '2 hours ago', status: 'pending' },
          { id: 2, message: 'Science project grade received: A-', time: '1 day ago', status: 'completed' },
          { id: 3, message: 'New announcement from Ms. Smith', time: '2 days ago', status: 'active' },
          { id: 4, message: 'Library book return reminder', time: '3 days ago', status: 'pending' }
        ]
      case "PARENT":
        return [
          { id: 1, message: 'John\'s math grade updated: B+', time: '1 hour ago', status: 'completed' },
          { id: 2, message: 'Parent-teacher meeting reminder', time: '3 hours ago', status: 'pending' },
          { id: 3, message: 'Fee payment due next week', time: '1 day ago', status: 'pending' },
          { id: 4, message: 'School event: Science Fair next Friday', time: '2 days ago', status: 'active' }
        ]
      default:
        return []
    }
  }

  const recentActivities = getActivitiesForRole(userRole)

  const upcomingEvents = [
    { title: 'Parent-Teacher Meeting', date: '2024-02-15', time: '9:00 AM' },
    { title: 'Science Fair', date: '2024-02-20', time: '10:00 AM' },
    { title: 'Sports Day', date: '2024-02-25', time: '8:00 AM' }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'active': return <Bell className="h-4 w-4 text-blue-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getRoleBasedGreeting = (role: string) => {
    switch (role) {
      case "TEACHER": return "Welcome to your teaching dashboard!"
      case "STUDENT": return "Ready for another day of learning?"
      case "PARENT": return "Stay connected with your child's education."
      default: return "Welcome to your dashboard!"
    }
  }

  const renderRoleBasedStats = () => {
    switch (userRole) {
      case "TEACHER":
        return (
          <>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  My Classes
                </CardTitle>
                <BookOpen className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {stats.myClasses}
                </div>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Active this semester
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">
                  Total Students
                </CardTitle>
                <Users className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {stats.totalStudents}
                </div>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Across all classes
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">
                  Today&apos;s Attendance
                </CardTitle>
                <UserCheck className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {stats.todayAttendance}%
                </div>
                <Progress value={stats.todayAttendance} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-900 dark:text-orange-100">
                  Pending Grades
                </CardTitle>
                <FileText className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {stats.pendingGrades}
                </div>
                <p className="text-xs text-orange-700 dark:text-orange-300">
                  Assignments to grade
                </p>
              </CardContent>
            </Card>
          </>
        )

      case "STUDENT":
        return (
          <>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Current GPA
                </CardTitle>
                <Award className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {stats.myGrades}
                </div>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  This semester
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">
                  Attendance Rate
                </CardTitle>
                <UserCheck className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {stats.attendanceRate}%
                </div>
                <Progress value={stats.attendanceRate} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">
                  Assignments Due
                </CardTitle>
                <FileText className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {stats.assignmentsDue}
                </div>
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  This week
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-900 dark:text-orange-100">
                  Upcoming Exams
                </CardTitle>
                <Calendar className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {stats.upcomingExams}
                </div>
                <p className="text-xs text-orange-700 dark:text-orange-300">
                  Next 2 weeks
                </p>
              </CardContent>
            </Card>
          </>
        )

      case "PARENT":
        return (
          <>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  My Children
                </CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {stats.children}
                </div>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Enrolled students
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">
                  Average Grade
                </CardTitle>
                <Award className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {stats.averageGrade}
                </div>
                <p className="text-xs text-green-700 dark:text-green-300">
                  This semester
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">
                  Attendance Rate
                </CardTitle>
                <UserCheck className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {stats.attendanceRate}%
                </div>
                <Progress value={stats.attendanceRate} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-900 dark:text-orange-100">
                  Pending Payments
                </CardTitle>
                <CreditCard className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {stats.pendingPayments}
                </div>
                <p className="text-xs text-orange-700 dark:text-orange-300">
                  Outstanding fees
                </p>
              </CardContent>
            </Card>
          </>
        )

      default:
        return null
    }
  }

  const renderRoleBasedQuickActions = () => {
    switch (userRole) {
      case "TEACHER":
        return (
          <>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/classes">
                <BookOpen className="h-4 w-4 mr-2" />
                My Classes
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/grades">
                <FileText className="h-4 w-4 mr-2" />
                Grade Assignments
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/attendance">
                <UserCheck className="h-4 w-4 mr-2" />
                Take Attendance
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/announcements">
                <Bell className="h-4 w-4 mr-2" />
                Post Announcement
              </Link>
            </Button>
          </>
        )

      case "STUDENT":
        return (
          <>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/assignments">
                <FileText className="h-4 w-4 mr-2" />
                View Assignments
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/grades">
                <Award className="h-4 w-4 mr-2" />
                Check Grades
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/schedule">
                <Calendar className="h-4 w-4 mr-2" />
                Class Schedule
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/library">
                <BookOpen className="h-4 w-4 mr-2" />
                Library Resources
              </Link>
            </Button>
          </>
        )

      case "PARENT":
        return (
          <>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/children">
                <Users className="h-4 w-4 mr-2" />
                My Children
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/grades">
                <Award className="h-4 w-4 mr-2" />
                View Grades
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/meetings">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/payments">
                <CreditCard className="h-4 w-4 mr-2" />
                Fee Payments
              </Link>
            </Button>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Welcome back, {session.user?.name}!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {getRoleBasedGreeting(userRole)}
            </p>
            <Badge variant="outline" className="mt-2">
              {userRole}
            </Badge>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/dashboard/messages">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/help">
                <Bell className="h-4 w-4 mr-2" />
                Help & Support
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderRoleBasedStats()}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/activities">
                    View All
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {activity.message}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {activity.time}
                      </p>
                    </div>
                    <Badge variant={activity.status === 'completed' ? 'default' : activity.status === 'pending' ? 'secondary' : 'outline'}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Events */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {renderRoleBasedQuickActions()}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {event.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {event.date} • {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/dashboard/events">
                    View All Events
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
