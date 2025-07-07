"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion'
import { Mail, GraduationCap, Award, Users, Filter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type FacultyMember = {
  id: string
  name: string
  role: string
  department: string
  image: string
  qualifications: string
  experience: string
  email: string
}

type FacultyListProps = {
  facultyMembers: FacultyMember[]
  departments: string[]
}

export function FacultyList({ facultyMembers, departments }: FacultyListProps) {
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  
  // Filter faculty members by department
  const filteredFaculty = selectedDepartment === "All Departments" 
    ? facultyMembers 
    : facultyMembers.filter(member => member.department === selectedDepartment)

  return (
    <>
      <motion.div
        className="max-w-4xl mx-auto text-center mb-16"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
          Our Leadership in <span className="text-primary">Education</span>
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Our faculty brings together experienced educators, subject matter experts, and caring mentors
          who are dedicated to helping each student reach their full potential.
        </p>
      </motion.div>

      {/* Department Filter */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-2 rounded-lg mb-4 w-full max-w-4xl mx-auto">
          <Filter className="h-5 w-5 text-slate-500 mx-3" />
          <div className="flex flex-wrap gap-2 justify-center">
            {departments.map((dept, index) => (
              <Button 
                key={index}
                variant={dept === selectedDepartment ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {filteredFaculty.length === 0 ? (
        <div className="text-center p-10">
          <p className="text-slate-500 dark:text-slate-400">No faculty members found in this department.</p>
        </div>
      ) : (
        /* Faculty Grid */
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredFaculty.map((member) => (
            <motion.div key={member.id} variants={staggerItem}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="px-2 py-1 bg-primary/90 text-white text-xs rounded-full">
                      {member.department}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <GraduationCap className="h-4 w-4 mr-2 text-slate-500" />
                    {member.qualifications}
                  </div>
                  
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-4">
                    <Award className="h-4 w-4 mr-2 text-slate-500" />
                    {member.experience} experience
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
                    <Button variant="outline" className="w-full justify-start text-primary">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button asChild className="w-full">
                      <Link href={`/faculty/${member.id}`}>
                        View Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Join Our Team CTA */}
      <motion.div 
        className="mt-20 bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-2xl max-w-4xl mx-auto"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
            Join Our Teaching Team
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            We&apos;re always looking for passionate educators to join our community.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            View Open Positions
          </Button>
          <Button variant="outline">
            Learn About Benefits
          </Button>
        </div>
      </motion.div>
    </>
  )
}
