import { motion } from 'framer-motion'
import React from 'react'
import { transition } from '../config/animations'

function Transition({children}: {children: React.ReactNode}) {
  return (
    <motion.div variants={transition} initial="initial" animate="transition" exit="exit">
        {
            children
        }
    </motion.div>
  )
}

export default Transition