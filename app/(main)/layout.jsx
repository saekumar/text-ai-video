'use client'
import Footer from '@/components/navigation/footer'
import Navbar from '@/components/navigation/navbar'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const ContentLayout = ({ children }) => {
  const router = useRouter()
  const { user } = useUser()
  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user])
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default ContentLayout
