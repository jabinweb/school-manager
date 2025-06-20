import { PrismaClient, Role, ApplicationStatus, DocumentStatus, AttendanceStatus, ExamType, FeeType, PaymentStatus, AnnouncementType, DayOfWeek } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')
  console.log('📊 Preserving existing data and adding missing records...')

  // 1. Create or update Users (without deleting existing ones)
  console.log('👥 Creating/updating users...')

  // Admin Users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@school.com' },
    update: {
      name: 'John Admin',
      role: Role.ADMIN,
      password: 'password123',
      emailVerified: new Date(),
    },
    create: {
      name: 'John Admin',
      email: 'admin@school.com',
      password: 'password123',
      role: Role.ADMIN,
      emailVerified: new Date(),
    }
  })

  // Teachers
  const teachersData = [
    { name: 'Sarah Wilson', email: 'teacher@school.com' },
    { name: 'Michael Johnson', email: 'michael.johnson@school.com' },
    { name: 'Emily Davis', email: 'emily.davis@school.com' },
    { name: 'Robert Brown', email: 'robert.brown@school.com' },
    { name: 'Lisa Martinez', email: 'lisa.martinez@school.com' }
  ]

  const teachers = await Promise.all(
    teachersData.map(teacherData =>
      prisma.user.upsert({
        where: { email: teacherData.email },
        update: {
          name: teacherData.name,
          role: Role.TEACHER,
          password: 'password123',
          emailVerified: new Date(),
        },
        create: {
          name: teacherData.name,
          email: teacherData.email,
          password: 'password123',
          role: Role.TEACHER,
          emailVerified: new Date(),
        }
      })
    )
  )

  // Parents
  const parentsData = [
    { name: 'David Smith', email: 'parent@school.com' },
    { name: 'Jennifer Wilson', email: 'jennifer.wilson@school.com' },
    { name: 'Mark Johnson', email: 'mark.johnson@school.com' }
  ]

  const parents = await Promise.all(
    parentsData.map(parentData =>
      prisma.user.upsert({
        where: { email: parentData.email },
        update: {
          name: parentData.name,
          role: Role.PARENT,
          password: 'password123',
          emailVerified: new Date(),
        },
        create: {
          name: parentData.name,
          email: parentData.email,
          password: 'password123',
          role: Role.PARENT,
          emailVerified: new Date(),
        }
      })
    )
  )

  // 2. Create or update Subjects
  console.log('📚 Creating/updating subjects...')
  const subjectsData = [
    { name: 'Mathematics', code: 'MATH', description: 'Core mathematics curriculum covering algebra, geometry, and calculus', credits: 4 },
    { name: 'English Language Arts', code: 'ELA', description: 'Reading, writing, speaking, and listening skills', credits: 4 },
    { name: 'Science', code: 'SCI', description: 'General science including biology, chemistry, and physics', credits: 3 },
    { name: 'Social Studies', code: 'SS', description: 'History, geography, civics, and cultural studies', credits: 3 },
    { name: 'Physical Education', code: 'PE', description: 'Physical fitness, sports, and health education', credits: 2 },
    { name: 'Art', code: 'ART', description: 'Visual arts, creativity, and artistic expression', credits: 2 },
    { name: 'Computer Science', code: 'CS', description: 'Programming, digital literacy, and technology skills', credits: 3 }
  ]

  const subjects = await Promise.all(
    subjectsData.map(subjectData =>
      prisma.subject.upsert({
        where: { code: subjectData.code },
        update: subjectData,
        create: subjectData
      })
    )
  )

  // 3. Create or update Classes
  console.log('🏫 Creating/updating classes...')
  const classesData = [
    { name: 'Grade 9-A', section: 'A', grade: 9, capacity: 30, teacherId: teachers[0].id },
    { name: 'Grade 9-B', section: 'B', grade: 9, capacity: 28, teacherId: teachers[1].id },
    { name: 'Grade 10-A', section: 'A', grade: 10, capacity: 25, teacherId: teachers[2].id },
    { name: 'Grade 11-A', section: 'A', grade: 11, capacity: 22, teacherId: teachers[3].id },
    { name: 'Grade 12-A', section: 'A', grade: 12, capacity: 20, teacherId: teachers[4].id }
  ]

  const classes = await Promise.all(
    classesData.map(classData =>
      prisma.class.upsert({
        where: { name: classData.name },
        update: {
          section: classData.section,
          grade: classData.grade,
          capacity: classData.capacity,
          teacherId: classData.teacherId
        },
        create: classData
      })
    )
  )

  // 4. Create or update Students
  console.log('🎓 Creating/updating students...')
  const studentsData = [
    { name: 'Alex Thompson', email: 'student@school.com', classId: classes[0].id, studentNumber: 'STU001' },
    { name: 'Emma Rodriguez', email: 'emma.rodriguez@school.com', classId: classes[0].id, studentNumber: 'STU002' },
    { name: 'James Wilson', email: 'james.wilson@school.com', classId: classes[0].id, studentNumber: 'STU003' },
    { name: 'Sophia Chen', email: 'sophia.chen@school.com', classId: classes[1].id, studentNumber: 'STU004' },
    { name: 'William Garcia', email: 'william.garcia@school.com', classId: classes[1].id, studentNumber: 'STU005' },
    { name: 'Olivia Martinez', email: 'olivia.martinez@school.com', classId: classes[1].id, studentNumber: 'STU006' },
    { name: 'Benjamin Lee', email: 'benjamin.lee@school.com', classId: classes[2].id, studentNumber: 'STU007' },
    { name: 'Isabella Kim', email: 'isabella.kim@school.com', classId: classes[2].id, studentNumber: 'STU008' },
    { name: 'Lucas Anderson', email: 'lucas.anderson@school.com', classId: classes[3].id, studentNumber: 'STU009' },
    { name: 'Mia Johnson', email: 'mia.johnson@school.com', classId: classes[3].id, studentNumber: 'STU010' },
    { name: 'Ethan Brown', email: 'ethan.brown@school.com', classId: classes[4].id, studentNumber: 'STU011' },
    { name: 'Ava Davis', email: 'ava.davis@school.com', classId: classes[4].id, studentNumber: 'STU012' }
  ]

  const students = await Promise.all(
    studentsData.map(studentData =>
      prisma.user.upsert({
        where: { email: studentData.email },
        update: {
          name: studentData.name,
          role: Role.STUDENT,
          studentNumber: studentData.studentNumber,
          classId: studentData.classId,
          password: 'password123',
          emailVerified: new Date(),
        },
        create: {
          name: studentData.name,
          email: studentData.email,
          password: 'password123',
          role: Role.STUDENT,
          studentNumber: studentData.studentNumber,
          classId: studentData.classId,
          emailVerified: new Date(),
        }
      })
    )
  )

  // 5. Create Class-Subject relationships (only if they don't exist)
  console.log('🔗 Creating class-subject relationships...')
  for (const classItem of classes) {
    for (const subject of subjects) {
      await prisma.classSubject.upsert({
        where: {
          classId_subjectId: {
            classId: classItem.id,
            subjectId: subject.id
          }
        },
        update: {},
        create: {
          classId: classItem.id,
          subjectId: subject.id
        }
      })
    }
  }

  // 6. Create Teacher-Subject relationships (only if they don't exist)
  console.log('👨‍🏫 Creating teacher-subject relationships...')
  const teacherSubjects = [
    { teacherId: teachers[0].id, subjectId: subjects[0].id }, // Sarah - Math
    { teacherId: teachers[0].id, subjectId: subjects[6].id }, // Sarah - CS
    { teacherId: teachers[1].id, subjectId: subjects[1].id }, // Michael - English
    { teacherId: teachers[2].id, subjectId: subjects[2].id }, // Emily - Science
    { teacherId: teachers[3].id, subjectId: subjects[3].id }, // Robert - Social Studies
    { teacherId: teachers[4].id, subjectId: subjects[4].id }, // Lisa - PE
    { teacherId: teachers[4].id, subjectId: subjects[5].id }, // Lisa - Art
  ]

  await Promise.all(
    teacherSubjects.map(ts =>
      prisma.teacherSubject.upsert({
        where: {
          teacherId_subjectId: {
            teacherId: ts.teacherId,
            subjectId: ts.subjectId
          }
        },
        update: {},
        create: ts
      })
    )
  )

  // 7. Create Timetable Entries (only if they don't exist)
  console.log('📅 Creating timetable entries...')
  const timetableEntries = [
    { classId: classes[0].id, subjectId: subjects[0].id, day: DayOfWeek.MONDAY, startTime: '08:00', endTime: '09:00' },
    { classId: classes[0].id, subjectId: subjects[1].id, day: DayOfWeek.MONDAY, startTime: '09:00', endTime: '10:00' },
    { classId: classes[0].id, subjectId: subjects[2].id, day: DayOfWeek.TUESDAY, startTime: '08:00', endTime: '09:00' },
    { classId: classes[0].id, subjectId: subjects[3].id, day: DayOfWeek.TUESDAY, startTime: '09:00', endTime: '10:00' },
    { classId: classes[0].id, subjectId: subjects[4].id, day: DayOfWeek.WEDNESDAY, startTime: '08:00', endTime: '09:00' },
    { classId: classes[2].id, subjectId: subjects[0].id, day: DayOfWeek.MONDAY, startTime: '10:00', endTime: '11:00' },
    { classId: classes[2].id, subjectId: subjects[1].id, day: DayOfWeek.MONDAY, startTime: '11:00', endTime: '12:00' },
    { classId: classes[2].id, subjectId: subjects[2].id, day: DayOfWeek.TUESDAY, startTime: '10:00', endTime: '11:00' },
  ]

  await Promise.all(
    timetableEntries.map(entry =>
      prisma.timetableEntry.upsert({
        where: {
          classId_subjectId_day_startTime: {
            classId: entry.classId,
            subjectId: entry.subjectId,
            day: entry.day,
            startTime: entry.startTime
          }
        },
        update: {},
        create: entry
      })
    )
  )

  // 8. Create Fees (only if they don't exist)
  console.log('💰 Creating fees...')
  const feesData = [
    { title: 'Tuition Fee - Semester 1', type: FeeType.TUITION, amount: 2500.00, description: 'Regular tuition fee for first semester', dueDate: new Date('2024-03-31') },
    { title: 'Library Fee', type: FeeType.LIBRARY, amount: 150.00, description: 'Annual library access and book rental', dueDate: new Date('2024-04-15') },
    { title: 'Sports Equipment Fee', type: FeeType.SPORTS, amount: 200.00, description: 'Sports equipment and facility maintenance', dueDate: new Date('2024-05-01') },
    { title: 'Transportation Fee', type: FeeType.TRANSPORT, amount: 300.00, description: 'School bus transportation service', dueDate: new Date('2024-04-30') }
  ]

  const fees = await Promise.all(
    feesData.map(feeData =>
      prisma.fee.upsert({
        where: { title: feeData.title },
        update: feeData,
        create: feeData
      })
    )
  )

  // 9. Create Announcements (only if they don't exist)
  console.log('📢 Creating announcements...')
  const announcementsData = [
    {
      title: 'Welcome Back to School!',
      content: 'We are excited to welcome all students back for the new academic year. Please review the updated safety protocols and schedule.',
      type: AnnouncementType.GENERAL,
      priority: 5,
      isActive: true,
      publishDate: new Date(),
      expiryDate: new Date('2024-12-31')
    },
    {
      title: 'Midterm Examination Schedule',
      content: 'Midterm examinations will be conducted from March 15-22. Please check your individual timetables and prepare accordingly.',
      type: AnnouncementType.ACADEMIC,
      priority: 4,
      isActive: true,
      publishDate: new Date(),
      expiryDate: new Date('2024-03-25'),
      classId: classes[0].id
    },
    {
      title: 'Science Fair 2024',
      content: 'Annual Science Fair will be held on April 20th. All Grade 9-11 students are encouraged to participate. Registration deadline: April 1st.',
      type: AnnouncementType.EVENT,
      priority: 3,
      isActive: true,
      publishDate: new Date(),
      expiryDate: new Date('2024-04-21')
    },
    {
      title: 'Emergency Drill Tomorrow',
      content: 'There will be a fire drill tomorrow at 10:30 AM. Please follow your teachers\' instructions and evacuation procedures.',
      type: AnnouncementType.URGENT,
      priority: 5,
      isActive: true,
      publishDate: new Date(),
      expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  ]

  const announcements = await Promise.all(
    announcementsData.map(announcementData =>
      prisma.announcement.upsert({
        where: { title: announcementData.title },
        update: announcementData,
        create: announcementData
      })
    )
  )

  // 10. Ensure sample admission applications exist
  console.log('📋 Creating sample admission applications...')
  const admissionAppsData = [
    {
      applicationId: 'APP-2024-001234',
      studentFirstName: 'John',
      studentLastName: 'Smith',
      studentDateOfBirth: new Date('2010-05-15'),
      studentGender: 'male',
      studentGrade: 'grade-8',
      parentFirstName: 'Robert',
      parentLastName: 'Smith',
      parentEmail: 'robert.smith@email.com',
      parentPhone: '+1-555-0123',
      parentAddress: '123 Main Street, Anytown, ST 12345',
      parentOccupation: 'Engineer',
      previousSchool: 'Riverside Elementary',
      previousGrade: 'grade-7',
      reasonForTransfer: 'Moving to new area',
      extracurriculars: 'Soccer, Chess Club',
      medicalConditions: 'None',
      specialNeeds: 'None',
      status: ApplicationStatus.INTERVIEW_SCHEDULED
    },
    {
      applicationId: 'APP-2024-001235',
      studentFirstName: 'Emily',
      studentLastName: 'Johnson',
      studentDateOfBirth: new Date('2009-08-22'),
      studentGender: 'female',
      studentGrade: 'grade-9',
      parentFirstName: 'Sarah',
      parentLastName: 'Johnson',
      parentEmail: 'sarah.johnson@email.com',
      parentPhone: '+1-555-0124',
      parentAddress: '456 Oak Avenue, Somewhere, ST 12346',
      parentOccupation: 'Teacher',
      previousSchool: 'Westfield Middle School',
      previousGrade: 'grade-8',
      reasonForTransfer: 'Seeking better academic opportunities',
      extracurriculars: 'Drama Club, Debate Team',
      medicalConditions: 'Mild asthma',
      specialNeeds: 'None',
      status: ApplicationStatus.ACCEPTED
    },
    {
      applicationId: 'APP-2024-001236',
      studentFirstName: 'Michael',
      studentLastName: 'Davis',
      studentDateOfBirth: new Date('2011-03-10'),
      studentGender: 'male',
      studentGrade: 'grade-7',
      parentFirstName: 'Jennifer',
      parentLastName: 'Davis',
      parentEmail: 'jennifer.davis@email.com',
      parentPhone: '+1-555-0125',
      parentAddress: '789 Pine Street, Elsewhere, ST 12347',
      parentOccupation: 'Nurse',
      previousSchool: 'Homeschooled',
      previousGrade: 'grade-6',
      reasonForTransfer: 'Transitioning from homeschool',
      extracurriculars: 'Basketball, Art',
      medicalConditions: 'None',
      specialNeeds: 'None',
      status: ApplicationStatus.UNDER_REVIEW
    }
  ]

  const admissionApplications = await Promise.all(
    admissionAppsData.map(appData =>
      prisma.admissionApplication.upsert({
        where: { applicationId: appData.applicationId },
        update: appData,
        create: appData
      })
    )
  )

  // 11. Create timeline entries for admission applications
  console.log('📈 Creating application timelines...')
  for (const app of admissionApplications) {
    const timelineData = [
      {
        applicationId: app.id,
        status: 'Application Submitted',
        description: 'Application received and logged in system',
        completed: true,
      },
      {
        applicationId: app.id,
        status: 'Documents Review',
        description: 'Initial document verification completed',
        completed: true,
      }
    ]

    if (app.status === ApplicationStatus.INTERVIEW_SCHEDULED || app.status === ApplicationStatus.ACCEPTED) {
      timelineData.push({
        applicationId: app.id,
        status: 'Interview Scheduled',
        description: 'Interview scheduled with student and parents',
        completed: true,
      })
    }

    if (app.status === ApplicationStatus.ACCEPTED) {
      timelineData.push({
        applicationId: app.id,
        status: 'Application Accepted',
        description: 'Congratulations! Your application has been accepted',
        completed: true,
      })
    }

    // Only create timeline entries that don't already exist
    for (const timeline of timelineData) {
      const existingTimeline = await prisma.applicationTimeline.findFirst({
        where: {
          applicationId: timeline.applicationId,
          status: timeline.status
        }
      })

      if (!existingTimeline) {
        await prisma.applicationTimeline.create({
          data: timeline
        })
      }
    }
  }

  // 12. Create sample documents for applications
  console.log('📄 Creating application documents...')
  for (const app of admissionApplications) {
    const documents = [
      {
        applicationId: app.id,
        documentType: 'Birth Certificate',
        fileName: 'birth_certificate.pdf',
        fileUrl: '/documents/birth_certificate.pdf',
        status: DocumentStatus.APPROVED
      },
      {
        applicationId: app.id,
        documentType: 'Academic Transcripts',
        fileName: 'transcripts.pdf',
        fileUrl: '/documents/transcripts.pdf',
        status: DocumentStatus.APPROVED
      },
      {
        applicationId: app.id,
        documentType: 'Medical Records',
        fileName: 'medical_records.pdf',
        fileUrl: '/documents/medical_records.pdf',
        status: app.applicationId === 'APP-2024-001236' ? DocumentStatus.PENDING : DocumentStatus.APPROVED
      }
    ]

    for (const doc of documents) {
      const existingDoc = await prisma.applicationDocument.findFirst({
        where: {
          applicationId: doc.applicationId,
          documentType: doc.documentType
        }
      })

      if (!existingDoc) {
        await prisma.applicationDocument.create({
          data: doc
        })
      }
    }
  }

  // 13. Create some exams and results
  console.log('📝 Creating exams and results...')
  const examsData = [
    {
      title: 'Mathematics Midterm',
      description: 'Algebra and Geometry assessment',
      type: ExamType.MIDTERM,
      classId: classes[0].id,
      subjectId: subjects[0].id,
      date: new Date('2024-03-15'),
      duration: 120,
      totalMarks: 100,
      passMarks: 40
    },
    {
      title: 'English Literature Quiz',
      description: 'Poetry and prose comprehension',
      type: ExamType.QUIZ,
      classId: classes[0].id,
      subjectId: subjects[1].id,
      date: new Date('2024-03-20'),
      duration: 60,
      totalMarks: 50,
      passMarks: 20
    }
  ]

  const exams = await Promise.all(
    examsData.map(examData =>
      prisma.exam.upsert({
        where: {
          title_classId_subjectId: {
            title: examData.title,
            classId: examData.classId,
            subjectId: examData.subjectId
          }
        },
        update: examData,
        create: examData
      })
    )
  )

  // 14. Create sample fee payments
  console.log('💳 Creating sample fee payments...')
  for (const fee of fees) {
    // Create payments for some students
    const payingStudents = students.slice(0, Math.floor(students.length * 0.7))
    for (const student of payingStudents) {
      await prisma.feePayment.upsert({
        where: {
          feeId_studentId: {
            feeId: fee.id,
            studentId: student.id
          }
        },
        update: {},
        create: {
          feeId: fee.id,
          studentId: student.id,
          amountPaid: fee.amount,
          paymentDate: new Date(),
          paymentMethod: Math.random() > 0.5 ? 'Credit Card' : 'Bank Transfer',
          status: PaymentStatus.PAID,
          transactionId: `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        }
      })
    }

    // Create pending payments for remaining students
    const pendingStudents = students.slice(Math.floor(students.length * 0.7))
    for (const student of pendingStudents) {
      await prisma.feePayment.upsert({
        where: {
          feeId_studentId: {
            feeId: fee.id,
            studentId: student.id
          }
        },
        update: {},
        create: {
          feeId: fee.id,
          studentId: student.id,
          amountPaid: 0,
          status: PaymentStatus.PENDING
        }
      })
    }
  }

  console.log('✅ Database seeding completed successfully!')
  
  // Log summary
  const counts = await Promise.all([
    prisma.user.count(),
    prisma.class.count(),
    prisma.subject.count(),
    prisma.announcement.count(),
    prisma.admissionApplication.count(),
    prisma.fee.count()
  ])

  console.log('\n📊 DATABASE SUMMARY:')
  console.log(`👤 Total Users: ${counts[0]}`)
  console.log(`🏫 Classes: ${counts[1]}`)
  console.log(`📚 Subjects: ${counts[2]}`)
  console.log(`📢 Announcements: ${counts[3]}`)
  console.log(`📋 Admission Applications: ${counts[4]}`)
  console.log(`💰 Fees: ${counts[5]}`)
  console.log('\n✨ All demo accounts available:')
  console.log('   📧 admin@school.com (password: password123)')
  console.log('   📧 teacher@school.com (password: password123)')
  console.log('   📧 student@school.com (password: password123)')
  console.log('   📧 parent@school.com (password: password123)')
  console.log('\n🎉 Ready to start using the school management system!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
    prisma.admissionApplication.create({
      data: {
        applicationId: 'APP-2024-001236',
        studentFirstName: 'Michael',
        studentLastName: 'Davis',
        studentDateOfBirth: new Date('2011-03-10'),
        studentGender: 'male',
        studentGrade: 'grade-7',
        parentFirstName: 'Jennifer',
        parentLastName: 'Davis',
        parentEmail: 'jennifer.davis@email.com',
        parentPhone: '+1-555-0125',
        parentAddress: '789 Pine Street, Elsewhere, ST 12347',
        parentOccupation: 'Nurse',
        previousSchool: 'Homeschooled',
        previousGrade: 'grade-6',
        reasonForTransfer: 'Transitioning from homeschool',
        extracurriculars: 'Basketball, Art',
        medicalConditions: 'None',
        specialNeeds: 'None',
        status: ApplicationStatus.UNDER_REVIEW
      }
    })
  ])

  // 16. Create Application Timeline
  console.log('📈 Creating application timelines...')
  for (const app of admissionApplications) {
    const timelineData = [
      {
        applicationId: app.id,
        status: 'Application Submitted',
        description: 'Application received and logged in system',
        completed: true,
        createdAt: app.submittedAt
      },
      {
        applicationId: app.id,
        status: 'Documents Review',
        description: 'Initial document verification completed',
        completed: true,
        createdAt: new Date(app.submittedAt.getTime() + 2 * 24 * 60 * 60 * 1000) // 2 days later
      }
    ]

    if (app.status === ApplicationStatus.INTERVIEW_SCHEDULED || app.status === ApplicationStatus.ACCEPTED) {
      timelineData.push({
        applicationId: app.id,
        status: 'Interview Scheduled',
        description: 'Interview scheduled with student and parents',
        completed: true,
        createdAt: new Date(app.submittedAt.getTime() + 5 * 24 * 60 * 60 * 1000) // 5 days later
      })
    }

    if (app.status === ApplicationStatus.ACCEPTED) {
      timelineData.push({
        applicationId: app.id,
        status: 'Application Accepted',
        description: 'Congratulations! Your application has been accepted',
        completed: true,
        createdAt: new Date(app.submittedAt.getTime() + 10 * 24 * 60 * 60 * 1000) // 10 days later
      })
    }

    await Promise.all(
      timelineData.map(timeline =>
        prisma.applicationTimeline.create({ data: timeline })
      )
    )
  }

  // 17. Create Application Documents
  console.log('📄 Creating application documents...')
  for (const app of admissionApplications) {
    const documents = [
      {
        applicationId: app.id,
        documentType: 'Birth Certificate',
        fileName: 'birth_certificate.pdf',
        fileUrl: '/documents/birth_certificate.pdf',
        status: DocumentStatus.APPROVED
      },
      {
        applicationId: app.id,
        documentType: 'Academic Transcripts',
        fileName: 'transcripts.pdf',
        fileUrl: '/documents/transcripts.pdf',
        status: DocumentStatus.APPROVED
      },
      {
        applicationId: app.id,
        documentType: 'Medical Records',
        fileName: 'medical_records.pdf',
        fileUrl: '/documents/medical_records.pdf',
        status: app.id === admissionApplications[2].id ? DocumentStatus.PENDING : DocumentStatus.APPROVED
      }
    ]

    await Promise.all(
      documents.map(doc =>
        prisma.applicationDocument.create({ data: doc })
      )
    )
  }

  console.log('✅ Database seeding completed successfully!')
  
  // Log summary
  console.log('\n📊 SEEDING SUMMARY:')
  console.log(`👤 Users: ${1 + teachers.length + parents.length + students.length}`)
  console.log(`🏫 Classes: ${classes.length}`)
  console.log(`📚 Subjects: ${subjects.length}`)
  console.log(`📝 Exams: ${exams.length}`)
  console.log(`💰 Fees: ${fees.length}`)
  console.log(`📢 Announcements: ${announcements.length}`)
  console.log(`📋 Admission Applications: ${admissionApplications.length}`)
  console.log('\n🎉 Ready to start using the school management system!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
