"use client";

import { useConnectWallet } from '@/hooks/useConnectWallet'
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";
import gsap from "gsap";
import {
    links,
    linksDashboard,
    mobileLinks,
    mobileLinksDashboard,
} from "./mocdata";
import { formatAddress } from "../../utils/utils";
import { scrollToId } from "../../utils/scrollToId";

import { BurgerButton } from "../AntixToken/components/BurgerButton/BurgerButton";
import DisConnect from "../../components/ConnectModals/DisConnect/DisConnect";

import LogoFull from "/public/svg/logo-full.svg";
import LogoSmall from "/public/svg/logo-small.svg";
import UserIcon from "/public/svg/user-icon.svg";
import DisconnectIcon from "/public/svg/disconnect-icon.svg";
import WalletIcon from "/public/svg/wallet-icon.svg";
import { FadeInNew } from "../../components/FadeInNew/FadeInNew";
import arrow from '/public/dashboard/svg/arrow-down.svg';
import ChainsDropdown from '@/components/ChainsDropdown/ChainsDropdown';
import { useUserCountry } from '@/hooks/useUserCountry';
import usePlaceholderStore from '@/stores/usePlaceholderStore';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
    isDashboard?: boolean;
    isNews?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDashboard, isNews }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isDisconnectModal, setIsDisconnectModal] = useState(false);
    const [openPopover, setOpenPopover] = useState(false);

    const headerRef = useRef<HTMLDivElement | null>(null);

    const {connect, isConnected, isReady, account} = useConnectWallet()

    const { setBlocked } = usePlaceholderStore();
    const countryCode = useUserCountry();
    const { t } = useTranslation('landing');

    useEffect(() => {
        if (countryCode === "US" && account) {
            setBlocked(true);
        }
    }, [account, countryCode]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (headerRef.current) {
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    gsap.to(headerRef.current, { y: -200, duration: 0.1 });
                } else if (currentScrollY < lastScrollY) {
                    gsap.to(headerRef.current, { y: 0, duration: 0.1 });
                }
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    const handleClick = (id: string) => {
        scrollToId(id)
        setIsOpen(false);
    };

    const linksList = isDashboard ? linksDashboard : links;
    const mobileLinksList = isDashboard ? mobileLinksDashboard : mobileLinks;

    const pathName = usePathname()

    return (
        <>
            {isDisconnectModal && isConnected && <DisConnect setIsOpen={setIsDisconnectModal} />}
            <div
                className={`${styles.mobile} ${
                    isOpen ? styles.activeMobile : ""
                }`}
            >
                <div
                    className={`${styles.mobileMenuBg} ${
                        isOpen ? styles.activeMobileMenuBg : ""
                    }`}
                ></div>
                <div
                    className={`${styles.mobileMenu} ${
                        isOpen ? styles.activeMobileMenu : ""
                    }`}
                >
                    {mobileLinksList.map((link, index) => (
                        <button
                            onClick={() => handleClick(link.href)}
                            key={link.label}
                            className={styles.mobileLink}
                            style={{
                                justifyContent: link.icon ? "" : "center",
                                background: link.href === pathName ? "#F0F0F033" : "#F0F0F00A"
                            }}
                            disabled={link.disabled}
                        >
                            {link.icon && (
                                <div className={styles.mobileLinkImg}>
                                    <Image
                                        src={link.icon}
                                        alt={link.label}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            )}
                            {isDashboard ? t(`header.mobileLinksDashboard.${index}`) : t(`header.mobileLinks.${index}`)}
                            {link.label.toLowerCase() === "claim" && <span>{t('header.claimPopoverText')}</span>}
                        </button>
                    ))}
                    <div className={styles.mobileChooseChain}>
                        <ChainsDropdown />
                    </div>
                </div>
            </div>
            <header
                className={`${styles.wrapper} ${
                    isOpen ? styles.openWrapper : ""
                }`}
                ref={headerRef}
            >
                <div className={styles.logo}>
                    <Image
                        src={LogoFull}
                        alt="Logo"
                        className={`${styles.logoFull} ${
                            isOpen ? styles.openLogoFull : ""
                        }`}
                    />
                    {isDashboard && !isNews &&  (
                        <Link href={"/"} className={styles.backToMainButton}>
                            {t('header.backToMainPage')}
                        </Link>
                    )}
                    <Image
                        src={LogoSmall}
                        alt="Logo"
                        className={`${styles.logoSmall} ${
                            isOpen ? styles.openLogoSmall : ""
                        }`}
                    />
                </div>
                <div className={styles.linksContainer}>
                    {linksList.map((link, index) => {
                        const isClaim = link.label.toLowerCase() === "claim";
                        return (
                        <>
                            {openPopover && isClaim && (
                                <FadeInNew direction="up" distance={15}>
                                    <div className={styles.popover}>
                                        <Image
                                            width={26}
                                            height={26}
                                            src={arrow}
                                            loading="lazy"
                                            className={styles.popoverIcon}
                                            alt="popover-arrow"
                                        />
                                        <div className={styles.popoverContent}>
                                            <p>
                                                {t('header.claimPopoverText')}
                                            </p>
                                        </div>
                                    </div>
                                </FadeInNew>
                            )}
                            <button
                                className={`${styles.link} ${link.href === pathName ? styles.linkActive : ""}`}
                                key={link.label}
                                onClick={() => {
                                    handleClick(link.href)
                                    isClaim && setOpenPopover(true)
                                }}
                                onBlur={() => isClaim && setOpenPopover(false)}
                                disabled={link.disabled}
                                >
                                {isDashboard ? t(`header.linksDashboard.${index}`) : t(`header.links.${index}`)}
                            </button>
                        </>
                    )})}
                </div>
                <div className={styles.chooseChain}>
                    <ChainsDropdown />
                </div>
                <div className={styles.connectContainer}>
                    {!isReady && <button className={styles.connectButton} style={{visibility:'hidden'}}>...</button>}
                    {isReady && <>
                    {isConnected ? (
                        <button
                            className={styles.walletButton}
                            onClick={() => setIsDisconnectModal(true)}
                        >
                            <Image src={WalletIcon} alt="User" />
                            {account ? formatAddress(account) : ""}
                        </button>
                    ) : (
                        <button
                            onClick={connect}
                            className={styles.connectButton}
                        >
                            {t('header.connectWalletButton')}
                        </button>
                    )}
                    </>}

                    {!isDashboard && (
                        <button className={styles.userButton} onClick={() => window.open("/dashboard", "_parent")}>
                            <Image src={UserIcon} alt="User" />
                        </button>
                    )}
                    {account && (
                        <button className={styles.disconnectButton} onClick={() => setIsDisconnectModal(true)}>
                            <Image src={DisconnectIcon} alt="Disconnect Wallet" width={24} height={24} />
                        </button>
                    )}
                    <div className={styles.mobileButton}>
                        <BurgerButton
                            isOpen={isOpen}
                            onClick={() => setIsOpen((oldState) => !oldState)}
                        />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
