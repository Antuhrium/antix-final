"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ConnectWallet.module.scss";

import MataMaskIcon from "/public/dashboard/svg/meta-mask.svg";
import WalletConnectIcon from "/public/dashboard/svg/wallet-connect.svg";
import TrustWalletIcon from "/public/dashboard/svg/trust-wallet.svg";
import CoinbaseWalletIcon from "/public/dashboard/svg/coinbase-wallet.svg";
import { useSDK } from "@metamask/sdk-react";
import { useAuthStore } from "@/stores/useAuthStore";

const ConnectWallet: React.FC = () => {
    const [stage, setStage] = useState<0 | 1 | 2>(0);

    const { sdk, account } = useSDK();
    const { isConnected ,setIsConnected, setWalletAdress } = useAuthStore();

    const connectMetamask = async () => {
        try {
            await sdk?.connect();
        } catch (err) {
            console.warn(`No accounts found`, err);
        }
    };

    useEffect(() => {
        if (isConnected) {
            setStage(0);
        } else if (account) {
            setIsConnected(true)
            setWalletAdress(account)
            setStage(0);
        }
    }, [account]);

    if (stage === 0) {
        return null;
    }

    if (stage === 1) {
        return (
            <>
                <div className={styles.bg} />
                <div className={styles.modal}>
                    <p className={styles.modalTitle}>
                        Connect your Wallet to unlock all features
                    </p>
                    <button
                        className={styles.connectBtn}
                        onClick={() => setStage(2)}
                    >
                        Connect Wallet
                    </button>
                </div>
            </>
        );
    }
    if (stage === 2) {
        return (
            <>
                <div className={styles.bg} onClick={() => setStage(1)} />
                <div className={styles.modal}>
                    <p className={styles.modalTitle}>Connect Your Wallet</p>
                    <div className={styles.modalBtns}>
                        <button className={styles.modalBtn} onClick={connectMetamask}>
                            <Image
                                src={MataMaskIcon}
                                alt={"MetaMask"}
                                width={24}
                                height={24}
                            />
                            <p>MetaMask</p>
                            <span>Popular</span>
                        </button>
                        <a href="https://walletconnect.ru/" target="_blank" className={styles.modalBtn}>
                            <Image
                                src={WalletConnectIcon}
                                alt={"WalletConnect"}
                                width={24}
                                height={24}
                            />
                            <p>WalletConnect</p>
                        </a>
                        <a href="https://trustwallet.com/" target="_blank" className={styles.modalBtn}>
                            <Image
                                src={TrustWalletIcon}
                                alt={"Trust Wallet"}
                                width={24}
                                height={24}
                            />
                            <p>Trust Wallet</p>
                        </a>
                        <a href="https://www.coinbase.com/" target="_blank" className={styles.modalBtn}>
                            <Image
                                src={CoinbaseWalletIcon}
                                alt={"Coinbase Wallet"}
                                width={24}
                                height={24}
                            />
                            <p>Coinbase Wallet</p>
                        </a>
                    </div>
                </div>
            </>
        );
    }
};

export default ConnectWallet;
