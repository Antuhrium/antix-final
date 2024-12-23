"use client";

import React, { useState } from "react";
import styles from "./DigitalMap.module.scss";
import Image from "next/image";

import VideoModal from "../../components/VideoModal/VideoModal";
import { FadeInNew } from "../../components/FadeInNew/FadeInNew";

import Bg from "/public/images/digital-map/digital-map-bg.png";
import PlayIcon from "/public/svg/play-video.svg";
import PlayImage from "/public/images/digital-map/map-video-img.png";

import Point1 from "/public/images/digital-map/point-1.png";
import Point2 from "/public/images/digital-map/point-2.png";
import Point3 from "/public/images/digital-map/point-3.png";


import USAPoint from "/public/images/digital-map/usa-point.png";
import EuropePoint from "/public/images/digital-map/europe-point.png";
import JapanPoint from "/public/images/digital-map/japan-point.png";
import ChinaPoint from "/public/images/digital-map/china-point.png";
import SouthKoreaPoint from "/public/images/digital-map/south-korea-point.png";
import AustraliaPoint from "/public/images/digital-map/australia-point.png";

import HandIcon from "/public/svg/swap-icon.svg";
import { useTranslation } from "react-i18next";

const DigitalMap = () => {
    const [openVideo, setOpenVideo] = useState("");
    const { t } = useTranslation('landing');
    return (
        <section className={styles.container}>
            {openVideo && (
                <VideoModal videoUrl={openVideo} onClose={setOpenVideo} />
            )}
            <div className={styles.topContent}>
                <div className={styles.descWrapper}>
                    <p className={styles.desc}>
                        <span>{t('digitalMap.desc_1.span')}</span>{t('digitalMap.desc_1.text')}
                    </p>
                    <p className={styles.desc}>
                        <span>{t('digitalMap.desc_2.span')}</span>{t('digitalMap.desc_2.text')}
                    </p>
                </div>
                <h4 className={styles.title}>{t('digitalMap.title')}</h4>
                <Image
                    className={styles.hand}
                    src={HandIcon}
                    alt="Handle Icon"
                    width={60}
                    height={60}
                />
            </div>
            <div className={styles.map}>
            <div className={styles.MapWrapper}>
                <div
                    className={styles.bgMap}
                    style={{ backgroundImage: `url(${Bg.src})` }}
                />
                <div className={styles.pointsWrapper}>
                    <FadeInNew direction="down">
                        <div className={styles.point1}>
                            <Image src={USAPoint} alt="USA" draggable={false} />

                            <div
                                className={styles.videoWrapper}
                                onClick={() =>
                                    setOpenVideo(
                                        "https://www.youtube.com/embed/3FxZYSKfcE0"
                                    )
                                }
                            >
                                <Image
                                    src={PlayImage}
                                    alt=""
                                    draggable={false}
                                />
                                <div className={styles.play}>
                                    <Image
                                        src={PlayIcon}
                                        alt=""
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </FadeInNew>

                    <FadeInNew direction="down">
                        <div className={styles.point2}>
                            <Image src={EuropePoint} alt="Europe" draggable={false} />
                        </div>
                    </FadeInNew>

                    <FadeInNew direction="down">
                        <div className={styles.point5}>
                            <Image src={SouthKoreaPoint} alt="South Korea" draggable={false} />
                        </div>
                    </FadeInNew>

                    <FadeInNew direction="down">
                        <div className={styles.point3}>
                            <Image src={JapanPoint} alt="Japan" draggable={false} />

                            <div
                                className={styles.videoWrapper}
                                onClick={() =>
                                    setOpenVideo(
                                        "https://www.youtube.com/embed/F1YDHYELweI"
                                    )
                                }
                            >
                                <Image
                                    src={PlayImage}
                                    alt=""
                                    draggable={false}
                                />
                                <div className={styles.play}>
                                    <Image
                                        src={PlayIcon}
                                        alt=""
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </FadeInNew>

                    <FadeInNew direction="down">
                        <div className={styles.point4}>
                            <Image src={ChinaPoint} alt="China" draggable={false} />

                            <div
                                className={styles.videoWrapper}
                                onClick={() =>
                                    setOpenVideo(
                                        "https://www.youtube.com/embed/FBzkC5uFZLg"
                                    )
                                }
                            >
                                <Image
                                    src={PlayImage}
                                    alt=""
                                    draggable={false}
                                />
                                <div className={styles.play}>
                                    <Image
                                        src={PlayIcon}
                                        alt=""
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </FadeInNew>

                    <FadeInNew direction="down">
                        <div className={styles.point6}>
                            <Image src={AustraliaPoint} alt="Australia" draggable={false} />
                        </div>
                    </FadeInNew>
                </div>
            </div>
            </div>
        </section>
    );
};

export default DigitalMap;
