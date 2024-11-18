import {WagmiProvider } from "wagmi";
// import { config as wagmiConfig } from "@/utils/wagmiConfig"

import { createAppKit } from '@reown/appkit/react'
import { bsc, mainnet } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react'

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";

export const projectId = process.env.WALLET_CONNECT_ID

interface Web3ModalProviderProps {
	children: ReactNode
}

/**
 * Web3ModalProvider Component
 * @constructor
 */
export default function Web3ModalProvider({children}: Web3ModalProviderProps) {
	const queryClient = new QueryClient()
	if (!projectId) throw new Error('Project ID is not defined')

	const wagmiAdapter = new WagmiAdapter({
		networks: [mainnet, bsc],
		projectId
	})

	const metadata:any = {
		name: 'Antix.in',
		description: 'The new era of AI-powered digital humans is here',
		url: 'https://' + process.env.DOMAIN,
		icons: ['https://token.antix.in/_next/static/media/logo-full.723219c1.svg']
	}
	
	createAppKit({
		adapters: [wagmiAdapter],
		networks: [mainnet, bsc],
		allowUnsupportedChain: false,
		defaultNetwork: mainnet,
		metadata: metadata,
		projectId,
		allWallets: 'HIDE',
		features: {
			onramp: false,
			email: false,
			socials: [],
			emailShowWallets: false,
		  	analytics: false,
			history: false
		},
		includeWalletIds: [ // ids - https://walletguide.walletconnect.network/
			// metamask
			'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96'
		],
		// customWallets: [
		// 	{
		// 	  id: 'mobileMetamask',
		// 	  name: 'Open in mobile Metamask',
		// 	  image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxLjAwMzggMi42MTA4N0wxMy4xOTk4IDguNDMxMkwxNC42NDMgNC45OTcyOEwyMS4wMDM4IDIuNjEwODdaIiBmaWxsPSIjRTI3NjFCIi8+CjxwYXRoIGQ9Ik0yLjk4Nzk2IDIuNjEwODdMMTAuNzI5MSA4LjQ4NjMzTDkuMzU2NTkgNC45OTcyOEwyLjk4Nzk2IDIuNjEwODdaTTE4LjE5NTggMTYuMTAyNEwxNi4xMTc0IDE5LjNMMjAuNTY0NCAyMC41Mjg3TDIxLjg0MjkgMTYuMTczM0wxOC4xOTU4IDE2LjEwMjRaTTIuMTY0NDMgMTYuMTczM0wzLjQzNTAyIDIwLjUyODdMNy44ODIwOCAxOS4zTDUuODAzNjQgMTYuMTAyNEwyLjE2NDQzIDE2LjE3MzNaIiBmaWxsPSIjRTQ3NjFCIi8+CjxwYXRoIGQ9Ik03LjYzMTE4IDEwLjY5OTVMNi4zOTE5NyAxMi41ODE4TDEwLjgwNzcgMTIuNzc4N0wxMC42NTA4IDguMDEzNzdMNy42MzExOCAxMC42OTk1Wk0xNi4zNjA2IDEwLjY5OTVMMTMuMzAxOCA3Ljk1ODY0TDEzLjE5OTggMTIuNzc4N0wxNy42MDc3IDEyLjU4MThMMTYuMzYwNiAxMC42OTk1Wk03Ljg4MjE2IDE5LjNMMTAuNTMzMSAxOC4wMDA1TDguMjQyOTUgMTYuMjA0OEw3Ljg4MjE2IDE5LjNaTTEzLjQ1ODYgMTguMDAwNUwxNi4xMTc1IDE5LjNMMTUuNzQ4OCAxNi4yMDQ4TDEzLjQ1ODYgMTguMDAwNVoiIGZpbGw9IiNFNDc2MUIiLz4KPHBhdGggZD0iTTE2LjExNzQgMTkuM0wxMy40NTg1IDE4LjAwMDVMMTMuNjcwMyAxOS43NDExTDEzLjY0NjggMjAuNDczNUwxNi4xMTc0IDE5LjNaTTcuODgyMDggMTkuM0wxMC4zNTI3IDIwLjQ3MzVMMTAuMzM3IDE5Ljc0MTFMMTAuNTMzMSAxOC4wMDA1TDcuODgyMDggMTkuM1oiIGZpbGw9IiNEN0MxQjMiLz4KPHBhdGggZD0iTTEwLjM5MTkgMTUuMDU0OUw4LjE4MDE4IDE0LjQwMTJMOS43NDA5NiAxMy42ODQ0TDEwLjM5MTkgMTUuMDU0OVpNMTMuNTk5OCAxNS4wNTQ5TDE0LjI1MDggMTMuNjg0NEwxNS44MTk0IDE0LjQwMTJMMTMuNTk5OCAxNS4wNTQ5WiIgZmlsbD0iIzIzMzQ0NyIvPgo8cGF0aCBkPSJNNy44ODIxNCAxOS4zTDguMjU4NjEgMTYuMTAyNEw1LjgwMzcxIDE2LjE3MzNMNy44ODIxNCAxOS4zWk0xNS43NDEgMTYuMTAyNEwxNi4xMTc0IDE5LjNMMTguMTk1OSAxNi4xNzMzTDE1Ljc0MSAxNi4xMDI0Wk0xNy42MDc2IDEyLjU4MThMMTMuMTk5OCAxMi43Nzg3TDEzLjYwNzYgMTUuMDU0OUwxNC4yNTg2IDEzLjY4NDVMMTUuODI3MiAxNC40MDEyTDE3LjYwNzYgMTIuNTgxOFpNOC4xODAxOCAxNC40MDEyTDkuNzQ4ODEgMTMuNjg0NUwxMC4zOTE5IDE1LjA1NDlMMTAuODA3NiAxMi43Nzg3TDYuMzkxOTUgMTIuNTgxOEw4LjE4MDE4IDE0LjQwMTJaIiBmaWxsPSIjQ0Q2MTE2Ii8+CjxwYXRoIGQ9Ik02LjM5MTk3IDEyLjU4MThMOC4yNDI5NSAxNi4yMDQ4TDguMTgwMiAxNC40MDEyTDYuMzkxOTcgMTIuNTgxOFpNMTUuODI3MyAxNC40MDEyTDE1Ljc0ODggMTYuMjA0OEwxNy42MDc3IDEyLjU4MThMMTUuODI3MyAxNC40MDEyWk0xMC44MDc3IDEyLjc3ODdMMTAuMzkyIDE1LjA1NDlMMTAuOTA5NiAxNy43NDA2TDExLjAyNzMgMTQuMjA0M0wxMC44MDc3IDEyLjc3ODdaTTEzLjE5OTggMTIuNzc4N0wxMi45ODggMTQuMTk2NEwxMy4wODIyIDE3Ljc0MDZMMTMuNjA3NyAxNS4wNTQ5TDEzLjE5OTggMTIuNzc4N1oiIGZpbGw9IiNFNDc1MUYiLz4KPHBhdGggZD0iTTEzLjYwNzYgMTUuMDU0OUwxMy4wODIxIDE3Ljc0MDZMMTMuNDU4NiAxOC4wMDA1TDE1Ljc0ODggMTYuMjA0OEwxNS44MjcyIDE0LjQwMTJMMTMuNjA3NiAxNS4wNTQ5Wk04LjE4MDE4IDE0LjQwMTJMOC4yNDI5MiAxNi4yMDQ4TDEwLjUzMzEgMTguMDAwNUwxMC45MDk2IDE3Ljc0MDZMMTAuMzkxOSAxNS4wNTQ5TDguMTgwMTggMTQuNDAxMloiIGZpbGw9IiNGNjg1MUIiLz4KPHBhdGggZD0iTTEzLjY0NjggMjAuNDczNUwxMy42NzAzIDE5Ljc0MTFMMTMuNDc0MiAxOS41Njc4SDEwLjUxNzRMMTAuMzM3IDE5Ljc0MTFMMTAuMzUyNyAyMC40NzM1TDcuODgyMDggMTkuM0w4Ljc0NDgzIDIwLjAwODlMMTAuNDkzOCAyMS4yMjk2SDEzLjQ5NzhMMTUuMjU0NiAyMC4wMDg5TDE2LjExNzQgMTkuM0wxMy42NDY4IDIwLjQ3MzVaIiBmaWxsPSIjQzBBRDlFIi8+CjxwYXRoIGQ9Ik0xMy40NTg2IDE4LjAwMDVMMTMuMDgyMSAxNy43NDA2SDEwLjkwOTZMMTAuNTMzMSAxOC4wMDA1TDEwLjMzNyAxOS43NDExTDEwLjUxNzQgMTkuNTY3OEgxMy40NzQzTDEzLjY3MDQgMTkuNzQxMUwxMy40NTg2IDE4LjAwMDVaIiBmaWxsPSIjMTYxNjE2Ii8+CjxwYXRoIGQ9Ik0yMS4zMzMxIDguODA5MjVMMjEuOTk5OCA1LjU5NTg2TDIxLjAwMzcgMi42MTA4N0wxMy40NTg2IDguMjM0M0wxNi4zNjA1IDEwLjY5OTVMMjAuNDYyNSAxMS45MDQ1TDIxLjM3MjMgMTAuODQxMkwyMC45ODAxIDEwLjU1NzdMMjEuNjA3NiA5Ljk4Mjc2TDIxLjEyMTMgOS42MDQ3MkwyMS43NDg4IDkuMTI0MjlMMjEuMzMzMSA4LjgwOTI1Wk0xLjk5OTc2IDUuNTk1ODZMMi42NjY0MiA4LjgwOTI1TDIuMjQyODkgOS4xMjQyOUwyLjg3MDM0IDkuNjA0NzJMMi4zOTE5MSA5Ljk4Mjc2TDMuMDE5MzYgMTAuNTU3N0wyLjYyNzIxIDEwLjg0MTJMMy41MjkxNyAxMS45MDQ1TDcuNjMxMTMgMTAuNjk5NUwxMC41MzMxIDguMjM0M0wyLjk4Nzk5IDIuNjEwODdMMS45OTk3NiA1LjU5NTg2WiIgZmlsbD0iIzc2M0QxNiIvPgo8cGF0aCBkPSJNMjAuNDYyNSAxMS45MDQ1TDE2LjM2MDUgMTAuNjk5NUwxNy42MDc2IDEyLjU4MThMMTUuNzQ4NyAxNi4yMDQ4TDE4LjE5NTggMTYuMTczM0gyMS44NDI5TDIwLjQ2MjUgMTEuOTA0NVpNNy42MzExIDEwLjY5OTVMMy41MjkxMyAxMS45MDQ1TDIuMTY0NDMgMTYuMTczM0g1LjgwMzY0TDguMjQyODYgMTYuMjA0OEw2LjM5MTg4IDEyLjU4MThMNy42MzExIDEwLjY5OTVaTTEzLjE5OTcgMTIuNzc4N0wxMy40NTg1IDguMjM0MjlMMTQuNjUwNyA0Ljk5NzI4SDkuMzU2NTlMMTAuNTMzMSA4LjIzNDI5TDEwLjgwNzYgMTIuNzc4N0wxMC45MDE3IDE0LjIxMjFMMTAuOTA5NSAxNy43NDA2SDEzLjA4MjFMMTMuMDk3OCAxNC4yMTIxTDEzLjE5OTcgMTIuNzc4N1oiIGZpbGw9IiNGNjg1MUIiLz4KPC9zdmc+',
		// 	  mobile_link: 'https://metamask.app.link/dapp/token.antix.in/?c='
		// 	}
		// ]
	})

	// @IMPORTANT: this hooks need in this place, 
	// for re-render this component
	// for correct work of wagmi when reown network changed
	const { isConnected } = useAppKitAccount()
	const { chainId } = useAppKitNetwork()
	console.info('isConnected', isConnected, {chainId})

	return <WagmiProvider config={wagmiAdapter.wagmiConfig}>
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	</WagmiProvider>
}
