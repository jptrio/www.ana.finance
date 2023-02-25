import { ReactNode } from 'react'

export default function Card({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className='p-8 bg-green-900 shadow-lg rounded-xl'>
      <h2 className='text-2xl mb-6 text-center'>{title}</h2>
      {children}
    </div>
  )
}
