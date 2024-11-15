'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';

import socialX from '/public/svg/social-x.svg';
import socialTelegram from '/public/svg/social-telegram.svg';
import socialDiscord from '/public/svg/social-discord.svg';

import TitleImg from '/public/svg/footer-bg.svg';
import { scrollToId } from '../../utils/scrollToId';
import { useMobile } from '../../hooks/useMobile';
import { useTabStore } from '../../stores/useTabStore'
import styles from './Footer.module.scss';

const Footer = ({ style }: { style?: CSSProperties }) => {
   const { setTab } = useTabStore();
   const isMobile = useMobile(960);

   return (
      <div
         style={style}
         className={styles.container}
      >
         <footer className={styles.footer} id="Footer">
            <div className={styles.footerConatiner}>
               <div className={styles.topWrapper}>
                  <div className={styles.topItem}>
                     <span className={styles.smallTitle}>Follow us:</span>
                     <div className={styles.socials}>
                        <a
                           href="https://x.com/antix_in"
                           target="_blank"
                           className={styles.socialLink}>
                           <Image src={socialX} alt="X" />
                        </a>
                        <a
                           href="https://discord.com/invite/bKcMXChRRT"
                           target="_blank"
                           className={styles.socialLink}>
                           <Image src={socialDiscord} alt="Discord" />
                        </a>
                        <a
                           href="https://t.me/antix_in"
                           target="_blank"
                           className={styles.socialLink}>
                           <Image src={socialTelegram} alt="Telegram" />
                        </a>
                     </div>
                  </div>
                  <div className={styles.topItem}>
                     <span className={styles.smallTitle}>For business inquiries contact us:</span>
                     <a
                        href="mailto:token@antix.in"
                        className={styles.mailLink}>
                        hello@antix.in
                     </a>
                     <div className={styles.centerLinksWrapper}>
                        <div className={styles.linkWrapper}>
                           <button
                              onClick={() => {
                                 scrollToId(!isMobile ? 'Advisors' : 'Team1');
                                 {isMobile && setTab('advisors')}
                              }}>
                              Advisors
                           </button>
                           <button onClick={() => scrollToId('ANTIXTokens')}>
                              ANTIX Token
                           </button>
                           <button onClick={() => scrollToId('Tokenomics')}>
                              Tokenomics
                           </button>
                           <button onClick={() => scrollToId('AboutProject')}>
                              About project
                           </button>
                        </div>
                        <div className={styles.linkWrapper}>
                           <button className={styles.link} onClick={() => scrollToId('JoinUs')}>
                              Community
                           </button>
                           <button onClick={() => scrollToId('RoadMap')}>
                              Road map
                           </button>
                           <button onClick={() => scrollToId('FeaturedIn')}>
                              Partners
                           </button>
                           <button
                              onClick={() => {
                                 scrollToId(!isMobile ? 'Team' : 'Team1')
                                 {isMobile && setTab('team')}
                              }}>
                              Team
                           </button>
                        </div>

                        <div className={styles.linkWrapper}>
                           <button className={styles.mobileLink} onClick={() => scrollToId('JoinUs')}>
                              Community
                           </button>
                           <button onClick={() => scrollToId('/privacy_policy.pdf')}>
                              Privacy Policy
                           </button>
                           <button onClick={() => scrollToId('/terms_of_use.pdf')}>
                              Terms of Use
                           </button>
                        </div>
                     </div>
                  </div>
               </div>

               <div className={styles.bootomLinkWrapper}>
                  <p className={styles.bottomInfo}>
                     {/* Antix Interactive Inc. All Rights Reserved */}
                     A2Lab Inc.
                  </p>
                  <p className={`${styles.bottomInfoMobile} ${styles.bottomInfo}`}>
                     {/* Antix Interactive Inc. All Rights Reserved */}
                     Domicile Province of Panama, district of Panama, Betania, Vía Ricardo J. Alfaro, PH The Century Tower, office 317
                  </p>
                  <span className={styles.bottomInfo}>© 2024</span>
               </div>
            </div>
            <div className={styles.bgTitle}>
               <Image src={TitleImg} alt="Antix" draggable={false} />
            </div>
         </footer>
         
         {/* <div className={styles.bottomTextWrapper}>
            The website token.antix.in (hereinafter referred to as the "Website") is owned by Antix LLC, a company duly existing and organized under the laws of Saint Vincent and the Grenadines, with its registered office at Suite 305 Griffith Corporate Centre, Beachmont, Kingstown, Saint Vincent and the Grenadines, company registration code 2345 LLC 2022. The information provided on this Website is for general informational purposes only. The Website and its contents are provided "as is" and "as available" without any warranties of any kind, either expressed or implied. The content on this Website does not constitute financial, investment, or legal advice. The Website does not recommend any investment, trading, or financial instruments, and users are responsible for conducting their own due diligence before making any financial decisions. The Website’s content is purely educational and informative and should not be construed as financial advice. Cryptocurrencies are highly volatile, and investments involve risks, including potential loss of capital. The Website does not make any guarantees regarding the legal or regulatory status of cryptocurrencies in your jurisdiction.
         </div> */}
         <div className={styles.bottomTextWrapper}>
            Domicile Province of Panama, district of Panama, Betania, Vía Ricardo J. Alfaro, PH The Century Tower, office 317
         </div>
      </div>
   );
};

export default Footer;