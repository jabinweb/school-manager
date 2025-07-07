import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, Users, Calendar, Award, FileText, Bell } from "lucide-react"
import Link from "next/link"

interface ClassPageProps {
  params: { id: string }
}

export default async function TeacherClassPage({ params }: ClassPageProps) {
  const session = await auth()
  if (!session) redirect("/auth/signin")
  if (session.user?.role !== "TEACHER") redirect("/dashboard")

  const classId = params.id
  const cls = await prisma.class.findUnique({
    where: { id: classId },
    include: {
      subjects: { include: { subject: true } },
      students: true,
      timetable: {
        include: { subject: true },
        orderBy: { day: "asc" }
      },
      exams: true,
      announcements: {
        orderBy: { publishDate: "desc" },
        take: 3
      }
    }
  })

  if (!cls) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold mb-4">Class not found</h2>
        <p>The class you are looking for does not exist.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header Card */}
      <Card className="mb-6 shadow-lg">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <BookOpen className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="text-2xl">{cls.name}</CardTitle>
              <CardDescription>
                Section <span className="font-semibold">{cls.section}</span> &bull; Grade <span className="font-semibold">{cls.grade}</span>
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">{cls.students.length} Students</Badge>
            <Badge variant="secondary" className="text-xs">{cls.subjects.length} Subjects</Badge>
            <Badge variant="default" className="text-xs">Timetable</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs for navigation */}
      <Tabs defaultValue="students" className="mb-8">
        <TabsList>
          <TabsTrigger value="students">
            <Users className="h-4 w-4 mr-1" /> Students
          </TabsTrigger>
          <TabsTrigger value="subjects">
            <BookOpen className="h-4 w-4 mr-1" /> Subjects
          </TabsTrigger>
          <TabsTrigger value="timetable">
            <Calendar className="h-4 w-4 mr-1" /> Timetable
          </TabsTrigger>
          <TabsTrigger value="exams">
            <Award className="h-4 w-4 mr-1" /> Exams
          </TabsTrigger>
          <TabsTrigger value="announcements">
            <Bell className="h-4 w-4 mr-1" /> Announcements
          </TabsTrigger>
        </TabsList>

        {/* Students Tab */}
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Students ({cls.students.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cls.students.length === 0 ? (
                <div className="text-slate-500 text-sm">No students enrolled.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {cls.students.map((student) => (
                    <div key={student.id} className="flex items-center gap-3 p-3 rounded-lg border hover:shadow transition">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {student.name?.charAt(0).toUpperCase() || "S"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-slate-500">{student.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subjects Tab */}
        <TabsContent value="subjects">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Subjects ({cls.subjects.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cls.subjects.length === 0 ? (
                <div className="text-slate-500 text-sm">No subjects assigned.</div>
              ) : (
                <ul className="space-y-2">
                  {cls.subjects.map((s) => (
                    <li key={s.subject.id} className="flex items-center gap-2">
                      <Badge variant="secondary">{s.subject.name}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timetable Tab */}
        <TabsContent value="timetable">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-warning" />
                Timetable
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cls.timetable.length === 0 ? (
                <div className="text-slate-500 text-sm">No timetable data available.</div>
              ) : (
                // Group timetable entries by day for a professional look
                (() => {
                  // Group by day
                  const daysOrder = [
                    "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"
                  ]
                  const grouped: Record<string, typeof cls.timetable> = {}
                  for (const entry of cls.timetable) {
                    if (!grouped[entry.day]) grouped[entry.day] = []
                    grouped[entry.day].push(entry)
                  }
                  // Sort each day's entries by startTime
                  for (const day in grouped) {
                    grouped[day].sort((a, b) => a.startTime.localeCompare(b.startTime))
                  }
                  return (
                    <div className="space-y-6">
                      {daysOrder.filter(day => grouped[day]?.length).map(day => (
                        <div key={day}>
                          <div className="font-semibold text-primary mb-2 text-base flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {day.charAt(0) + day.slice(1).toLowerCase()}
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm border rounded-lg shadow-sm bg-white dark:bg-slate-900">
                              <thead>
                                <tr className="bg-slate-100 dark:bg-slate-800">
                                  <th className="text-left py-2 px-3">Subject</th>
                                  <th className="text-left py-2 px-3">Start</th>
                                  <th className="text-left py-2 px-3">End</th>
                                </tr>
                              </thead>
                              <tbody>
                                {grouped[day].map((entry) => (
                                  <tr key={entry.id} className="border-b last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800">
                                    <td className="py-2 px-3 font-medium">{entry.subject?.name || "-"}</td>
                                    <td className="py-2 px-3">{entry.startTime}</td>
                                    <td className="py-2 px-3">{entry.endTime}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })()
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exams Tab */}
        <TabsContent value="exams">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                Exams
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cls.exams.length === 0 ? (
                <div className="text-slate-500 text-sm">No exams scheduled.</div>
              ) : (
                <ul className="space-y-2">
                  {cls.exams.map((exam) => (
                    <li key={exam.id} className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="font-medium">{exam.title}</span>
                      <span className="text-xs text-slate-500">{exam.type}</span>
                      <span className="text-xs text-slate-400">{new Date(exam.date).toLocaleDateString()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                Recent Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cls.announcements.length === 0 ? (
                <div className="text-slate-500 text-sm">No announcements yet.</div>
              ) : (
                <ul className="space-y-2">
                  {cls.announcements.map((ann) => (
                    <li key={ann.id} className="flex items-center gap-2">
                      <Badge variant="outline">{ann.title}</Badge>
                      <span className="text-xs text-slate-400">{new Date(ann.publishDate).toLocaleDateString()}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Button asChild variant="link" className="mt-4">
                <Link href="/dashboard/announcements">
                  View All Announcements
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
