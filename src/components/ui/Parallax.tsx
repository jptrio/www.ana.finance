import { Flex, Image } from '@chakra-ui/react'

export default function parallax() {
  return (
    <>
      <Flex
        pos='fixed'
        height='auto'
        left='0'
        right='0'
        top='0'
        bottom='0'
        className='parallax'
      >
        <Image
          src='parallax_bg.png'
          alt=''
          opacity='.35'
          pos='fixed'
          left='0'
          right='0'
          top='0'
          bottom='0'
          minHeight='100%'
          minWidth='100%'
        />
      </Flex>
      <Flex
        pos='fixed'
        height='auto'
        left='0'
        right='0'
        top='0'
        className='parallax'
      >
        <Image
          src='parallax_4.png'
          alt=''
          width='100%'
          height='auto'
          zIndex='3'
        />
      </Flex>
      <Flex
        pos='fixed'
        height='auto'
        left='0'
        right='0'
        bottom='0'
        className='parallax'
      >
        <Image
          src='parallax_3.png'
          alt=''
          width='100%'
          height='auto'
          zIndex='2'
        />
        <Image
          src='parallax_2.png'
          alt=''
          width='100%'
          height='auto'
          pos='fixed'
          zIndex='1'
        />
        <Image
          src='parallax_1.png'
          alt=''
          width='100%'
          height='auto'
          pos='fixed'
          zIndex='0'
        />
      </Flex>
      <Flex
        pos='fixed'
        height='auto'
        left='0'
        right='0'
        bottom='-50px'
        className='parallax'
      >
        <Image
          src='parallax_5.png'
          alt=''
          width='100%'
          height='100%'
          zIndex='5'
        />
      </Flex>
    </>
  )
}