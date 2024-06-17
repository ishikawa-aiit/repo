/* eslint-disable @typescript-eslint/no-explicit-any */
import { chakra } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export default {
  title: 'Chakra UI System / Core',
}

const MotionBox = motion(chakra.div)

export const Basic = () => {
  return (
    <MotionBox
      w="40px"
      h="40px"
      bg="red.200"
      ml="20px"
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ['20%', '20%', '50%', '50%', '20%'],
      }}
    />
  )
}
