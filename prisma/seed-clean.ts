import { PrismaClient, Role, ApplicationStatus, DocumentStatus, FeeType, PaymentStatus, AnnouncementType, DayOfWeek } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // 1. Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@school.com' },
    update: {},
    create: {
      name: 'John Admin',
      email: 'admin@school.com',
      password: 'password123',
      role: Role.ADMIN,
      emailVerified: new Date(),
    }
  })

  // 2. Create Teachers
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@school.com' },
    update: {},
    create: {
      name: 'Sarah Wilson',
      email: 'teacher@school.com',
      password: 'password123',
      role: Role.TEACHER,
      emailVerified: new Date(),
    }
  })

  // 3. Create Parent
  const parent = await prisma.user.upsert({
    where: { email: 'parent@school.com' },
    update: {},
    create: {
      name: 'David Smith',
      email: 'parent@school.com',
      password: 'password123',
      role: Role.PARENT,
      emailVerified: new Date(),
    }
  })

  // 4. Create Subjects
  const mathSubject = await prisma.subject.upsert({
    where: { code: 'MATH' },
    update: {},
    create: {
      name: 'Mathematics',
      code: 'MATH',
      description: 'Core mathematics curriculum',
      credits: 4
    }
  })

  const englishSubject = await prisma.subject.upsert({
    where: { code: 'ELA' },
    update: {},
    create: {
      name: 'English Language Arts',
      code: 'ELA',
      description: 'Reading, writing, speaking, and listening skills',
      credits: 4
    }
  })

  // 5. Create Class
  const grade9A = await prisma.class.upsert({
    where: { name: 'Grade 9-A' },
    update: {},
    create: {
      name: 'Grade 9-A',
      section: 'A',
      grade: 9,
      capacity: 30,
      teacherId: teacher.id
    }
  })

  // 6. Create Student
  const student = await prisma.user.upsert({
    where: { email: 'student@school.com' },
    update: {},
    create: {
      name: 'Alex Thompson',
      email: 'student@school.com',
      password: 'password123',
      role: Role.STUDENT,
      studentNumber: 'STU001',
      classId: grade9A.id,
      emailVerified: new Date(),
    }
  })

  // 7. Create Sample Admission Application
  const application = await prisma.admissionApplication.upsert({
    where: { applicationId: 'APP-2024-001234' },
    update: {},
    create: {
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
      status: ApplicationStatus.PENDING
    }
  })

  // 8. Create Timeline for Application - Fixed approach
  const existingTimeline = await prisma.applicationTimeline.findFirst({
    where: {
      applicationId: application.id,
      status: 'Application Submitted'
    }
  })

  if (!existingTimeline) {
    await prisma.applicationTimeline.create({
      data: {
        applicationId: application.id,
        status: 'Application Submitted',
        description: 'Application received and logged in system',
        completed: true
      }
    })
  }

  // 9. Create Fee - Fixed to use findFirst instead of upsert
  let tuitionFee = await prisma.fee.findFirst({
    where: { title: 'Tuition Fee - Semester 1' }
  })

  if (!tuitionFee) {
    tuitionFee = await prisma.fee.create({
      data: {
        title: 'Tuition Fee - Semester 1',
        type: FeeType.TUITION,
        amount: 2500.00,
        description: 'Regular tuition fee for first semester',
        dueDate: new Date('2024-03-31')
      }
    })
  }

  // 10. Create Announcement - Fixed to use findFirst instead of upsert
  const existingAnnouncement = await prisma.announcement.findFirst({
    where: { title: 'Welcome Back to School!' }
  })

  if (!existingAnnouncement) {
    await prisma.announcement.create({
      data: {
        title: 'Welcome Back to School!',
        content: 'We are excited to welcome all students back for the new academic year.',
        type: AnnouncementType.GENERAL,
        priority: 5,
        isActive: true,
        publishDate: new Date()
      }
    })
  }

  // 11. Create Class-Subject relationship
  const existingClassSubject = await prisma.classSubject.findFirst({
    where: {
      classId: grade9A.id,
      subjectId: mathSubject.id
    }
  })

  if (!existingClassSubject) {
    await prisma.classSubject.create({
      data: {
        classId: grade9A.id,
        subjectId: mathSubject.id
      }
    })
  }

  // 12. Create Teacher-Subject relationship
  const existingTeacherSubject = await prisma.teacherSubject.findFirst({
    where: {
      teacherId: teacher.id,
      subjectId: mathSubject.id
    }
  })

  if (!existingTeacherSubject) {
    await prisma.teacherSubject.create({
      data: {
        teacherId: teacher.id,
        subjectId: mathSubject.id
      }
    })
  }

  // 13. Create Sample Fee Payment
  const existingPayment = await prisma.feePayment.findFirst({
    where: {
      feeId: tuitionFee.id,
      studentId: student.id
    }
  })

  if (!existingPayment) {
    await prisma.feePayment.create({
      data: {
        feeId: tuitionFee.id,
        studentId: student.id,
        amountPaid: tuitionFee.amount,
        paymentDate: new Date(),
        paymentMethod: 'Credit Card',
        status: PaymentStatus.PAID,
        transactionId: `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      }
    })
  }

  // 14. Create Sample Documents for Application
  const documents = [
    {
      documentType: 'Birth Certificate',
      fileName: 'birth_certificate.pdf',
      fileUrl: '/documents/birth_certificate.pdf',
      status: DocumentStatus.APPROVED
    },
    {
      documentType: 'Academic Transcripts',
      fileName: 'transcripts.pdf',
      fileUrl: '/documents/transcripts.pdf',
      status: DocumentStatus.APPROVED
    },
    {
      documentType: 'Medical Records',
      fileName: 'medical_records.pdf',
      fileUrl: '/documents/medical_records.pdf',
      status: DocumentStatus.PENDING
    }
  ]

  for (const doc of documents) {
    const existingDoc = await prisma.applicationDocument.findFirst({
      where: {
        applicationId: application.id,
        documentType: doc.documentType
      }
    })

    if (!existingDoc) {
      await prisma.applicationDocument.create({
        data: {
          applicationId: application.id,
          ...doc
        }
      })
    }
  }

  // 15. Create additional sample data for more comprehensive testing
  
  // Create a second admission application with different status
  const application2 = await prisma.admissionApplication.upsert({
    where: { applicationId: 'APP-2024-001235' },
    update: {},
    create: {
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
      status: ApplicationStatus.ACCEPTED
    }
  })

  // Create timeline for second application
  const existingTimeline2 = await prisma.applicationTimeline.findFirst({
    where: {
      applicationId: application2.id,
      status: 'Application Accepted'
    }
  })

  if (!existingTimeline2) {
    await prisma.applicationTimeline.create({
      data: {
        applicationId: application2.id,
        status: 'Application Accepted',
        description: 'Congratulations! Your application has been accepted',
        completed: true
      }
    })
  }

  // 16. Create Sample Expenses
  const sampleExpenses = [
    {
      title: 'Teacher Salaries - January',
      description: 'Monthly salary payments for all teaching staff',
      category: 'SALARIES' as const,
      amount: 45000,
      status: 'PAID' as const,
      paymentDate: new Date('2024-01-31'),
      paymentMethod: 'Bank Transfer',
      fiscalYear: 2024,
      fiscalMonth: 1
    },
    {
      title: 'Electricity Bill - January',
      description: 'Monthly electricity charges for school premises',
      category: 'UTILITIES' as const,
      amount: 3500,
      status: 'PAID' as const,
      paymentDate: new Date('2024-01-15'),
      paymentMethod: 'Online Payment',
      vendorName: 'City Electric Company',
      fiscalYear: 2024,
      fiscalMonth: 1
    },
    {
      title: 'Classroom Supplies',
      description: 'Stationery, books, and educational materials',
      category: 'SUPPLIES' as const,
      amount: 2800,
      status: 'APPROVED' as const,
      vendorName: 'Educational Supplies Co.',
      invoiceNumber: 'INV-2024-001',
      fiscalYear: 2024,
      fiscalMonth: 2
    },
    {
      title: 'Computer Lab Equipment',
      description: 'New computers and software licenses',
      category: 'TECHNOLOGY' as const,
      amount: 15000,
      status: 'PENDING' as const,
      vendorName: 'Tech Solutions Ltd.',
      fiscalYear: 2024,
      fiscalMonth: 2
    },
    {
      title: 'Building Maintenance',
      description: 'Roof repair and painting work',
      category: 'MAINTENANCE' as const,
      amount: 8500,
      status: 'APPROVED' as const,
      vendorName: 'City Contractors',
      fiscalYear: 2024,
      fiscalMonth: 1
    }
  ]

  for (const expense of sampleExpenses) {
    const existingExpense = await prisma.expense.findFirst({
      where: {
        title: expense.title,
        fiscalYear: expense.fiscalYear,
        fiscalMonth: expense.fiscalMonth
      }
    })

    if (!existingExpense) {
      await prisma.expense.create({
        data: expense
      })
    }
  }

  console.log('✅ Database seeding completed successfully!')
  console.log('\n📊 Demo accounts created:')
  console.log('   📧 admin@school.com (password: password123)')
  console.log('   📧 teacher@school.com (password: password123)')
  console.log('   📧 student@school.com (password: password123)')
  console.log('   📧 parent@school.com (password: password123)')
  console.log('\n🎉 You can test application tracking with:')
  console.log('   📋 APP-2024-001234 (Pending status)')
  console.log('   📋 APP-2024-001235 (Accepted status)')
  console.log('\n💰 Sample expenses created for financial reporting')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
