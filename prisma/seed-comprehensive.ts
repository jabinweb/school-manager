import { PrismaClient, Role, PerformanceStatus, PayrollStatus } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

// Teaching subjects and their specializations
const teachingSubjects = [
  { 
    name: 'Mathematics', 
    code: 'MATH', 
    description: 'Core mathematics curriculum including algebra, geometry, and calculus',
    specializations: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Advanced Mathematics'],
    qualifications: ['M.Ed in Mathematics', 'M.Sc in Mathematics', 'Ph.D in Mathematics', 'B.Ed with Mathematics Major']
  },
  { 
    name: 'English Language Arts', 
    code: 'ELA', 
    description: 'Reading, writing, speaking, and listening skills development',
    specializations: ['Literature', 'Creative Writing', 'Grammar & Composition', 'Public Speaking', 'ESL'],
    qualifications: ['M.A in English Literature', 'M.Ed in English', 'Ph.D in English', 'B.A in English with Teaching Certificate']
  },
  { 
    name: 'Science', 
    code: 'SCI', 
    description: 'General science including physics, chemistry, and biology',
    specializations: ['Physics', 'Chemistry', 'Biology', 'Environmental Science', 'Laboratory Sciences'],
    qualifications: ['M.Sc in Physics', 'M.Sc in Chemistry', 'M.Sc in Biology', 'B.Sc with Teaching Diploma']
  },
  { 
    name: 'History', 
    code: 'HIST', 
    description: 'World and national history studies',
    specializations: ['World History', 'Ancient Civilizations', 'Modern History', 'Social Studies', 'Geography'],
    qualifications: ['M.A in History', 'M.Ed in Social Studies', 'Ph.D in History', 'B.A in History with Education']
  },
  { 
    name: 'Arts', 
    code: 'ART', 
    description: 'Visual and performing arts education',
    specializations: ['Visual Arts', 'Music', 'Drama', 'Digital Arts', 'Art History'],
    qualifications: ['M.F.A in Fine Arts', 'B.F.A with Teaching Certificate', 'M.Ed in Arts Education', 'B.A in Arts']
  }
]

function generateTeacherData(subject: typeof teachingSubjects[0]) {
  const gender = faker.person.sexType()
  const firstName = faker.person.firstName(gender)
  const lastName = faker.person.lastName()
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@school.com`
  
  // Generate experience (1-25 years)
  const experience = faker.number.int({ min: 1, max: 25 })
  
  // Calculate salary based on experience (base: 4000, increases with experience)
  const baseSalary = 4000 + (experience * 150) + faker.number.int({ min: -500, max: 1000 })
  
  // Generate joining date based on experience
  const joiningDate = new Date()
  joiningDate.setFullYear(joiningDate.getFullYear() - experience)
  joiningDate.setMonth(faker.number.int({ min: 0, max: 11 }))
  joiningDate.setDate(faker.number.int({ min: 1, max: 28 }))
  
  return {
    name: `${firstName} ${lastName}`,
    email,
    password: 'password123',
    role: Role.TEACHER,
    emailVerified: new Date(),
    qualification: faker.helpers.arrayElement(subject.qualifications),
    specialization: faker.helpers.arrayElement(subject.specializations),
    experience,
    dateOfJoining: joiningDate,
    salary: Math.round(baseSalary),
    emergencyContact: faker.phone.number(),
    bio: `${faker.helpers.arrayElement([
      'Passionate',
      'Dedicated',
      'Experienced',
      'Innovative',
      'Enthusiastic'
    ])} ${subject.name.toLowerCase()} teacher with ${experience} years of experience in ${faker.helpers.arrayElement(subject.specializations).toLowerCase()}. ${faker.helpers.arrayElement([
      'Committed to student success and academic excellence.',
      'Focuses on interactive learning and student engagement.',
      'Believes in fostering critical thinking and creativity.',
      'Dedicated to creating inclusive learning environments.',
      'Strives to inspire lifelong learning in students.'
    ])}`,
    phone: faker.phone.number(),
    address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state({ abbreviated: true })} ${faker.location.zipCode()}`,
    dateOfBirth: faker.date.birthdate({ min: 25, max: 65, mode: 'age' }),
    gender: gender === 'male' ? 'male' : 'female'
  }
}

