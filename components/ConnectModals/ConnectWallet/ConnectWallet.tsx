"use client";

import styles from "./ConnectWallet.module.scss";
import { useConnectWallet } from '@/hooks/useConnectWallet'

const ConnectWallet: React.FC = () => {
    const { isConnected, isReady, connect } = useConnectWallet()

    if (isConnected) return <></>

    return <>
        <div className={styles.bg} />
        {isReady && <div className={styles.modal}>
            <p className={styles.modalTitle}>
                Connect wallet to access token sale
            </p>
            <button
                className={styles.connectBtn}
                onClick={connect}
            >
                Connect Wallet
            </button>
        </div>}
    </>
}

export default ConnectWallet;
