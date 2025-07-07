import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, BookOpen, Award } from "lucide-react"
import Link from "next/link"

export default async function TeacherGradesPage() {
  const session = await auth()
  if (!session) redirect("/auth/signin")
  if (session.user?.role !== "TEACHER") redirect("/dashboard")

  // Fetch classes taught by this teacher
  const teacherId = session.user.id
  const classes = await prisma.class.findMany({
    where: { teacherId },
    include: {
      subjects: { include: { subject: true } },
      students: true,
      exams: {
        include: {
          results: {
            include: { student: true }
          }
        }
      }
    }
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Award className="h-6 w-6 text-primary" />
        Grade Assignments & Exams
      </h1>
      <Tabs defaultValue={classes[0]?.id || ""} className="mb-8">
        <TabsList>
          {classes.map((cls) => (
            <TabsTrigger key={cls.id} value={cls.id}>
              <BookOpen className="h-4 w-4 mr-1" />
              {cls.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {classes.map((cls) => (
          <TabsContent key={cls.id} value={cls.id}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Assignments & Exams for {cls.name}
                </CardTitle>
                <CardDescription>
                  {cls.subjects.map((s) => s.subject.name).join(", ")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cls.exams.length === 0 ? (
                  <div className="text-slate-500 text-sm">No assignments or exams scheduled.</div>
                ) : (
                  <div className="space-y-6">
                    {cls.exams.map((exam) => (
                      <div key={exam.id} className="border rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{exam.type}</Badge>
                          <span className="font-semibold">{exam.title}</span>
                          <span className="text-xs text-slate-500">{new Date(exam.date).toLocaleDateString()}</span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs border">
                            <thead>
                              <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="text-left py-1 px-2">Student</th>
                                <th className="text-left py-1 px-2">Marks</th>
                                <th className="text-left py-1 px-2">Grade</th>
                                <th className="text-left py-1 px-2">Remarks</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cls.students.map((student) => {
                                const result = exam.results.find((r) => r.studentId === student.id)
                                return (
                                  <tr key={student.id} className="border-b last:border-b-0">
                                    <td className="py-1 px-2">{student.name}</td>
                                    <td className="py-1 px-2">{result?.marksObtained ?? "-"}</td>
                                    <td className="py-1 px-2">{result?.grade ?? "-"}</td>
                                    <td className="py-1 px-2">{result?.remarks ?? "-"}</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                        <Button asChild variant="link" className="mt-2">
                          <Link href={`/dashboard/grades/${exam.id}`}>
                            Grade / Edit
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
