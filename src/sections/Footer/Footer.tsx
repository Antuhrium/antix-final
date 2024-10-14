"use client";

import styles from "./Footer.module.scss";

import socialX from "@/public/svg/social-x.svg";
import socialTelegram from "@/public/svg/social-telegram.svg";
import socialDiscord from "@/public/svg/social-discord.svg";

import TitleImg from "@/public/svg/footer-bg.svg";
import TitleImgMobile from "@/public/svg/footer-bg-mobile.svg";
import Image from "next/image";

const Footer = () => {
    const handleClick = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className={styles.footer} id="Footer">
            <div className={styles.footerConatiner}>
                <div className={styles.topWrapper}>
                    <div className={styles.topItem}>
                        <span className={styles.smallTitle}>Follow us:</span>
                        <div className={styles.socials}>
                            <a
                                href="https://x.com/antix_in"
                                target="_blank"
                                className={styles.socialLink}
                            >
                                <Image src={socialX} alt="X" />
                            </a>
                            <a
                                href="https://discord.com/invite/bKcMXChRRT"
                                target="_blank"
                                className={styles.socialLink}
                            >
                                <Image src={socialDiscord} alt="Discord" />
                            </a>
                            <a
                                href="https://t.me/antix_in"
                                target="_blank"
                                className={styles.socialLink}
                            >
                                <Image src={socialTelegram} alt="Telegram" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.topItem}>
                        <span className={styles.smallTitle}>E-mail:</span>
                        <a
                            href="mailto:token@antix.in"
                            className={styles.mailLink}
                        >
                            hello@antix.in
                        </a>
                        <div className={styles.centerLinksWrapper}>
                            <div className={styles.linkWrapper}>
                                <button onClick={() => handleClick("Advisors")}>
                                    Advisors
                                </button>
                                <button onClick={() => handleClick("Token")}>
                                    ANTIX Token
                                </button>
                                <button
                                    onClick={() => handleClick("Tokenomics")}
                                >
                                    Tokenomics
                                </button>
                            </div>
                            <div className={styles.linkWrapper}>
                                <button
                                    onClick={() => handleClick("AboutProject")}
                                >
                                    About project
                                </button>
                                <button onClick={() => handleClick("Team")}>
                                    Team
                                </button>
                                <button
                                    onClick={() => handleClick("FeaturedIn")}
                                >
                                    Partners
                                </button>
                            </div>

                            <div className={styles.linkWrapper}>
                                <button onClick={() => handleClick("RoadMap")}>
                                    Road map
                                </button>
                                <button onClick={() => handleClick("JoinUs")}>
                                    Community
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bootomWrapper}>
                    <div className={styles.bootomLinkWrapper}>
                        <a href="#" className={styles.bootomLink}>
                            Terms of Use
                        </a>
                        <a href="#" className={styles.bootomLink}>
                            Privacy Policy
                        </a>
                        <span className={styles.bootomInfoMobile}>© 2024</span>
                        <p className={styles.bootomInfo}>
                            Antix Interactive Inc. All Rights Reserved
                        </p>
                    </div>
                    <span className={styles.bootomInfo}>© 2024</span>
                </div>
                <div className={styles.bgTitleMobile}>
                    <Image src={TitleImgMobile} alt="Antix" draggable={false} />
                </div>
            </div>
            <div className={styles.bgTitle}>
                <Image src={TitleImg} alt="Antix" draggable={false} />
            </div>
        </footer>
    );
};

export default Footer;