async function main() {
  console.log('🌱 Starting comprehensive database seeding with enhanced teacher data...')

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

  console.log('✅ Admin user created/updated')

  // 2. Create Subjects first
  console.log('📚 Creating subjects...')
  const subjects = await Promise.all(
    teachingSubjects.map(subjectData =>
      prisma.subject.upsert({
        where: { code: subjectData.code },
        update: {},
        create: {
          name: subjectData.name,
          code: subjectData.code,
          description: subjectData.description,
          credits: faker.number.int({ min: 2, max: 4 })
        }
      })
    )
  )

  console.log(`📚 Created ${subjects.length} subjects`)

  // 3. Update existing teachers and generate additional ones using Faker.js
  console.log('👨‍🏫 Updating existing teachers and generating new ones with Faker.js...')
  const teachers = []
  
  // First, update the main demo teacher with enhanced data
  const mainTeacher = await prisma.user.upsert({
    where: { email: 'teacher@school.com' },
    update: {
      qualification: 'M.Ed in Mathematics',
      specialization: 'Advanced Mathematics',
      experience: 8,
      dateOfJoining: new Date('2020-08-15'),
      salary: 5500.00,
      emergencyContact: '+1-555-0101',
      bio: 'Passionate mathematics teacher with 8 years of experience in advanced mathematics. Committed to student success and academic excellence.',
      phone: '+1-555-0101',
      address: '123 Teacher Lane, Education City, EC 12345',
      dateOfBirth: new Date('1985-03-15'),
      gender: 'female'
    },
    create: {
      name: 'Sarah Wilson',
      email: 'teacher@school.com',
      password: 'password123',
      role: Role.TEACHER,
      emailVerified: new Date(),
      qualification: 'M.Ed in Mathematics',
      specialization: 'Advanced Mathematics',
      experience: 8,
      dateOfJoining: new Date('2020-08-15'),
      salary: 5500.00,
      emergencyContact: '+1-555-0101',
      bio: 'Passionate mathematics teacher with 8 years of experience in advanced mathematics. Committed to student success and academic excellence.',
      phone: '+1-555-0101',
      address: '123 Teacher Lane, Education City, EC 12345',
      dateOfBirth: new Date('1985-03-15'),
      gender: 'female'
    }
  })
  teachers.push(mainTeacher)
  console.log(`   ✅ Updated/Created main teacher: ${mainTeacher.name}`)

  // Update existing Jane Smith and Mike Johnson if they exist, otherwise create them
  const existingTeachers = [
    { 
      email: 'jane.smith@school.com',
      name: 'Jane Smith',
      updates: {
        qualification: 'M.A in English Literature',
        specialization: 'Creative Writing',
        experience: 12,
        salary: 6000.00,
        bio: 'Senior English teacher with extensive experience in literature and creative writing. Dedicated to fostering critical thinking and creativity.',
        phone: faker.phone.number(),
        address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state({ abbreviated: true })} ${faker.location.zipCode()}`,
        dateOfBirth: faker.date.birthdate({ min: 35, max: 45, mode: 'age' }),
        gender: 'female'
      }
    },
    { 
      email: 'mike.johnson@school.com',
      name: 'Mike Johnson',
      updates: {
        qualification: 'M.Sc in Physics',
        specialization: 'Laboratory Sciences',
        experience: 6,
        salary: 5200.00,
        bio: 'Physics and chemistry teacher with hands-on lab experience. Believes in fostering scientific curiosity and practical learning.',
        phone: faker.phone.number(),
        address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state({ abbreviated: true })} ${faker.location.zipCode()}`,
        dateOfBirth: faker.date.birthdate({ min: 28, max: 38, mode: 'age' }),
        gender: 'male'
      }
    }
  ]

  for (const existingTeacher of existingTeachers) {
    const teacher = await prisma.user.upsert({
      where: { email: existingTeacher.email },
      update: existingTeacher.updates,
      create: {
        name: existingTeacher.name,
        email: existingTeacher.email,
        password: 'password123',
        role: Role.TEACHER,
        emailVerified: new Date(),
        ...existingTeacher.updates
      }
    })
    teachers.push(teacher)
    console.log(`   ✅ Updated/Created existing teacher: ${teacher.name}`)
  }

  // Generate additional teachers using Faker (1-2 teachers per subject)
  for (const subject of teachingSubjects) {
    const teachersPerSubject = faker.number.int({ min: 1, max: 2 })
    
    for (let i = 0; i < teachersPerSubject; i++) {
      const teacherData = generateTeacherData(subject)
      
      try {
        const existingTeacher = await prisma.user.findUnique({
          where: { email: teacherData.email }
        })

        if (!existingTeacher) {
          const teacher = await prisma.user.create({
            data: teacherData
          })
          teachers.push(teacher)
          console.log(`   ✅ Created new teacher: ${teacher.name} (${subject.name})`)
        }
      } catch {
        // Skip if email already exists
        console.log(`   ⚠️  Skipped duplicate teacher for ${subject.name}`)
      }
    }
  }

  console.log(`📊 Total teachers: ${teachers.length}`)

  // 4. Create Parent
  await prisma.user.upsert({
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

  console.log('✅ Parent user created/updated')

  // 5. Create Classes and assign teachers
  console.log('🏫 Creating classes...')
  const classes = []
  
  const classData = [
    { name: 'Grade 9-A', section: 'A', grade: 9, capacity: 30 },
    { name: 'Grade 9-B', section: 'B', grade: 9, capacity: 28 },
    { name: 'Grade 10-A', section: 'A', grade: 10, capacity: 32 },
    { name: 'Grade 10-B', section: 'B', grade: 10, capacity: 30 },
    { name: 'Grade 11-A', section: 'A', grade: 11, capacity: 25 }
  ]

  for (let i = 0; i < classData.length; i++) {
    const cls = classData[i]
    const teacherId = teachers[i] ? teachers[i].id : teachers[0].id // Fallback to first teacher

    const createdClass = await prisma.class.upsert({
      where: { name: cls.name },
      update: { teacherId },
      create: {
        ...cls,
        teacherId
      }
    })
    classes.push(createdClass)
  }

  console.log(`🏫 Created ${classes.length} classes`)

  // 6. Create Students using Faker
  console.log('👨‍🎓 Generating students...')
  const students = []
  
  // Create main demo student
  const mainStudent = await prisma.user.upsert({
    where: { email: 'student@school.com' },
    update: {},
    create: {
      name: 'Alex Thompson',
      email: 'student@school.com',
      password: 'password123',
      role: Role.STUDENT,
      studentNumber: 'STU001',
      classId: classes[0].id,
      emailVerified: new Date(),
      dateOfBirth: new Date('2008-05-15'),
      gender: 'male',
      phone: '+1-555-1001',
      address: '123 Student St, Education City',
      parentName: 'Robert Thompson',
      parentEmail: 'robert.thompson@email.com',
      parentPhone: '+1-555-1002',
      medicalInfo: 'No known allergies',
      previousSchool: 'Riverside Middle School'
    }
  })
  students.push(mainStudent)

  // Generate additional students for each class
  for (let classIndex = 0; classIndex < classes.length; classIndex++) {
    const studentsPerClass = faker.number.int({ min: 15, max: 20 })
    
    for (let i = 0; i < studentsPerClass; i++) {
      const gender = faker.person.sexType()
      const firstName = faker.person.firstName(gender)
      const lastName = faker.person.lastName()
      const studentNumber: string = `STU${String(students.length + 1).padStart(3, '0')}`
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${studentNumber.toLowerCase()}@student.school.com`
      
      const parentFirstName = faker.person.firstName()
      const parentLastName = faker.person.lastName()
      
      try {
        const student = await prisma.user.create({
          data: {
            name: `${firstName} ${lastName}`,
            email,
            password: 'password123',
            role: Role.STUDENT,
            studentNumber,
            classId: classes[classIndex].id,
            emailVerified: new Date(),
            dateOfBirth: faker.date.birthdate({ min: 13, max: 18, mode: 'age' }),
            gender: gender === 'male' ? 'male' : 'female',
            phone: faker.phone.number(),
            address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state({ abbreviated: true })} ${faker.location.zipCode()}`,
            parentName: `${parentFirstName} ${parentLastName}`,
            parentEmail: `${parentFirstName.toLowerCase()}.${parentLastName.toLowerCase()}@email.com`,
            parentPhone: faker.phone.number(),
            medicalInfo: faker.helpers.arrayElement([
              'No known allergies',
              'Mild asthma - inhaler required',
              'Lactose intolerant',
              'No medical conditions',
              'Peanut allergy - EpiPen required',
              'Glasses for reading'
            ]),
            previousSchool: `${faker.company.name()} ${faker.helpers.arrayElement(['Elementary', 'Middle School', 'Academy'])}`
          }
        })
        students.push(student)
      } catch {
        // Skip if email already exists
        continue
      }
    }
  }

  console.log(`📊 Total students created: ${students.length}`)

  // 7. Create Teacher-Subject relationships
  console.log('🔗 Creating teacher-subject relationships...')
  for (const teacher of teachers) {
    // Each teacher teaches 1-2 subjects
    const numSubjects = faker.number.int({ min: 1, max: 2 })
    const teacherSubjects = faker.helpers.arrayElements(subjects, numSubjects)
    
    for (const subject of teacherSubjects) {
      try {
        await prisma.teacherSubject.upsert({
          where: { teacherId_subjectId: { teacherId: teacher.id, subjectId: subject.id } },
          update: {},
          create: { teacherId: teacher.id, subjectId: subject.id }
        })
      } catch {
        // Skip if relationship already exists
        continue
      }
    }
  }

  // 8. Create Class-Subject relationships
  for (const cls of classes) {
    // Each class has all subjects
    for (const subject of subjects) {
      await prisma.classSubject.upsert({
        where: { classId_subjectId: { classId: cls.id, subjectId: subject.id } },
        update: {},
        create: { classId: cls.id, subjectId: subject.id }
      })
    }
  }

  // Continue with simplified seeding for the rest...
  console.log('💰 Creating payroll records...')
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  for (const teacher of teachers) {
    const existingPayroll = await prisma.payrollRecord.findFirst({
      where: {
        employeeId: teacher.id,
        payYear: currentYear,
        payMonth: currentMonth
      }
    })

    if (!existingPayroll) {
      const baseSalary = Number(teacher.salary) || faker.number.int({ min: 4000, max: 7000 })
      const allowances = faker.number.int({ min: 500, max: 1200 })
      const overtime = faker.number.int({ min: 0, max: 500 })
      const taxRate = 0.15
      const insurance = 150
      const providentFund = baseSalary * 0.12
      
      const grossSalary = baseSalary + allowances + overtime
      const taxDeducted = grossSalary * taxRate
      const totalDeductions = taxDeducted + insurance + providentFund
      const netSalary = grossSalary - totalDeductions

      await prisma.payrollRecord.create({
        data: {
          employeeId: teacher.id,
          payPeriod: `${currentDate.toLocaleString('default', { month: 'long' })} ${currentYear}`,
          payYear: currentYear,
          payMonth: currentMonth,
          baseSalary,
          allowances,
          overtime,
          bonus: 0,
          taxDeducted,
          insurance,
          providentFund,
          otherDeductions: 0,
          grossSalary,
          totalDeductions,
          netSalary,
          status: faker.helpers.arrayElement([PayrollStatus.PAID, PayrollStatus.PROCESSED, PayrollStatus.PENDING]),
          paymentDate: new Date(),
          paymentMethod: 'Bank Transfer',
          bankAccount: `****${faker.number.int({ min: 1000, max: 9999 })}`,
          workingDays: 22,
          actualDays: faker.number.int({ min: 20, max: 22 })
        }
      })
    }
  }

  // 9. Create Performance Reviews for some teachers
  console.log('📈 Creating performance reviews...')
  const reviewableTeachers = teachers.slice(0, Math.min(teachers.length, 5))
  
  for (const teacher of reviewableTeachers) {
    const existingReview = await prisma.performanceReview.findFirst({
      where: {
        teacherId: teacher.id,
        reviewPeriod: 'Q1 2024'
      }
    })

    if (!existingReview) {
      await prisma.performanceReview.create({
        data: {
          teacherId: teacher.id,
          reviewerId: admin.id,
          reviewPeriod: 'Q1 2024',
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-03-31'),
          teachingQuality: faker.number.int({ min: 3, max: 5 }),
          classroomManagement: faker.number.int({ min: 3, max: 5 }),
          studentEngagement: faker.number.int({ min: 3, max: 5 }),
          professionalDevelopment: faker.number.int({ min: 3, max: 5 }),
          collaboration: faker.number.int({ min: 3, max: 5 }),
          punctuality: faker.number.int({ min: 4, max: 5 }),
          attendanceRate: faker.number.float({ min: 90, max: 100, fractionDigits: 1 }),
          averageStudentGrade: faker.number.float({ min: 70, max: 95, fractionDigits: 1 }),
          parentSatisfaction: faker.number.float({ min: 80, max: 100, fractionDigits: 1 }),
          overallRating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
          status: PerformanceStatus.FINALIZED,
          strengths: `${faker.helpers.arrayElement([
            'Excellent subject knowledge',
            'Strong classroom management',
            'Great student rapport',
            'Innovative teaching methods',
            'Dedicated to student success'
          ])} and ${faker.helpers.arrayElement([
            'effective communication skills',
            'collaborative approach with colleagues',
            'commitment to professional development',
            'ability to motivate students',
            'creative problem-solving abilities'
          ])}`,
          improvements: faker.helpers.arrayElement([
            'Could explore more technology integration in lessons',
            'Increase parent communication frequency',
            'Develop more differentiated instruction strategies',
            'Enhance assessment techniques',
            'Participate in more professional development workshops'
          ]),
          goals: `${faker.helpers.arrayElement([
            'Integrate more digital tools into curriculum',
            'Improve student assessment methods',
            'Enhance parent engagement strategies',
            'Develop cross-curricular projects',
            'Mentor new teachers'
          ])} and ${faker.helpers.arrayElement([
            'attend professional development workshops',
            'collaborate with other departments',
            'implement new teaching strategies',
            'improve classroom technology use',
            'enhance student evaluation methods'
          ])}`,
          goalsSet: faker.number.int({ min: 2, max: 5 }),
          goalsAchieved: faker.number.int({ min: 1, max: 3 })
        }
      })
    }
  }

  console.log('✅ Comprehensive database seeding with enhanced teacher data completed successfully!')
  console.log('\n📊 Statistics:')
  console.log(`   👨‍🏫 Teachers created/updated: ${teachers.length}`)
  console.log(`   👨‍🎓 Students created: ${students.length}`)
  console.log(`   🏫 Classes created: ${classes.length}`)
  console.log(`   📚 Subjects created: ${subjects.length}`)
  console.log('\n📧 Demo accounts:')
  console.log('   📧 admin@school.com (password: password123) - Admin Dashboard')
  console.log('   📧 teacher@school.com (password: password123) - Teacher Dashboard')
  console.log('   📧 student@school.com (password: password123) - Student Dashboard')
  console.log('   📧 parent@school.com (password: password123) - Parent Dashboard')
  console.log('\n🚀 Ready for comprehensive testing with realistic teacher data!')
}

main()
  .catch((e) => {
    console.error('❌ Error during comprehensive seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })