import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React from 'react'

const Container = ({ className, children, delay = 0.2, reverse }) => {
  return (
    <motion.div
      className={cn('w-full h-full', className)}
      initial={{ opacity: 0, y: reverse ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: delay, duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export default Container
