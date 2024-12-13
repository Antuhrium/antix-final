import "./globals.scss";
import type {AppProps} from "next/app";
import { useEffect } from "react";
import Web3ModalProvider from "@/utils/Web3ModalProvider";
import Head from 'next/head'
import { Poppins } from "next/font/google";
import { useIsomorphicLayoutEffect } from "react-use";
import {useRouter} from "next/router";
import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/i18n";


const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})
  
export default function App({Component, pageProps: { session, ...pageProps }}: AppProps) {
	const {query} = useRouter()

	useIsomorphicLayoutEffect(() => {
		document.body.style.setProperty("--font-family", poppins.style.fontFamily);
		document.body.className = poppins.className
	}, []);

	// запоминаем рефку по которой впервые пришел пользователь
	useEffect(()=>{
		const refcode = query?.refcode
		if (typeof window === 'undefined') return
		if (refcode && !localStorage.refcode) {
			localStorage.refcode = refcode
		}

		const utms = Object.fromEntries(Object.keys(query)
			.filter(k=>k.startsWith('utm_'))
			.map(key=>[key,query[key]]))

		if (Object.keys(utms).length > 1){
			localStorage.utms = JSON.stringify(utms)
		}
	}, [query])


	return <>
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Head>
		<Web3ModalProvider>
			<I18nextProvider i18n={i18n}>
				<Component {...pageProps} />
			</I18nextProvider>
		</Web3ModalProvider>
	</>
}
