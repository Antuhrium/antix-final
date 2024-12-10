"use client";

import styles from "./DepositForm.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";

import USDTIcon from "/public/svg/tether-icon.svg";
import BNBIcon from "/public/svg/bnb-icon.svg";
import USDCIcon from "/public/svg/usdc-icon.svg";
import DEGENIcon from "/public/svg/degen-coin.svg";
import WETHIcon from "/public/svg/wethera-coin.svg";
import CBBTCIcon from "/public/svg/cbbtc-coin.svg";
import MANTRAIcon from "/public/svg/mantra-coin.svg";
import ETHIcon from "/public/svg/ether-icon.svg";
import TokenIcon from "/public/svg/token-icon.svg";
import BASEIcon from '/public/svg/base-chain.svg';

import TokenBalance from '@/components/TokenBalance'

import DepositButton from "./DepositButton";
import { DepositPopover } from "./DepositPopover/DepositPopover";
import { DepositCheckbox } from "./DepositCheckbox/DepositCheckbox";
import { useConnectWallet } from '@/hooks/useConnectWallet';
import { useNetwork } from '@/hooks/useNetwork';
import Api from "@/utils/api";

import CurrencyButton from "../../../components/CurrencyButton/CurrencyButton";
import { TgIcon } from "../../../../components/GotQuestions/icons/TgIcon";
import { DepositErrIcon } from './icons/DepositErrIcon'
import { GotQuestions } from '@/components/GotQuestions/GotQuestions'
import DepositStatusModal from './DepositModal/StatusModal'
import Input from '@/DashboardStages/Stage2/DashboardTop/Input/Input'


const tokensByChains:any = {
	1: {
        ETH  : '0x0000000000000000000000000000000000000000',
		USDT : '0xdAC17F958D2ee523a2206206994597C13D831ec7',
		USDC : '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
	},
	56: {
        BNB  : '0x0000000000000000000000000000000000000000', // native coin
        // Token USDT (busd) 
		USDT :'0x55d398326f99059fF775485246999027B3197955',
		//  Token USDС 
		USDC :'0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
	},
    8453 : {
		ETH    : '0x0000000000000000000000000000000000000000',
		WETH   : '0x4200000000000000000000000000000000000006',
		USDC   : '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
		CBBTC  : '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
		MANTRA : '0x3992B27dA26848C2b19CeA6Fd25ad5568B68AB98',
		DEGEN  : '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed'
	}
}
const tokensIcons:any = {
    BNB  : BNBIcon,
    USDC : USDCIcon,
    USDT : USDTIcon,
    ETH  : ETHIcon,
    CBBTC : CBBTCIcon,
    DEGEN : DEGENIcon,
    MANTRA : MANTRAIcon,
    WETH : WETHIcon,
    BASE : BASEIcon
}

type AvailableCurrencies = "USDC" | "USDT" | "ETH" | "CBBTC" | "DEGEN" | "MANTRA" | "WETH" | "BNB" | "BASE";

const errString = "Not enough funds to make the deposit";

