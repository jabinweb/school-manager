import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApplicationStatus } from '@prisma/client'

// Type definitions for the API
interface ApplicationRequestBody {
  studentFirstName: string
  studentLastName: string
  studentDateOfBirth: string
  studentGender: string
  studentGrade: string
  parentFirstName: string
  parentLastName: string
  parentEmail: string
  parentPhone: string
  parentAddress: string
  parentOccupation?: string
  previousSchool?: string
  previousGrade?: string
  reasonForTransfer?: string
  extracurriculars?: string
  medicalConditions?: string
  specialNeeds?: string
}

interface ApplicationResponse {
  success: boolean
  message?: string
  applicationId?: string
  data?: {
    applicationId: string
    studentName: string
    submittedDate: string
    status: string
  }
  error?: string
}

// GET - Track application by ID
export async function GET(request: NextRequest): Promise<NextResponse<ApplicationResponse>> {
  try {
    const { searchParams } = new URL(request.url)
    const applicationId = searchParams.get('applicationId')

    if (!applicationId) {
      return NextResponse.json(
        { success: false, error: 'Application ID is required' },
        { status: 400 }
      )
    }

    const application = await prisma.admissionApplication.findUnique({
      where: { applicationId },
      include: {
        documents: true,
        timeline: {
          orderBy: { createdAt: 'asc' }
        }
      }
    })

    if (!application) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      )
    }

    // Format the response data
    const responseData = {
      applicationId: application.applicationId,
      studentName: `${application.studentFirstName} ${application.studentLastName}`,
      grade: application.studentGrade,
      submittedDate: application.submittedAt.toISOString(),
      status: application.status.toLowerCase().replace('_', ' '),
      lastUpdate: application.updatedAt.toISOString(),
      nextStep: getNextStep(application.status),
      documents: application.documents.map(doc => ({
        name: doc.documentType,
        status: doc.status.toLowerCase()
      })),
      timeline: application.timeline.map(event => ({
        date: event.createdAt.toISOString(),
        status: event.status,
        description: event.description,
        completed: event.completed
      }))
    }

    return NextResponse.json({
      success: true,
      data: responseData
    })

  } catch (error) {
    console.error('Error fetching application:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Submit new application
export async function POST(request: NextRequest): Promise<NextResponse<ApplicationResponse>> {
  try {
    const body: ApplicationRequestBody = await request.json()

    // Validate required fields
    const requiredFields: (keyof ApplicationRequestBody)[] = [
      'studentFirstName',
      'studentLastName', 
      'studentDateOfBirth',
      'studentGender',
      'studentGrade',
      'parentFirstName',
      'parentLastName',
      'parentEmail',
      'parentPhone',
      'parentAddress'
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.parentEmail)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate date format
    const birthDate = new Date(body.studentDateOfBirth)
    if (isNaN(birthDate.getTime())) {
      return NextResponse.json(
        { success: false, error: 'Invalid date format' },
        { status: 400 }
      )
    }

    // Generate unique application ID
    const applicationId = `APP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`

    // Check if application ID already exists (very unlikely but good practice)
    const existingApp = await prisma.admissionApplication.findUnique({
      where: { applicationId }
    })

    if (existingApp) {
      // Generate a new one if exists
      const newApplicationId = `APP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`
      return await createApplication(newApplicationId, body)
    }

    return await createApplication(applicationId, body)

  } catch (error) {
    console.error('Error creating application:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}

// Helper function to create application
async function createApplication(
  applicationId: string, 
  body: ApplicationRequestBody
): Promise<NextResponse<ApplicationResponse>> {
  try {
    // Create the application
    const application = await prisma.admissionApplication.create({
      data: {
        applicationId,
        studentFirstName: body.studentFirstName,
        studentLastName: body.studentLastName,
        studentDateOfBirth: new Date(body.studentDateOfBirth),
        studentGender: body.studentGender,
        studentGrade: body.studentGrade,
        parentFirstName: body.parentFirstName,
        parentLastName: body.parentLastName,
        parentEmail: body.parentEmail,
        parentPhone: body.parentPhone,
        parentAddress: body.parentAddress,
        parentOccupation: body.parentOccupation || '',
        previousSchool: body.previousSchool || '',
        previousGrade: body.previousGrade || '',
        reasonForTransfer: body.reasonForTransfer || '',
        extracurriculars: body.extracurriculars || '',
        medicalConditions: body.medicalConditions || '',
        specialNeeds: body.specialNeeds || '',
        status: ApplicationStatus.PENDING
      }
    })

    // Create initial timeline entry
    await prisma.applicationTimeline.create({
      data: {
        applicationId: application.id,
        status: 'Application Submitted',
        description: 'Application received and logged in system',
        completed: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.applicationId,
      data: {
        applicationId: application.applicationId,
        studentName: `${application.studentFirstName} ${application.studentLastName}`,
        submittedDate: application.submittedAt.toISOString(),
        status: 'pending'
      }
    })

  } catch (error) {
    console.error('Error in createApplication:', error)
    throw error
  }
}

function getNextStep(status: ApplicationStatus): string {
  switch (status) {
    case ApplicationStatus.PENDING:
      return 'Your application is being reviewed by our admissions team.'
    case ApplicationStatus.UNDER_REVIEW:
      return 'Documents are being verified. You may be contacted for additional information.'
    case ApplicationStatus.INTERVIEW_SCHEDULED:
      return 'Please prepare for your scheduled interview. Check your email for details.'
    case ApplicationStatus.ACCEPTED:
      return 'Congratulations! Please complete enrollment procedures.'
    case ApplicationStatus.REJECTED:
      return 'Thank you for your interest. You may reapply next academic year.'
    case ApplicationStatus.WAITLISTED:
      return 'You are on our waiting list. We will contact you if a spot becomes available.'
    default:
      return 'Please contact admissions office for more information.'
  }
}
