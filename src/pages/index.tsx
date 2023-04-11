import Image from 'next/image'
import { Inter } from 'next/font/google'
import Button from '@/components/button'
import ClientSection from '@/components/clientSection'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-8 text-center">
      <h1 className='y-4 text-6xl font-bold'>Business Email Rewriter</h1>
      <h2 className='y-4 text-4xl font-bold'>Apply a more professional business tone to your emails!</h2>


      <ClientSection />
    </main>
  )
}
