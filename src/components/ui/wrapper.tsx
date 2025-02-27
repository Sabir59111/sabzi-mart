import React from 'react'

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-scre mx-auto p'>
        {children}
    </div>
  )
}
