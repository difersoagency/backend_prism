import { Button } from '@/components/ui/button'
import React from 'react'
import './globals.css'



export default function Home() {
  return (
    <div className='px-10'>
      <header className='w-full'>
        <div className='grid grid-cols-5 w-full gap-6'>
          <div className='text-center bg-red-500 col-span-2 flex justify-between'>
            <a href="">Satu</a><a href="">Dua</a><a href="">Tiga</a>
          </div>
          <p className='text-center bg-red-500'>Logo</p>
          <p className='text-center bg-red-500 col-span-2'>Menu Dua</p>
        </div>
      </header>

      <section id='timline'>
        
      </section>

      <section>

      </section>
    </div>
  )
}
