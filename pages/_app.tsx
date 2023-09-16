import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {Toaster} from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return <div className={inter.className}>
      <GoogleOAuthProvider clientId='490231693371-08t009kc5eqcdbvk1e0bt8dfi8iksdrq.apps.googleusercontent.com' >
        <Component {...pageProps} />
          <Toaster />
      </GoogleOAuthProvider>

    </div>
}
