"use client"
import styles from "./DepositButton.module.scss";
import { useConnectWallet } from '@/hooks/useConnectWallet'
import { useDeposit } from '@/hooks/useDeposit'
import { useReadContract, useWriteContract, useWaitForTransactionReceipt} from "wagmi";
import { useNetwork } from '@/hooks/useNetwork'
import { useState, useEffect} from "react";
import { parseUnits, formatUnits } from 'viem';
import DepositStatusModal from './DepositModal/StatusModal'
import { useTranslation } from "react-i18next";

const contractsAddresses:any = {
    1    : process.env.TOKENSALE_ETH,
    56   : process.env.TOKENSALE_BSC,
	8453 : process.env.TOKENSALE_BASE
}

const erc20minABI = [{
	name            : 'allowance',
	type            : 'function',
	inputs          : [{ name: '_owner', type: 'address' }, { name: '_spender', type: 'address' }],
	outputs         : [{ name: '', type: 'uint256' }],
	constant        : true,
	payable         : false,
	stateMutability : 'view'
  }, {
	name            : 'approve',
	type            : 'function',
	inputs          : [{ name: '_spender', type: 'address' }, { name: '_value', type: 'uint256' }],
	outputs         : [],
	constant        : false,
	payable         : false,
	stateMutability : 'nonpayable'
  }
]


const tokensDecimalsByChains:any = {
	1: {
		// eth native coin
		'0x0000000000000000000000000000000000000000': 18,
		'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee': 18,
		// usdt
		'0xdAC17F958D2ee523a2206206994597C13D831ec7': 6,
		// usdc
		'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 6,
	},
	56: {
		'0x0000000000000000000000000000000000000000': 18,
        // Token USDT (busd) 
		'0x55d398326f99059fF775485246999027B3197955': 18,
		//  Token USDС 
		'0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d': 18,
	},
	8453: {
		'0x0000000000000000000000000000000000000000': 18,
		'0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913': 6,
		'0x4200000000000000000000000000000000000006': 18,
		'0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf': 8,
		'0x3992B27dA26848C2b19CeA6Fd25ad5568B68AB98': 18,
		'0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed': 18,
	}
}

const nativeCoins = [
	'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
	'0x0000000000000000000000000000000000000000',
]

interface IDepositButton {
    amount: string|number
    type: 'BUY' | 'DEPOSIT'
    tokenAddress: `0x${string}`
}

export default function DepositButton({amount, type, tokenAddress}:IDepositButton){
    const { address, isConnected, chainId, connect } = useConnectWallet()
    const { switchNetwork } = useNetwork()
    const contractAddress = contractsAddresses[chainId || 1]
	const tokensDecimals = tokensDecimalsByChains[chainId || 1]

	const { t } = useTranslation('dashboard');

	const isNativeCoin = nativeCoins.includes(tokenAddress)

    const allowanceResult:any = useReadContract({
        chainId: Number(chainId),
		address: tokenAddress, 
		abi: erc20minABI,
		functionName: 'allowance',
		args: [ address, contractAddress ],
	})
	const [approveData, setApproveData] = useState({ approved: false, amount: 0 })
	const allowance = approveData.approved ? approveData.amount : Number(formatUnits(allowanceResult?.data || '0', tokensDecimals[tokenAddress]))

	// Approve
	const [apprveInProgress, setApproveInProgress] = useState(false)
	const { data: approveTxHash, writeContract: approveWriteContract, error:appoveError, isError: isApproveError } = useWriteContract()
	const { isSuccess: isApproveConfirmed } = useWaitForTransactionReceipt({ hash: approveTxHash })

	function approve(){
		if (Number(amount) === 0) {
			return alert('Please enter stake amount')
		}
		setApproveData({ approved: false, amount: Number(amount) })
		setApproveInProgress(true)

		approveWriteContract({
			address: tokenAddress,
			abi: erc20minABI,
			functionName: 'approve',
			args: [ contractAddress, parseUnits(String(amount), tokensDecimals[tokenAddress]) ],
		})
	}
	
	useEffect(() => {
		if (!isApproveError) return
        console.error(appoveError)
		setApproveInProgress(false)
	}, [isApproveError])

	useEffect(() => {
		if (!approveTxHash) return
		setApproveInProgress(false)
		setApproveData({ ...approveData, approved: isApproveConfirmed })
	}, [isApproveConfirmed])


    const { depositTxHash, status, depositError, makeDeposit } = useDeposit()
    function deposit(){
        makeDeposit(type, String(amount), tokenAddress)
    }

	// First connect wallet
	if (!isConnected) {
		return <button onClick={() => connect()} className={styles.depositBtn}>
			{t('stage.depositBtn.connect')}
			<span className={styles.flare}></span>
		</button>
	}

	// Switch network 
	if (![1,56].includes(Number(chainId))) {
		return <button onClick={() => switchNetwork(1)} className={styles.depositBtn}>
			{t('stage.depositBtn.switch')}
		</button>
	}

	// Approve amount
	if (!isNativeCoin && (allowance < Number(amount) || Number(amount) === 0)) {
		return <button onClick={() => approve()} disabled={apprveInProgress || Number(amount) <= 0} className={styles.depositBtn}>
            {Number(amount) <= 0 
                ? t('stage.depositBtn.enter')
                : apprveInProgress ? t('stage.depositBtn.tx') : t('stage.depositBtn.approve')
            }
			<span className={styles.flare}></span>
        </button>
	}

    // Deposit
    return <>
        <button onClick={deposit} className={styles.depositBtn} disabled={!Number(amount)}>
            {status==='pending' ? t('stage.depositBtn.process') : t('stage.depositBtn.deposit')}
			<span className={styles.flare}></span>
		</button>

		<DepositStatusModal txHash={String(depositTxHash)} status={status} retryFn={deposit} />
    </>
}