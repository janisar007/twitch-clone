import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{baseTheme: dark}}>
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          forcedTheme='dark'
          storageKey='playground-theme'
        >
        {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}



//ngrok stable url -> https://logical-dragon-pleasing.ngrok-free.app

// to get this url first run the `npm run dev`
// and then run `ngrok http --domain=logical-dragon-pleasing.ngrok-free.app 3000` into a different terminal.
//and then you will get the forwarding url. that will remains the same.

//for database table url run `npx prisma studio`