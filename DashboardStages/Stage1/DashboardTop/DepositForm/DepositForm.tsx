"use client";

import styles from "./DepositForm.module.scss";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import TetherIcon from "/public/svg/tether-icon.svg";
import BNBIcon from "/public/svg/bnb-icon.svg";
import USDCIcon from "/public/svg/usdc-icon.svg";
import ETHIcon from "/public/svg/ether-icon.svg";
import TokenIcon from "/public/svg/token-icon.svg";

import Mastercard from "/public/dashboard/svg/mastercard-logo.svg";
import Visa from "/public/dashboard/svg/visa-logo.svg";
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
import { useTranslation } from "react-i18next";


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
	}
}
const tokensIcons:any = {
    BNB  : BNBIcon,
    USDT : TetherIcon,
    USDC : USDCIcon,
    ETH  : ETHIcon
}

interface IDepositForm {
}

// const errString = "Not enough funds to make the deposit";

const DepositForm: React.FC<IDepositForm> = () => {
    const { chainId } = useConnectWallet();
    const [amount, setAmount] = useState<string>("0");
    const [balance, setMaxBalance] = useState<string | null>(null);
    const [displayCurrency, setDisplayCurrency] = useState<"BNB" | "USDT" | "USDC" | "CARD" | "ETH">("USDT");
    const [openDebit, setOpenDebit] = useState(false);
    const [openETH, setOpenETH] = useState(false);
    const [isBuyChecked, setIsBuyChecked] = useState(true); // условие для чекбокса
    const [error, setError] = useState<string | null>(null);
    const { network } = useNetwork();
    const [receiveValue, setReceiveValue] = useState("0");

    const { t } = useTranslation('dashboard');

    const tokens = tokensByChains[chainId || 1]

    const [tokensRates, setTokensRates] = useState({} as any)
    useEffect(()=>{
        Api.getTokensRate().then(res=>{
            setTokensRates(res)
        })
    }, [])

    useEffect(()=>{
        if (!tokens[displayCurrency]) {
            setDisplayCurrency('USDT')
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
        if (balance !== null && +balance < +amount) setError(t('stage.form.error'));

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
            <button
                onClick={()=>setDisplayCurrency('USDT')}
                className={`${styles.chooseCurrBtn} ${
                    displayCurrency === "USDT"
                        ? styles.activeChooseCurrBtn
                        : ""
                }`}
            >
                <Image src={TetherIcon} alt="USDT" width={24} height={24} />
                <span>USDT</span>
            </button>

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

            <span className={styles.divider} />

            <DepositPopover open={openDebit} text={t('stage.form.soon')}>
                <button
                    onClick={() => setOpenDebit((p) => !p)}
                    onBlur={() => setOpenDebit(false)}
                    className={styles.chooseCurrBtn}
                    style={{ width: 100 }}
                >
                    <Image src={Visa} alt="visa" width={37.7} height={12.73} />
                    <Image
                        src={Mastercard}
                        alt="mastercard"
                        width={29.2}
                        height={22.5}
                    />
                </button>
            </DepositPopover>
        </div>

        <div
            style={{ border: error ? "1px solid #BF3434" : "" }}
            className={styles.sending}
        >
            <div className={styles.sendingTop}>
                <span className={styles.sendingTitle}>{t('stage.form.send')}</span>
                <div className={styles.sendingBalance}>
                    <span>
                    <TokenBalance tokenAddress={tokens[displayCurrency]} onChange={setMaxBalance} />
                    </span>
                    <button onClick={handleMax} className={styles.sendingBalanceBtn}>
                        {t('stage.form.max')}
                    </button>
                </div>
            </div>

            <div className={styles.sendingBottom}>
                <input
                    value={amount}
                    onChange={handleInputChange}
                    className={styles.sendingInput}
                    type="text"
                    placeholder={t('stage.form.enter')}
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
            title={`ANTIX ${t('stage.form.receive')}`}
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
            <span>{t('stage.form.disclaimer.span')}</span>
            {t('stage.form.disclaimer.text')}
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
