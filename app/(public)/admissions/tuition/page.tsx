"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHero } from "@/components/ui/page-hero"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion'
import { CreditCard, Calendar, Download, CircleDollarSign, FileCheck, ArrowRight, Info, Clock } from 'lucide-react'
import Link from 'next/link'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function TuitionPage() {
  const [showInRupees, setShowInRupees] = useState(true)
  
  // Exchange rate - for demonstration purposes
  const exchangeRate = 83.5 // 1 USD = 83.5 INR approximately
  
  // Function to format currency based on selection
  const formatCurrency = (amount: number | string) => {
    // Handle ranges like "$200-450"
    if (typeof amount === 'string' && amount.includes('-')) {
      const [min, max] = amount.replace('$', '').split('-').map(val => parseInt(val.trim()));
      return showInRupees
        ? `₹${Math.round(min * exchangeRate).toLocaleString('en-IN')}-${Math.round(max * exchangeRate).toLocaleString('en-IN')}`
        : `$${min.toLocaleString('en-US')}-${max.toLocaleString('en-US')}`;
    }
    
    // Handle "Varies" and other text values
    if (typeof amount === 'string' && isNaN(parseFloat(amount.replace('$', '')))) {
      return amount;
    }
    
    // Handle numeric values
    const numericValue = typeof amount === 'number' 
      ? amount 
      : parseFloat(amount.replace('$', '').replace(/,/g, ''));
    
    return showInRupees
      ? `₹${Math.round(numericValue * exchangeRate).toLocaleString('en-IN')}`
      : `$${numericValue.toLocaleString('en-US')}`;
  };

  // Tuition data
  const tuitionData = {
    elementary: [
      { grade: "Kindergarten", tuition: 12500, options: "Annual, Semester, or Monthly", included: "Core curriculum, art, music, physical education" },
      { grade: "Grades 1-3", tuition: 13800, options: "Annual, Semester, or Monthly", included: "Core curriculum, art, music, physical education, technology" },
      { grade: "Grades 4-5", tuition: 14500, options: "Annual, Semester, or Monthly", included: "Core curriculum, art, music, physical education, technology, language" }
    ],
    middle: [
      { grade: "Grade 6", tuition: 15800, options: "Annual, Semester, or Monthly", included: "Core curriculum, electives, technology, field trips" },
      { grade: "Grade 7", tuition: 16200, options: "Annual, Semester, or Monthly", included: "Core curriculum, electives, technology, field trips" },
      { grade: "Grade 8", tuition: 16500, options: "Annual, Semester, or Monthly", included: "Core curriculum, electives, technology, field trips, career exploration" }
    ],
    high: [
      { grade: "Grade 9", tuition: 18200, options: "Annual, Semester, or Monthly", included: "Core curriculum, electives, technology, college prep" },
      { grade: "Grade 10", tuition: 18500, options: "Annual, Semester, or Monthly", included: "Core curriculum, electives, technology, college prep" },
      { grade: "Grade 11", tuition: 19200, options: "Annual, Semester, or Monthly", included: "Core curriculum, AP/honors courses, college counseling" },
      { grade: "Grade 12", tuition: 19800, options: "Annual, Semester, or Monthly", included: "Core curriculum, AP/honors courses, college counseling, senior activities" }
    ]
  }

  // Fee categories
  const feeCategories = [
    {
      title: "One-Time Fees",
      items: [
        { name: "Application Fee", amount: "$75", description: "Non-refundable, due with application" },
        { name: "New Student Enrollment Fee", amount: "$500", description: "One-time fee for new students" },
        { name: "Security Deposit", amount: "$1,000", description: "Refundable upon graduation/withdrawal" }
      ]
    },
    {
      title: "Annual Fees",
      items: [
        { name: "Technology Fee", amount: "$350", description: "Covers IT infrastructure and resources" },
        { name: "Activity Fee", amount: "$250", description: "Supports school events and activities" },
        { name: "Facility Maintenance Fee", amount: "$500", description: "Contributes to campus upkeep" }
      ]
    },
    {
      title: "Optional Services",
      items: [
        { name: "Transportation (Bus Service)", amount: "$1,800", description: "Annual fee, based on route" },
        { name: "Meal Plan", amount: "$1,200", description: "Full lunch program for the academic year" },
        { name: "Extended Day Program", amount: "$2,500", description: "Before and after school care" }
      ]
    },
    {
      title: "Program-Specific Fees",
      items: [
        { name: "Athletics Participation", amount: "$200-450", description: "Per sport, varies by level" },
        { name: "Arts Program", amount: "$150-350", description: "Materials fee for specialized arts" },
        { name: "Field Trips", amount: "Varies", description: "Billed as scheduled throughout the year" }
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      <PageHero
        title="Tuition & Fees"
        description="Investment in your child's education and future"
        badge={{
          icon: CreditCard,
          text: "2024-2025 Academic Year"
        }}
        gradient="purple"
      />

      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-10 md:mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-slate-900 dark:text-white">
              Your Investment in <span className="text-primary">Educational Excellence</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300">
              Our tuition and fee structure is designed to provide outstanding educational value
              while maintaining our commitment to academic excellence and comprehensive student development.
            </p>
            
            {/* Currency Switch */}
            <div className="mt-6 flex justify-center">
              <div className="flex items-center space-x-4 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
                <Label htmlFor="currency-toggle" className={`text-sm font-medium ${!showInRupees ? 'text-primary' : 'text-slate-500'}`}>
                  USD ($)
                </Label>
                <Switch 
                  id="currency-toggle" 
                  checked={showInRupees} 
                  onCheckedChange={setShowInRupees}
                />
                <Label htmlFor="currency-toggle" className={`text-sm font-medium ${showInRupees ? 'text-primary' : 'text-slate-500'}`}>
                  INR (₹)
                </Label>
              </div>
            </div>
          </motion.div>

          {/* Tuition by Grade Level */}
          <motion.div 
            className="max-w-4xl mx-auto mb-12 md:mb-20"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Tabs defaultValue="elementary" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8">
                <TabsTrigger value="elementary">Elementary School</TabsTrigger>
                <TabsTrigger value="middle">Middle School</TabsTrigger>
                <TabsTrigger value="high">High School</TabsTrigger>
              </TabsList>

              {Object.entries(tuitionData).map(([level, grades]) => (
                <TabsContent key={level} value={level} className="p-4 md:p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-slate-900 dark:text-white">
                    {level === "elementary" ? "Elementary School (Grades K-5)" : 
                     level === "middle" ? "Middle School (Grades 6-8)" : 
                     "High School (Grades 9-12)"}
                  </h3>
                  
                  {/* Mobile-friendly card view for small screens */}
                  <div className="block md:hidden space-y-4">
                    {grades.map((item, idx) => (
                      <Card key={idx} className="overflow-hidden">
                        <CardHeader className="bg-slate-100 dark:bg-slate-700 py-3">
                          <CardTitle className="text-base">{item.grade}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2">
                          <div>
                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Annual Tuition</div>
                            <div className="text-lg font-bold text-primary">{formatCurrency(item.tuition)}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Payment Options</div>
                            <div>{item.options}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">What&apos;s Included</div>
                            <div className="text-sm">{item.included}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Standard table for larger screens */}
                  <div className="hidden md:block overflow-x-auto mb-8">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Grade Level</TableHead>
                          <TableHead>Annual Tuition</TableHead>
                          <TableHead>Payment Options</TableHead>
                          <TableHead>What&apos;s Included</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {grades.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{item.grade}</TableCell>
                            <TableCell className="font-bold text-primary">{formatCurrency(item.tuition)}</TableCell>
                            <TableCell>{item.options}</TableCell>
                            <TableCell>{item.included}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-700/20 p-4 rounded-lg text-sm">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          Tuition includes core educational program, textbooks, and standard academic resources.
                        </p>
                        <p className="text-slate-600 dark:text-slate-300 mt-1">
                          Additional fees may apply for specialized programs, extracurricular activities, and optional services.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          {/* Additional Fees */}
          <motion.div 
            className="max-w-4xl mx-auto mb-12 md:mb-20"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center text-slate-900 dark:text-white">
              Additional Fees
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {feeCategories.map((category, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <Card>
                    <CardHeader className="pb-2 md:pb-4">
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 md:space-y-4">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 md:gap-3">
                            <CircleDollarSign className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between flex-wrap">
                                <span className="font-medium text-slate-900 dark:text-white mr-2">{item.name}</span>
                                <span className="font-bold text-primary whitespace-nowrap">
                                  {formatCurrency(item.amount)}
                                </span>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">{item.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Payment Options */}
          <motion.div 
            className="max-w-4xl mx-auto mb-12 md:mb-20"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center text-slate-900 dark:text-white">
              Payment Plans & Options
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  title: "Annual Payment",
                  discount: "3% Discount",
                  description: "Full payment for the academic year due by July 15th.",
                  features: [
                    "Highest discount rate",
                    "Single payment",
                    "No processing fees",
                    "Simplest option"
                  ]
                },
                {
                  title: "Semester Payment",
                  discount: "1.5% Discount",
                  description: "Two equal payments due on July 15th and December 15th.",
                  features: [
                    "Moderate discount",
                    "Two payments per year",
                    "Minimal processing",
                    "Popular option"
                  ]
                },
                {
                  title: "Monthly Payment",
                  discount: "No Discount",
                  description: "Ten equal monthly payments from July to April.",
                  features: [
                    "Easiest on cash flow",
                    "Automatic bank drafts",
                    (showInRupees ? "₹3,800" : "$45") + " processing fee",
                    "Most flexible option"
                  ]
                }
              ].map((plan, index) => (
                <Card key={index} className={index === 1 ? "border-primary shadow-lg" : ""}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{plan.title}</CardTitle>
                    <div className="text-base md:text-lg font-bold text-primary">{plan.discount}</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-300">{plan.description}</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <FileCheck className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                      Select Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Payment Deadlines */}
          <motion.div 
            className="max-w-4xl mx-auto mb-12 md:mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Calendar className="h-5 w-5 mr-2" />
                  Important Payment Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { 
                      date: "April 15, 2024", 
                      title: "Enrollment Deposit Due",
                      description: (showInRupees ? "₹83,500" : "$1,000") + " non-refundable deposit to secure placement (applied to tuition)" 
                    },
                    { 
                      date: "June 1, 2024", 
                      title: "Payment Plan Selection",
                      description: "Deadline to select payment plan option for upcoming academic year" 
                    },
                    { 
                      date: "July 15, 2024", 
                      title: "Annual & First Semester Payment",
                      description: "Due date for annual payment or first semester payment" 
                    },
                    { 
                      date: "December 15, 2024", 
                      title: "Second Semester Payment",
                      description: "Due date for second semester payment" 
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                          <span className="text-primary font-medium text-sm md:text-base">{item.date}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center max-w-2xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-slate-900 dark:text-white">
              Making Education Accessible
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 md:mb-8">
              We are committed to making quality education accessible. Learn more about our financial aid programs and payment options.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/admissions/financial-aid">
                  Financial Aid Information <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" /> Download Fee Schedule
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
