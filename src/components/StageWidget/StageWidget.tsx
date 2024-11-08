'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { XIcon } from './icons/XIcon';
import s from './StageWidget.module.scss';
import { TgIcon } from './icons/TgIcon';
import { DiscordIcon } from './icons/DiscordIcon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const StageWidget = () => {
   const targetDate = new Date('2024-11-14T16:00:00Z');
   const { push } = useRouter();
   const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
   });
   const [visible, setVisible] = useState(false);
   const lastScrollY = useRef(0);

   useEffect(() => {
      const updateTimeLeft = () => {
         const diff = targetDate.getTime() - Date.now();

         if (diff > 0) {
            const seconds = Math.floor(diff / 1000);
            setTimeLeft({
               days: Math.floor(seconds / 86400),
               hours: Math.floor((seconds % 86400) / 3600),
               minutes: Math.floor((seconds % 3600) / 60),
               seconds: seconds % 60,
            });
         } else {
            clearInterval(interval);
         }
      };

      updateTimeLeft();
      const interval = setInterval(updateTimeLeft, 1000);

      return () => clearInterval(interval);
   }, []);

   useEffect(() => {
      const handleScroll = () => {
         const currentScrollY = window.scrollY;
         const about = document.getElementById('AboutProject');

         if (!about) return;

         const aboutTop = about.getBoundingClientRect().top + currentScrollY;

         if (
            currentScrollY < aboutTop ||
            currentScrollY < lastScrollY.current
         ) {
            setVisible(false);
         } else {
            setVisible(true);
         }

         lastScrollY.current = currentScrollY;
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return (
      <div className={`${s.wrapper} ${visible && s.open}`}>
         <div className={s.stage}>
            <Image
               src={'/svg/stage-widget-coin.svg'}
               alt="coin"
               width={68}
               height={51}
               className={s.coin}
            />

            <div className={s.info}>
               <div className={s.priceWrapper}>
                  <h2>Stage 1 price</h2>
                  <div className={s.mobileDiscount}>
                     <p>-54%</p>
                  </div>
               </div>
               <div className={s.wrap}>
                  <div className={s.prices}>
                     <p>0.030 USDT</p>
                     <Image
                        src={'/svg/prev-price.svg'}
                        alt="prev-price"
                        width={74}
                        height={20}
                        draggable={false}
                        loading="lazy"
                        className={s.price}
                     />
                  </div>
                  <div className={s.discount}>
                     <p>-54%</p>
                  </div>
               </div>
            </div>

            <div className={s.timer}>
               <h2>Deposits Open in</h2>
               <div className={s.countdown}>
                  <div>
                     <span>{timeLeft.days.toString().padStart(2, '0')}</span>
                     <p>days</p>
                  </div>
                  :
                  <div>
                     <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
                     <p>hours</p>
                  </div>
                  :
                  <div>
                     <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
                     <p>min</p>
                  </div>
                  :
                  <div>
                     <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
                     <p>sec</p>
                  </div>
               </div>
            </div>

            <button 
               onClick={() => {
                  const isOpen = new Date(targetDate) <= new Date();

                  if (isOpen) push("/dashboard");
                  // else window.scrollTo({ top: 0, behavior: "smooth" });
                  else window.open("https://t.me/antixtoken_bot", "_blank");
               }}
               className={s.buy}
            >
               buy
            </button>
         </div>

         <div className={s.socials}>
            <Link
               href="https://x.com/antix_in"
               target="_blank"
               className={s.social}>
               <XIcon />
               <p>41,500</p>
            </Link>

            <Link
               href="https://t.me/antix_in"
               target="_blank"
               className={s.social}>
               <TgIcon />
               <p>56,300</p>
            </Link>

            <Link
               href="https://discord.com/invite/bKcMXChRRT"
               target="_blank"
               className={s.social}>
               <DiscordIcon />
               <p>5,300</p>
            </Link>
         </div>
      </div>
   );
};
