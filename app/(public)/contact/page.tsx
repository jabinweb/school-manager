"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { PageHero } from '@/components/ui/page-hero'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  Users,
  GraduationCap,
  MessageCircle
} from 'lucide-react'
import { schoolConfig } from '@/lib/config'

export default function ContactPage() {
  const contactInfo = [
    {
      title: "General Information",
      icon: Phone,
      details: [
        { label: "Main Office", value: schoolConfig.contact.phone },
        { label: "Email", value: schoolConfig.contact.email },
        { label: "Fax", value: "(555) 123-4568" }
      ]
    },
    {
      title: "Admissions Office",
      icon: GraduationCap,
      details: [
        { label: "Admissions", value: schoolConfig.contact.admissions },
        { label: "Direct Line", value: "(555) 123-4570" },
        { label: "Tours", value: "tours@greenwoodhigh.edu" }
      ]
    },
    {
      title: "Student Services",
      icon: Users,
      details: [
        { label: "Counseling", value: "counseling@greenwoodhigh.edu" },
        { label: "Health Office", value: "(555) 123-4571" },
        { label: "Athletics", value: "athletics@greenwoodhigh.edu" }
      ]
    }
  ]

  const officeHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 4:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 12:00 PM" },
    { day: "Sunday", hours: "Closed" },
    { day: "Holidays", hours: "Closed" }
  ]

  const departments = [
    { name: "Principal's Office", contact: "principal@greenwoodhigh.edu", phone: "(555) 123-4572" },
    { name: "Academic Affairs", contact: "academics@greenwoodhigh.edu", phone: "(555) 123-4573" },
    { name: "Student Affairs", contact: "students@greenwoodhigh.edu", phone: "(555) 123-4574" },
    { name: "Finance Office", contact: "finance@greenwoodhigh.edu", phone: "(555) 123-4575" },
    { name: "IT Support", contact: "support@greenwoodhigh.edu", phone: "(555) 123-4576" },
    { name: "Transportation", contact: "transport@greenwoodhigh.edu", phone: "(555) 123-4577" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Contact Greenwood High"
        description="We're here to help answer your questions and provide information about our school community. Reach out to us anytime."
        badge={{
          icon: MessageCircle,
          text: "Get In Touch"
        }}
        gradient="teal"
      />

      {/* Contact Information */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Contact Information
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Multiple ways to reach our dedicated staff and departments
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <info.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {info.details.map((detail, idx) => (
                        <div key={idx} className="text-left">
                          <div className="text-sm font-medium text-slate-900 dark:text-white">
                            {detail.label}
                          </div>
                          <div className="text-sm text-primary">
                            {detail.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Location & Hours */}
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Our Location</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Address</h4>
                      <p className="text-slate-600 dark:text-slate-300">
                        {schoolConfig.contact.address}
                      </p>
                    </div>
                    <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                      <div className="text-center text-slate-500 dark:text-slate-400">
                        <MapPin className="h-12 w-12 mx-auto mb-2" />
                        <p>Interactive Map</p>
                        <p className="text-sm">Click for directions</p>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle>Office Hours</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {schedule.day}
                        </span>
                        <Badge variant="outline">
                          {schedule.hours}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">Emergency Contact</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      For emergencies outside office hours, please call: 
                      <span className="font-medium text-primary ml-1">(555) 123-9999</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                Send Us a Message
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Have a question? We&apos;d love to hear from you.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        First Name *
                      </label>
                      <Input placeholder="Enter your first name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Last Name *
                      </label>
                      <Input placeholder="Enter your last name" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Email *
                      </label>
                      <Input type="email" placeholder="Enter your email" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Phone
                      </label>
                      <Input placeholder="Enter your phone number" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Subject *
                    </label>
                    <Input placeholder="What is this regarding?" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Message *
                    </label>
                    <Textarea 
                      placeholder="Please describe your inquiry..."
                      rows={6}
                    />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Department Directory */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Department Directory
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Direct contact information for specific departments
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {departments.map((dept, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">
                      {dept.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-primary">{dept.contact}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-accent" />
                        <span className="text-slate-600 dark:text-slate-300">{dept.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
                
