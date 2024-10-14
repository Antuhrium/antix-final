"use client";

import React, { useState, useEffect } from "react";
import styles from "./JoinUsCard.module.scss";
import Image, { StaticImageData } from "next/image";

import Bg from "@/public/images/join-us-card-bg.png";
import BgMobile from "@/public/images/join-us-card-bg-mobile.png";
import XIcon from "@/public/svg/social-x.svg";
import TgIcon from "@/public/svg/social-telegram.svg";
import DiscordIcon from "@/public/svg/social-discord.svg";

interface JoinUsCardProps {
    platform: "x" | "discord" | "telegram";
    handle: string;
    followers: number;
    link: string;
}

const JoinUsCard: React.FC<JoinUsCardProps> = ({
    platform,
    handle,
    followers,
    link,
}) => {
    const [bgImage, setBg] = useState<StaticImageData>(Bg);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 960) {
                setBg(BgMobile);
            } else {
                setBg(Bg);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    let icon;
    switch (platform) {
        case "x":
            icon = XIcon;
            break;
        case "telegram":
            icon = TgIcon;
            break;
        case "discord":
            icon = DiscordIcon;
            break;
    }

    return (
        <a
            href={link}
            target="_blank"
            className={styles.cardContainer}
            style={{ backgroundImage: `url(${bgImage.src})` }}
        >
            <div className={styles.platform}>
                <div className={styles.icon}>
                    <Image src={icon} alt={platform} />
                </div>
                <span>{handle}</span>
            </div>
            <div className={styles.followers}>
                Followers: <span>{followers}K</span>
            </div>
            <button className={styles.PlusBtn}>
                <span />
                <span />
            </button>
        </a>
    );
};

export default JoinUsCard;