const DepositForm = () => {
    const { chainId } = useConnectWallet();
    const [amount, setAmount] = useState<string>("0");
    const [balance, setMaxBalance] = useState<string | null>(null);
    const [displayCurrency, setDisplayCurrency] = useState<AvailableCurrencies>("USDC");
    const [openDebit, setOpenDebit] = useState(false);
    const [openETH, setOpenETH] = useState(false);
    const [isBuyChecked, setIsBuyChecked] = useState(true); // условие для чекбокса
    const [error, setError] = useState<string | null>(null);
    const { network } = useNetwork();
    const [receiveValue, setReceiveValue] = useState("0");

    const tokens = tokensByChains[chainId || 1]

    const [tokensRates, setTokensRates] = useState({} as any)
    useEffect(()=>{
        Api.getTokensRate().then(res=>{
            setTokensRates(res)
        })
    }, [])

    useEffect(()=>{
        if (!tokens[displayCurrency]) {
            setDisplayCurrency('ETH')
        }
    }, [chainId])


    const handleMax = () => { 
        if (!balance) return

        if (displayCurrency === 'BNB') {
            // отнимаем коммисию которая понадобится для отправки транзакции
            setAmount((Number(balance) - 0.001).toFixed(6)) 
        } else {
            setAmount(balance) 
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (balance !== null && +balance < +amount) setError(errString);

        const decimals = (displayCurrency==='ETH') ? 18 : 6

        let value = e.target.value;
        let cleanedValue = value
            .replace(/[^0-9.,]/g, "")
            .replace(",", ".")
            .replace(/(\..*)\./g, "$1")
            .replace(/^0+(?=\d)/, "");

        const parts = cleanedValue.split('.')
        if (parts[1]?.length > decimals) {
            cleanedValue = Number(cleanedValue).toFixed(decimals)
        }
        const rate = tokensRates[chainId || 1]?.[tokens[displayCurrency]] || 0.05
        const updatedReceiveValue = (parseFloat(cleanedValue === "" ? "0" : cleanedValue) / rate).toFixed(0);

        setReceiveValue(updatedReceiveValue);

        // Ensure that entered value doesn't exceed balance
        if (Number(balance) > 0 && Number(cleanedValue) > Number(balance)) {
            setAmount(parseFloat(balance || "0").toFixed(decimals)); // Reset to max balance if exceeded
        } else {
            setAmount(cleanedValue === "" ? "0" : cleanedValue);
        }
    }


    return <div className={styles.sendingWrapepr}>
        <div className={styles.chooseCurrWrapper}>
            {network.value === 'ETH' && (
                <button
                    onClick={() => setDisplayCurrency("ETH")}
                    className={`${styles.chooseCurrBtn} ${
	                displayCurrency === "ETH"
	                    ? styles.activeChooseCurrBtn
	                    : ""
                    }`}
                >
                    <Image src={network.icon} alt={network.value} width={24} height={24} />
                    <span>ETH</span>
                </button>
            )}

            {network.value === 'BNB' && (
                <button
                    onClick={() => setDisplayCurrency('BNB')}
                    className={`${styles.chooseCurrBtn} ${
	                displayCurrency === "BNB"
	                    ? styles.activeChooseCurrBtn
	                    : ""
                    }`}
                >
                    <Image src={network.icon} alt={network.value} width={24} height={24} />
                    <span>BNB</span>
                </button>
            )}

            {['ETH','BNB'].includes(network.value) && <button
                onClick={() => setDisplayCurrency('USDT')}
                className={`${styles.chooseCurrBtn} ${
                    displayCurrency === "USDT"
                        ? styles.activeChooseCurrBtn
                        : ""
                }`}
            >
                <Image src={USDTIcon} alt="USDT" width={24} height={24} />
                <span>USDT</span>
            </button>}

            {network.value === 'BASE' && <>
            <button
                onClick={() => setDisplayCurrency('BASE')}
                className={`${styles.chooseCurrBtn} ${
                displayCurrency === "BASE"
                    ? styles.activeChooseCurrBtn
                    : ""
                }`}
            >
                <Image src={network.icon} alt={network.value} width={24} height={24} />
                <span>BASE</span>
            </button>

            <button
                onClick={() => setDisplayCurrency('DEGEN')}
                className={`${styles.chooseCurrBtn} ${
                    displayCurrency === "DEGEN"
                        ? styles.activeChooseCurrBtn
                        : ""
                }`}
            >
                <Image src={DEGENIcon} alt="DEGEN" width={24} height={24} />
                <span>DEGEN</span>
            </button>

            <button
                onClick={() => setDisplayCurrency('WETH')}
                className={`${styles.chooseCurrBtn} ${
                    displayCurrency === "WETH"
                        ? styles.activeChooseCurrBtn
                        : ""
                }`}
            >
                <Image src={WETHIcon} alt="WETH" width={24} height={24} />
                <span>WETH</span>
            </button>

            <button
                onClick={() => setDisplayCurrency('CBBTC')}
                className={`${styles.chooseCurrBtn} ${
                    displayCurrency === "CBBTC"
                        ? styles.activeChooseCurrBtn
                        : ""
                }`}
            >
                <Image src={CBBTCIcon} alt="cbBTC" width={24} height={24} />
                <span>cbBTC</span>
            </button>

            <button
                onClick={() => setDisplayCurrency('MANTRA')}
                className={`${styles.chooseCurrBtn} ${
                    displayCurrency === "MANTRA"
                        ? styles.activeChooseCurrBtn
                        : ""
                }`}
            >
                <Image src={MANTRAIcon} alt="MANTRA" width={24} height={24} />
                <span>Mantra</span>
            </button>
            </>}

            <button
                onClick={() => setDisplayCurrency('USDC')}
                className={`${styles.chooseCurrBtn} ${
                    displayCurrency === "USDC"
                        ? styles.activeChooseCurrBtn
                        : ""
                }`}
            >
                <Image src={USDCIcon} alt="USDC" width={24} height={24} />
                <span>USDC</span>
            </button>

        </div>

        <div
            style={{ border: error ? "1px solid #BF3434" : "" }}
            className={styles.sending}
        >
            <div className={styles.sendingTop}>
                <span className={styles.sendingTitle}>You send</span>
                <div className={styles.sendingBalance}>
                    <span>
                    <TokenBalance tokenAddress={tokens[displayCurrency]} onChange={setMaxBalance} />
                    </span>
                    <button onClick={handleMax} className={styles.sendingBalanceBtn}>
                        Max
                    </button>
                </div>
            </div>

            <div className={styles.sendingBottom}>
                <input
                    value={amount}
                    onChange={handleInputChange}
                    className={styles.sendingInput}
                    type="text"
                    placeholder="Enter amount"
                    style={{
                        color:
                            amount === "0"
                                ? "rgba(255, 255, 255, 0.4)"
                                : "#fff",
                    }}
                />
                <CurrencyButton displayCurrency={displayCurrency} icon={tokensIcons[displayCurrency]} />
            </div>


            {error && (
                <div className={styles.errWrapper}>
                    <DepositErrIcon />
                    <span className={styles.err}>{error}</span>
                </div>
            )}
        </div>
        <Input
            value={receiveValue}
            title="ANTIX you receive"
            onChangeValue={() => {}}
            icon={TokenIcon}
            price={"$0.05"}
            style={{
                background: 'unset',
                border: '1px solid rgba(255, 255, 255, .1)',
                marginTop: 12
            }}
        />

        <DepositButton 
            amount={amount}
            type={isBuyChecked ? 'BUY' : 'DEPOSIT'} 
            tokenAddress={tokens[displayCurrency]} 
        />

        {/* <div className={styles.agreement}>
            <DepositCheckbox
                isChecked={isBuyChecked}
                onChange={()=>setIsBuyChecked(prev=>!prev)}
                children="Automatically buy ANTIX from deposit when Stage 2 starts"
            />
        </div> */}

        <GotQuestions />

        <div className={styles.disclaimer}>
            <span>By clicking "Deposit Now," you confirm that you are not a U.S. citizen
            or U.S. resident.</span> This investment offer is exclusively intended for
            non-U.S. persons and is strictly not available to U.S. citizens, U.S.
            residents, or any entities organized or domiciled in the United States.
        </div>
    </div>
};

// antix you receive input
// <Input
        //     value={receiveValue}
        //     title="ANTIX you receive"
        //     onChangeValue={() => {}}
        //     icon={TokenIcon}
        //     price={"$0.03"}
        //     style={{
        //         background: 'unset',
        //         border: '1px solid rgba(255, 255, 255, .1)',
        //         marginTop: 12
        //     }}
        // />

export default DepositForm;
