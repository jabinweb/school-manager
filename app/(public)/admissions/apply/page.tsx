"use client"

import { useState } from 'react'
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PageHero } from '@/components/ui/page-hero'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  FileText, 
  User, 
  Users, 
  GraduationCap, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Upload,
  Info
} from 'lucide-react'

type FormData = {
  // Student Information
  studentFirstName: string
  studentLastName: string
  studentDateOfBirth: string
  studentGender: string
  studentGrade: string
  
  // Parent/Guardian Information
  parentFirstName: string
  parentLastName: string
  parentEmail: string
  parentPhone: string
  parentAddress: string
  parentOccupation: string
  
  // Previous School Information
  previousSchool: string
  previousGrade: string
  reasonForTransfer: string
  
  // Additional Information
  medicalConditions: string
  extracurriculars: string
  specialNeeds: string
  
  // Documents
  documents: {
    birthCertificate: File | null
    transcripts: File | null
    medicalRecords: File | null
    photos: File | null
  }
}

export default function AdmissionApplicationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    studentFirstName: '',
    studentLastName: '',
    studentDateOfBirth: '',
    studentGender: '',
    studentGrade: '',
    parentFirstName: '',
    parentLastName: '',
    parentEmail: '',
    parentPhone: '',
    parentAddress: '',
    parentOccupation: '',
    previousSchool: '',
    previousGrade: '',
    reasonForTransfer: '',
    medicalConditions: '',
    extracurriculars: '',
    specialNeeds: '',
    documents: {
      birthCertificate: null,
      transcripts: null,
      medicalRecords: null,
      photos: null
    }
  })
  const { toast } = useToast()

  const steps = [
    {
      title: "Student Information",
      icon: User,
      description: "Basic details about the student"
    },
    {
      title: "Parent/Guardian Details",
      icon: Users,
      description: "Contact and family information"
    },
    {
      title: "Academic History",
      icon: GraduationCap,
      description: "Previous school and academic records"
    },
    {
      title: "Documents Upload (Optional)",
      icon: FileText,
      description: "Upload documents if available"
    },
    {
      title: "Review & Submit",
      icon: CheckCircle,
      description: "Final review before submission"
    }
  ]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (documentType: keyof FormData['documents'], file: File) => {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Please choose a file smaller than 10MB"
      })
      return
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type", {
        description: "Please upload PDF, JPG, or PNG files only"
      })
      return
    }

    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }))

    toast.success("File uploaded", {
      description: `${file.name} has been uploaded successfully`
    })
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0: // Student Information
        if (!formData.studentFirstName || !formData.studentLastName || !formData.studentDateOfBirth || !formData.studentGender || !formData.studentGrade) {
          toast.error("Please fill in all required fields", {
            description: "Student information is incomplete"
          })
          return false
        }
        break
      case 1: // Parent Information
        if (!formData.parentFirstName || !formData.parentLastName || !formData.parentEmail || !formData.parentPhone || !formData.parentAddress) {
          toast.error("Please fill in all required fields", {
            description: "Parent/guardian information is incomplete"
          })
          return false
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.parentEmail)) {
          toast.error("Invalid email address", {
            description: "Please enter a valid email address"
          })
          return false
        }
        break
      case 2: // Academic History
        if (!formData.previousSchool || !formData.previousGrade) {
          toast.error("Please fill in all required fields", {
            description: "Academic history information is incomplete"
          })
          return false
        }
        break
      case 3: // Documents - Now Optional
        // No validation required since documents are optional
        toast.info("Documents step completed", {
          description: "You can upload documents later if needed"
        })
        break
    }
    return true
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
        toast.success("Step completed", {
          description: `Moving to ${steps[currentStep + 1].title}`
        })
      }
    }
  }

  const handleSubmit = async () => {
    const toastId = toast.loading("Submitting your application...")
    
    try {
      // Prepare data for API
      const applicationData = {
        studentFirstName: formData.studentFirstName,
        studentLastName: formData.studentLastName,
        studentDateOfBirth: formData.studentDateOfBirth,
        studentGender: formData.studentGender,
        studentGrade: formData.studentGrade,
        parentFirstName: formData.parentFirstName,
        parentLastName: formData.parentLastName,
        parentEmail: formData.parentEmail,
        parentPhone: formData.parentPhone,
        parentAddress: formData.parentAddress,
        parentOccupation: formData.parentOccupation,
        previousSchool: formData.previousSchool,
        previousGrade: formData.previousGrade,
        reasonForTransfer: formData.reasonForTransfer,
        extracurriculars: formData.extracurriculars,
        medicalConditions: formData.medicalConditions,
        specialNeeds: formData.specialNeeds
      }

      // Make API call
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application')
      }

      toast.dismiss(toastId)
      toast.success("Application submitted successfully!", {
        description: `Your application ID is ${result.applicationId}. You will receive a confirmation email shortly.`,
        action: {
          label: "Track Application",
          onClick: () => {
            window.location.href = `/admissions/track?id=${result.applicationId}`
          }
        }
      })
      
      // Reset form or redirect
      setTimeout(() => {
        window.location.href = `/admissions/track?id=${result.applicationId}`
      }, 3000)
      
    } catch (error) {
      toast.dismiss(toastId)
      const errorMessage = error instanceof Error ? error.message : 'Submission failed'
      toast.error("Submission failed", {
        description: errorMessage
      })
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      toast.success("Step updated", {
        description: `Back to ${steps[currentStep - 1].title}`
      })
    }
  }

  return (
    <div className="min-h-screen">
      <PageHero
        title="Online Application"
        description="Complete your admission application in a few simple steps"
        badge={{
          icon: FileText,
          text: "Apply Now"
        }}
        gradient="green"
      />

      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 mb-2 transition-colors
                      ${index <= currentStep 
                        ? 'bg-primary border-primary text-white' 
                        : 'border-slate-300 text-slate-400'
                      }`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                      <div className={`font-medium text-sm ${index <= currentStep ? 'text-primary' : 'text-slate-400'}`}>
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`h-px flex-1 mt-6 ${index < currentStep ? 'bg-primary' : 'bg-slate-300'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Steps */}
            <Card className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 0: Student Information */}
                  {currentStep === 0 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Student Information</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          Please provide basic information about the student
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name *</label>
                          <Input
                            value={formData.studentFirstName}
                            onChange={(e) => handleInputChange('studentFirstName', e.target.value)}
                            placeholder="Enter first name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name *</label>
                          <Input
                            value={formData.studentLastName}
                            onChange={(e) => handleInputChange('studentLastName', e.target.value)}
                            placeholder="Enter last name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Date of Birth *</label>
                          <Input
                            type="date"
                            value={formData.studentDateOfBirth}
                            onChange={(e) => handleInputChange('studentDateOfBirth', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Gender *</label>
                          <select 
                            className="w-full p-2 border rounded-md"
                            value={formData.studentGender}
                            onChange={(e) => handleInputChange('studentGender', e.target.value)}
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">Applying for Grade *</label>
                          <select 
                            className="w-full p-2 border rounded-md"
                            value={formData.studentGrade}
                            onChange={(e) => handleInputChange('studentGrade', e.target.value)}
                          >
                            <option value="">Select grade</option>
                            <option value="pre-k">Pre-K</option>
                            <option value="kindergarten">Kindergarten</option>
                            {Array.from({length: 12}, (_, i) => (
                              <option key={i + 1} value={`grade-${i + 1}`}>
                                Grade {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 1: Parent Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Parent/Guardian Information</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          Primary contact information for the parent or guardian
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name *</label>
                          <Input
                            value={formData.parentFirstName}
                            onChange={(e) => handleInputChange('parentFirstName', e.target.value)}
                            placeholder="Enter first name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name *</label>
                          <Input
                            value={formData.parentLastName}
                            onChange={(e) => handleInputChange('parentLastName', e.target.value)}
                            placeholder="Enter last name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email Address *</label>
                          <Input
                            type="email"
                            value={formData.parentEmail}
                            onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                            placeholder="Enter email address"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone Number *</label>
                          <Input
                            value={formData.parentPhone}
                            onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">Home Address *</label>
                          <Textarea
                            value={formData.parentAddress}
                            onChange={(e) => handleInputChange('parentAddress', e.target.value)}
                            placeholder="Enter complete address"
                            rows={3}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">Occupation</label>
                          <Input
                            value={formData.parentOccupation}
                            onChange={(e) => handleInputChange('parentOccupation', e.target.value)}
                            placeholder="Enter occupation"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Academic History */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Academic History</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          Information about previous education and academic background
                        </p>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Previous School *</label>
                          <Input
                            value={formData.previousSchool}
                            onChange={(e) => handleInputChange('previousSchool', e.target.value)}
                            placeholder="Enter previous school name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Grade Completed *</label>
                          <Input
                            value={formData.previousGrade}
                            onChange={(e) => handleInputChange('previousGrade', e.target.value)}
                            placeholder="Enter last completed grade"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Reason for Transfer</label>
                          <Textarea
                            value={formData.reasonForTransfer}
                            onChange={(e) => handleInputChange('reasonForTransfer', e.target.value)}
                            placeholder="Please explain the reason for transferring schools"
                            rows={4}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Extracurricular Activities</label>
                          <Textarea
                            value={formData.extracurriculars}
                            onChange={(e) => handleInputChange('extracurriculars', e.target.value)}
                            placeholder="List any sports, clubs, or activities the student has participated in"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Medical Conditions or Special Needs</label>
                          <Textarea
                            value={formData.medicalConditions}
                            onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                            placeholder="Please describe any medical conditions, allergies, or special needs"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Document Upload - Now Optional */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Documents Upload</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          Upload documents if you have them available. You can also submit them later.
                        </p>
                      </div>

                      {/* Information Alert */}
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Document upload is optional for now. You can submit your application and upload documents later when requested by the admissions office.
                        </AlertDescription>
                      </Alert>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {[
                          { key: 'birthCertificate', label: 'Birth Certificate', required: false },
                          { key: 'transcripts', label: 'Academic Transcripts', required: false },
                          { key: 'medicalRecords', label: 'Medical Records', required: false },
                          { key: 'photos', label: 'Passport Photos (4 copies)', required: false }
                        ].map((doc) => (
                          <div key={doc.key} className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center opacity-60">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                            <div className="font-medium mb-2">{doc.label}</div>
                            <div className="text-sm text-slate-500 mb-3">Upload temporarily disabled</div>
                            <Button variant="outline" className="mt-2" disabled>
                              Choose File (Coming Soon)
                            </Button>
                            <div className="mt-2 text-xs text-slate-400">
                              Will be available with file storage setup
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Next Steps for Documents</h4>
                        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                          <li>• You can proceed with your application without uploading documents</li>
                          <li>• Our admissions team will contact you about document submission</li>
                          <li>• Documents can be submitted via email or in-person visit</li>
                          <li>• File upload feature will be available soon</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review & Submit - Update document display */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Review Your Application</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          Please review all information before submitting your application
                        </p>
                      </div>
                      
                      <div className="space-y-6">
                        <Card className="p-4">
                          <h4 className="font-semibold mb-3 flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            Student Information
                          </h4>
                          <div className="grid md:grid-cols-2 gap-2 text-sm">
                            <div>Name: {formData.studentFirstName} {formData.studentLastName}</div>
                            <div>Date of Birth: {formData.studentDateOfBirth}</div>
                            <div>Gender: {formData.studentGender}</div>
                            <div>Grade: {formData.studentGrade}</div>
                          </div>
                        </Card>
                        
                        <Card className="p-4">
                          <h4 className="font-semibold mb-3 flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            Parent/Guardian Information
                          </h4>
                          <div className="grid md:grid-cols-2 gap-2 text-sm">
                            <div>Name: {formData.parentFirstName} {formData.parentLastName}</div>
                            <div>Email: {formData.parentEmail}</div>
                            <div>Phone: {formData.parentPhone}</div>
                            <div>Occupation: {formData.parentOccupation}</div>
                          </div>
                        </Card>
                        
                        <Card className="p-4">
                          <h4 className="font-semibold mb-3 flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            Documents Status
                          </h4>
                          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                              <Info className="h-4 w-4 text-amber-600 mt-0.5" />
                              <div className="text-sm">
                                <p className="font-medium text-amber-800 dark:text-amber-200">Documents will be collected separately</p>
                                <p className="text-amber-700 dark:text-amber-300 mt-1">
                                  Our admissions team will contact you with instructions for document submission after your application is reviewed.
                                </p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep < steps.length - 1 ? (
                  <Button onClick={nextStep} className="flex items-center">
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="flex items-center bg-green-600 hover:bg-green-700">
                    Submit Application
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
