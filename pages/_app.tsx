import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Inter} from 'next/font/google'
import {GoogleOAuthProvider} from '@react-oauth/google'
import {Toaster} from "react-hot-toast";
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useThemeDetector} from "@/hooks/theme";
import {RecoilRoot} from "recoil";

const inter = Inter({subsets: ['latin']})

const queryClient = new QueryClient()

export default function App({Component, pageProps}: AppProps) {
    useThemeDetector()

    return <div className={inter.className}>
        <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
                <RecoilRoot>
                    <Component {...pageProps} />
                </RecoilRoot>
                <Toaster/>
                <ReactQueryDevtools/>
            </GoogleOAuthProvider>
        </QueryClientProvider>
    </div>
}
