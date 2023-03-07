import { Box, BoxProps } from '@chakra-ui/react'
import NextImage, { ImageProps } from 'next/image'

type NextImageChakraProps = {
  src: string
  alt: string
} & Omit<BoxProps, 'as'>

export default function ChakraNextImage({
  src,
  alt,
  ...rest
}: NextImageChakraProps) {
  return (
    <Box position='relative' {...rest}>
      <NextImage src={src} alt={alt} fill style={{ objectFit: 'cover' }} />
    </Box>
  )
}
