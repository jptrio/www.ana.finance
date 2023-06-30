import NextImage from 'next/image'

export default function parallax() {
  return (
    <>
      <NextImage
        src='/mt_bw.png'
        alt=''
        fill
        quality={50}
        style={{
          objectFit: 'cover',
          opacity: '.35',
          zIndex: 0,
          objectPosition: 'center bottom',
        }}
      />

     {/*  <NextImage
        src='/parallax_4.png'
        alt=''
        fill
        quality={50}
        style={{
          objectFit: 'contain',
          zIndex: 3,
          objectPosition: 'center top',
        }}
      />

      <NextImage
        src='/parallax_1.png'
        alt=''
        fill
        quality={50}
        style={{
          objectFit: 'contain',
          zIndex: 0,
          objectPosition: 'center bottom',
        }}
      />

      <NextImage
        src='/parallax_2.png'
        alt=''
        fill
        quality={50}
        style={{
          objectFit: 'contain',
          zIndex: 1,
          objectPosition: 'center bottom',
        }}
      />

      <NextImage
        src='/parallax_3.png'
        alt=''
        fill
        quality={50}
        style={{
          objectFit: 'contain',
          zIndex: 2,
          objectPosition: 'center bottom',
        }}
      />

      <NextImage
        quality={50}
        alt=''
        fill
        src='/parallax_5.png'
        style={{
          objectFit: 'contain',
          objectPosition: 'center bottom',
          zIndex: 5,
        }}
      /> */}
    </>
  )
}
