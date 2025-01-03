'use server'
import db from '../lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser()
    if (!user) {
      return { status: 403 }
    }

    console.log(user.firstName)
    console.log(user.imageUrl)
    console.log(user.id)

    const firstName = user.firstName
    const imageUrl = user.imageUrl
    const userId = user.id

    // Check if user.emailAddresses exists and is not empty
    const email = user.emailAddresses?.[0]?.emailAddress
    if (!email) {
      console.log('🔴 ERROR: Email address is missing')
      return { status: 400, message: 'Invalid user data' }
    }

    // Check if the user already exists in the database
    let userExist = await db.user.findUnique({
      where: {
        clerkid: userId,
      },
    })

    if (userExist) {
      console.log('🔵 User exists:', userExist)
      return { status: 200, user: userExist } // Return the existing user
    }

    // If user does not exist, create a new one
    console.log('🔴 User does not exist, creating new user...')
    const newUser = await db.user.create({
      data: {
        clerkid: userId,
        email: email,
        firstname: firstName || 'Unknown',
        imageUrl: imageUrl || null,
        subscription: false,
      },
    })

    if (newUser) {
      return { status: 201, user: newUser }
    }

    return { status: 400 }
  } catch (error) {
    console.log('🔴 ERROR', error)
    return { status: 500 }
  }
}
