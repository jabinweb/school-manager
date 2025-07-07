import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Calendar } from "lucide-react"
import Link from "next/link"

export default async function TeacherClassesPage() {
  const session = await auth()
  if (!session) redirect("/auth/signin")
  if (session.user?.role !== "TEACHER") redirect("/dashboard")

  // Fetch classes taught by this teacher from the database
  const teacherId = session.user.id
  const classes = await prisma.class.findMany({
    where: { teacherId },
    include: {
      subjects: {
        include: { subject: true },
      },
      students: true,
      timetable: {
        include: { subject: true },
        orderBy: { day: "asc" },
      },
    },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <Card key={cls.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">{cls.name}</CardTitle>
              <BookOpen className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>Subjects:</strong>{" "}
                  {cls.subjects.map((s) => s.subject.name).join(", ") || "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-4 w-4 text-accent" />
                <span className="text-sm">{cls.students.length} students</span>
              </div>
              <Link
                href={`/dashboard/classes/${cls.id}`}
                className="mt-2 inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
              >
                <Calendar className="h-4 w-4" />
                View Class
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
