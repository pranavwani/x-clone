import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {Toaster} from "react-hot-toast";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useThemeDetector} from "@/hooks/theme";

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
    useThemeDetector()

    return <div className={inter.className}>
          <QueryClientProvider client={queryClient}>
              <GoogleOAuthProvider clientId='490231693371-08t009kc5eqcdbvk1e0bt8dfi8iksdrq.apps.googleusercontent.com' >
                  <Component {...pageProps} />
                  <Toaster />
                  <ReactQueryDevtools />
              </GoogleOAuthProvider>
          </QueryClientProvider>
    </div>
}
