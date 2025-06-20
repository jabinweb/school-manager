import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { Role } from "@prisma/client"

export const config = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Check for demo accounts with simple password matching
          const demoCredentials = {
            "admin@school.com": { role: Role.ADMIN, name: "Admin User" },
            "teacher@school.com": { role: Role.TEACHER, name: "Teacher User" },
            "student@school.com": { role: Role.STUDENT, name: "Student User" },
            "parent@school.com": { role: Role.PARENT, name: "Parent User" }
          }

          const demoUser = demoCredentials[credentials.email as keyof typeof demoCredentials]
          
          if (demoUser && credentials.password === "password123") {
            // Create or update demo user in database
            const user = await prisma.user.upsert({
              where: { email: credentials.email as string },
              update: {},
              create: {
                email: credentials.email as string,
                name: demoUser.name,
                role: demoUser.role,
                password: "password123", // Store plain password for demo
                emailVerified: new Date(), // Mark as verified for demo
              }
            })

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            }
          }

          // For real users, check database and verify password
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string
            }
          })

          if (!user || !user.password) {
            return null
          }

          // Simple password verification for non-demo users
          // In production, you would use proper password hashing
          const isPasswordValid = user.password === credentials.password
          
          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("Authorization error:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      // For OAuth providers, create user with default STUDENT role if doesn't exist
      if (account?.provider === "google") {
        if (!user.email) return false
        
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email }
          })
          
          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                image: user.image,
                role: Role.STUDENT, // Default role for OAuth users
              }
            })
          }
        } catch (error) {
          console.error("Error creating user:", error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      } else if (token.email && (trigger === "signIn" || !token.role)) {
        // Fetch role from database if not in token
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email },
            select: { role: true, id: true }
          })
          if (dbUser) {
            token.role = dbUser.role
            token.id = dbUser.id
          }
        } catch (error) {
          console.error("Error fetching user role:", error)
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as Role
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Admin users go to admin panel, others go to dashboard
      if (url.startsWith("/")) return `${baseUrl}/dashboard`
      else if (new URL(url).origin === baseUrl) return url
      return `${baseUrl}/dashboard`
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
