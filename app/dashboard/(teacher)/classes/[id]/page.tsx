import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ClassPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function TeacherClassPage({ params }: ClassPageProps) {
  const { id } = await params
  
  const session = await auth()
  
  if (!session || session.user?.role !== "TEACHER") {
    redirect("/dashboard")
  }

  const cls = await prisma.class.findUnique({
    where: { 
      id: id,
      teacherId: session.user?.id // Ensure teacher can only access their own classes
    },
    include: {
      students: {
        select: {
          id: true,
          name: true,
          email: true,
          studentNumber: true
        }
      },
      subjects: {
        include: {
          subject: true
        }
      },
      timetable: {
        include: {
          subject: true
        },
        orderBy: {
          startTime: 'asc'
        }
      }
    }
  })

  if (!cls) {
    redirect("/dashboard/classes")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/classes">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Classes
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {cls.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Grade {cls.grade} • Section {cls.section}
            </p>
          </div>
        </div>
        <Badge variant="outline">
          {cls.students.length} / {cls.capacity} Students
        </Badge>
      </div>

      {/* Class Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cls.students.length}</div>
            <p className="text-xs text-muted-foreground">
              Capacity: {cls.capacity}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cls.subjects.length}</div>
            <p className="text-xs text-muted-foreground">
              Active subjects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Schedule</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cls.timetable.length}</div>
            <p className="text-xs text-muted-foreground">
              Weekly periods
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
        </CardHeader>
        <CardContent>
          {cls.students.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No students enrolled in this class yet.
            </div>
          ) : (
            <div className="grid gap-4">
              {cls.students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm text-muted-foreground">{student.studentNumber}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {student.email}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subjects */}
      <Card>
        <CardHeader>
          <CardTitle>Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          {cls.subjects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No subjects assigned to this class yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {cls.subjects.map((classSubject) => (
                <div key={classSubject.id} className="p-4 border rounded-lg">
                  <h4 className="font-medium">{classSubject.subject.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Code: {classSubject.subject.code}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Credits: {classSubject.subject.credits}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
                          