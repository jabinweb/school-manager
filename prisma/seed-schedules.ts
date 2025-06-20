import { PrismaClient, DayOfWeek } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🕒 Starting schedule seeding...')

  // Time slots configuration
  const timeSlots = [
    { start: '08:00', end: '08:45' },
    { start: '08:45', end: '09:30' },
    { start: '09:45', end: '10:30' }, // 15 min break
    { start: '10:30', end: '11:15' },
    { start: '11:30', end: '12:15' }, // 15 min break
    { start: '12:15', end: '13:00' },
    { start: '14:00', end: '14:45' }, // 1 hour lunch break
    { start: '14:45', end: '15:30' },
    { start: '15:30', end: '16:15' }
  ]

  const daysOfWeek = [
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY,
    DayOfWeek.FRIDAY
  ]

  // Fetch existing classes and subjects
  const classes = await prisma.class.findMany({
    include: {
      subjects: {
        include: {
          subject: true
        }
      }
    }
  })

  const subjects = await prisma.subject.findMany()

  if (classes.length === 0) {
    console.log('⚠️ No classes found. Please run the main seed file first.')
    return
  }

  if (subjects.length === 0) {
    console.log('⚠️ No subjects found. Please run the main seed file first.')
    return
  }

  let schedulesCreated = 0

  // Create schedules for each class
  for (const classData of classes) {
    console.log(`📅 Creating schedule for ${classData.name}...`)

    // Get subjects assigned to this class
    const classSubjects = classData.subjects.map(cs => cs.subject)
    
    if (classSubjects.length === 0) {
      console.log(`⚠️ No subjects assigned to ${classData.name}, skipping...`)
      continue
    }

    // Create a weekly schedule for this class
    for (const day of daysOfWeek) {
      // Determine how many periods per day (6-8 periods)
      const periodsPerDay = Math.min(timeSlots.length, classSubjects.length + 1)
      
      // Randomly assign subjects to time slots for this day
      const shuffledSubjects = [...classSubjects].sort(() => Math.random() - 0.5)
      const daySubjects = shuffledSubjects.slice(0, periodsPerDay)

      for (let i = 0; i < daySubjects.length && i < timeSlots.length; i++) {
        const subject = daySubjects[i]
        const timeSlot = timeSlots[i]

        try {
          // Check if schedule already exists
          const existingSchedule = await prisma.timetableEntry.findFirst({
            where: {
              classId: classData.id,
              day: day,
              startTime: timeSlot.start,
              endTime: timeSlot.end
            }
          })

          if (!existingSchedule) {
            await prisma.timetableEntry.create({
              data: {
                classId: classData.id,
                subjectId: subject.id,
                day: day,
                startTime: timeSlot.start,
                endTime: timeSlot.end
              }
            })
            schedulesCreated++
          }
        } catch (error) {
          console.error(`❌ Error creating schedule for ${classData.name} - ${subject.name} on ${day}:`, error)
        }
      }
    }
  }

  // Create some sample schedules for specific scenarios
  console.log('📚 Creating additional sample schedules...')

  // Sample schedule patterns for different grade levels
  const sampleSchedules = [
    // Elementary schedule pattern (shorter periods, more variety)
    {
      grade: 2,
      pattern: [
        { day: DayOfWeek.MONDAY, subjects: ['MATH', 'ELA', 'SCI', 'ART', 'PE'] },
        { day: DayOfWeek.TUESDAY, subjects: ['ELA', 'MATH', 'MUS', 'SCI', 'PE'] },
        { day: DayOfWeek.WEDNESDAY, subjects: ['MATH', 'SS', 'ELA', 'ART', 'SCI'] },
        { day: DayOfWeek.THURSDAY, subjects: ['SCI', 'MATH', 'ELA', 'PE', 'MUS'] },
        { day: DayOfWeek.FRIDAY, subjects: ['ELA', 'SS', 'MATH', 'ART', 'PE'] }
      ]
    },
    // Middle school pattern
    {
      grade: 8,
      pattern: [
        { day: DayOfWeek.MONDAY, subjects: ['MATH', 'ELA', 'SCI', 'SS', 'CS', 'PE'] },
        { day: DayOfWeek.TUESDAY, subjects: ['ELA', 'MATH', 'SPAN', 'SCI', 'ART', 'PE'] },
        { day: DayOfWeek.WEDNESDAY, subjects: ['MATH', 'SS', 'ELA', 'CS', 'SCI', 'MUS'] },
        { day: DayOfWeek.THURSDAY, subjects: ['SCI', 'MATH', 'ELA', 'SPAN', 'PE', 'SS'] },
        { day: DayOfWeek.FRIDAY, subjects: ['ELA', 'MATH', 'SCI', 'ART', 'CS', 'PE'] }
      ]
    },
    // High school pattern (longer periods, specialized subjects)
    {
      grade: 11,
      pattern: [
        { day: DayOfWeek.MONDAY, subjects: ['MATH', 'PHYS', 'ELA', 'CHEM', 'SS', 'PE'] },
        { day: DayOfWeek.TUESDAY, subjects: ['PHYS', 'MATH', 'BIO', 'ELA', 'SPAN', 'CS'] },
        { day: DayOfWeek.WEDNESDAY, subjects: ['CHEM', 'ELA', 'MATH', 'SS', 'BIO', 'PE'] },
        { day: DayOfWeek.THURSDAY, subjects: ['MATH', 'BIO', 'PHYS', 'ELA', 'CS', 'SPAN'] },
        { day: DayOfWeek.FRIDAY, subjects: ['ELA', 'MATH', 'CHEM', 'SS', 'BIO', 'PE'] }
      ]
    }
  ]

  for (const schedulePattern of sampleSchedules) {
    // Find classes matching this grade
    const gradeClasses = classes.filter(c => c.grade === schedulePattern.grade)
    
    for (const classData of gradeClasses) {
      console.log(`📋 Creating pattern schedule for ${classData.name} (Grade ${schedulePattern.grade})...`)
      
      for (const dayPattern of schedulePattern.pattern) {
        for (let i = 0; i < dayPattern.subjects.length && i < timeSlots.length; i++) {
          const subjectCode = dayPattern.subjects[i]
          const subject = subjects.find(s => s.code === subjectCode)
          const timeSlot = timeSlots[i]

          if (subject) {
            try {
              // Check if this time slot is already occupied
              const existingSchedule = await prisma.timetableEntry.findFirst({
                where: {
                  classId: classData.id,
                  day: dayPattern.day,
                  startTime: timeSlot.start
                }
              })

              if (!existingSchedule) {
                await prisma.timetableEntry.create({
                  data: {
                    classId: classData.id,
                    subjectId: subject.id,
                    day: dayPattern.day,
                    startTime: timeSlot.start,
                    endTime: timeSlot.end
                  }
                })
                schedulesCreated++
              }
            } catch (error) {
              // Skip conflicts and continue
              console.log(`⚠️ Schedule conflict for ${classData.name} - ${subject.name} on ${dayPattern.day} at ${timeSlot.start}`)
            }
          }
        }
      }
    }
  }

  // Create some special schedules
  console.log('🎯 Creating special event schedules...')

  // Assembly/Special Events (Fridays last period)
  const assemblySlot = timeSlots[timeSlots.length - 1]
  for (const classData of classes) {
    try {
      const existingAssembly = await prisma.timetableEntry.findFirst({
        where: {
          classId: classData.id,
          day: DayOfWeek.FRIDAY,
          startTime: assemblySlot.start
        }
      })

      if (!existingAssembly) {
        // Use a general subject for assembly (or create a special "Assembly" subject)
        const generalSubject = subjects.find(s => s.code === 'SS') || subjects[0]
        
        await prisma.timetableEntry.create({
          data: {
            classId: classData.id,
            subjectId: generalSubject.id,
            day: DayOfWeek.FRIDAY,
            startTime: assemblySlot.start,
            endTime: assemblySlot.end
          }
        })
        schedulesCreated++
      }
    } catch (error) {
      // Skip errors for special schedules
    }
  }

  console.log('✅ Schedule seeding completed successfully!')
  console.log(`📊 Summary:`)
  console.log(`   🕒 ${schedulesCreated} schedule entries created`)
  console.log(`   📅 ${daysOfWeek.length} days per week covered`)
  console.log(`   ⏰ ${timeSlots.length} time slots per day`)
  console.log(`   🏫 ${classes.length} classes scheduled`)
  console.log(`   📚 ${subjects.length} subjects available`)
  
  // Show sample schedule for verification
  if (classes.length > 0) {
    console.log(`\n📋 Sample schedule for ${classes[0].name}:`)
    const sampleSchedules = await prisma.timetableEntry.findMany({
      where: { classId: classes[0].id },
      include: {
        subject: { select: { name: true, code: true } }
      },
      orderBy: [
        { day: 'asc' },
        { startTime: 'asc' }
      ],
      take: 10
    })

    for (const schedule of sampleSchedules) {
      console.log(`   ${schedule.day} ${schedule.startTime}-${schedule.endTime}: ${schedule.subject.name}`)
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Error during schedule seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
