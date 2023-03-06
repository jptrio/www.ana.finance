import { Box, Image } from '@chakra-ui/react'

export default function phuqingGuy() {
  return (
    <Box
      height='auto'
      width='auto'
      position='fixed'
      top='50px'
      right='-15px'
      zIndex='9'
    >
      <Image
        src='phuqingGuy.png'
        alt=''
        width='300px'
        height='auto'
        transform='scaleX(-1)'
      />
    </Box>
  )
}
