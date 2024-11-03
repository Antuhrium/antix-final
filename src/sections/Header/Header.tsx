"use client";

import Image from "next/image";
import styles from "./Header.module.scss";
import {
    links,
    linksDashboard,
    mobileLinks,
    mobileLinksDashboard,
} from "./mocdata";
import UserIcon from "/public/svg/user-icon.svg";
import DisconnectIcon from "/public/svg/disconnect-icon.svg";

import LogoFull from "/public/svg/logo-full.svg";
import LogoSmall from "/public/svg/logo-small.svg";
import { BurgerButton } from "../AntixToken/components/BurgerButton/BurgerButton";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import WalletIcon from "/public/svg/wallet-icon.svg";

import Link from "next/link";
import { formatAddress } from "@/utils/utils";
import DisConnect from "@/components/ConnectModals/DisConnect/DisConnect";
import { scrollToId } from "@/utils/scrollToId";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePathname } from "next/navigation";

interface HeaderProps {
    isDashboard?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDashboard }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isDisconnectModal, setIsDisconnectModal] = useState(false);

    const headerRef = useRef<HTMLDivElement | null>(null);
    const { isConnected, walletAdress } = useAuthStore();

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
    console.log(pathName);
    

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
                    {mobileLinksList.map((link) => (
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
                            {link.label}
                        </button>
                    ))}
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
                    {isDashboard &&  (
                        <Link href={"/"} className={styles.backToMainButton}>
                            Back to the Main Page
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
                    {linksList.map((link) => (
                        <button
                            className={`${styles.link} ${link.href === pathName ? styles.linkActive : ""}`}
                            key={link.label}
                            onClick={() => handleClick(link.href)}
                            disabled={link.disabled}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
                <div className={styles.connectContainer}>
                    {isConnected ? (
                        <button
                            className={styles.walletButton}
                            onClick={() => setIsDisconnectModal(true)}
                        >
                            <Image src={WalletIcon} alt="User" />
                            {isConnected ? formatAddress(walletAdress) : ""}
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => window.open("/dashboard", "_parent")}
                                className={styles.connectButton}
                            >
                                Connect Wallet
                            </button>
                        </>
                    )}
                    {!isDashboard && (
                        <button className={styles.userButton} onClick={() => window.open("/dashboard", "_parent")}>
                            <Image src={UserIcon} alt="User" />
                        </button>
                    )}
                    {isConnected && (
                        <button className={styles.userButton} onClick={() => setIsDisconnectModal(true)}>
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
