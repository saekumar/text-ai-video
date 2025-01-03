import { PrismaClient } from '@prisma/client'

let db

// Check if `prisma` is already defined on the global object
if (global.prisma) {
  db = global.prisma
} else {
  db = new PrismaClient()
  if (process.env.NODE_ENV !== 'production') {
    global.prisma = db // Cache the Prisma client in development mode
  }
}

export default db
