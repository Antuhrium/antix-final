import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import styles from './TokenSaleStage1AS.module.scss';

import LogoSmall from '/public/svg/logo-small.svg';
import BgHead from '/public/images/hero-timer-bg-head.png';
import { HeroTimer } from '@/sections/HeroSection/ui/HeroTimer/HeroTimer';
import { TgIcon } from '@/components/GotQuestions/icons/TgIcon';
import RaisedProgressBar from '@/DashboardStages/Stage1/DashboardTop/RaisedProgressBar/RaisedProgressBar';
import StayUpdated from '@/components/StayUpdated/StayUpdated';
import Pays from '@/components/Pays/Pays';

interface ITokenSaleStage1CS {
  stage1DateStr: string;
  setIsRefModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TokenSaleStage1AS: React.FC<ITokenSaleStage1CS> = ({
  stage1DateStr,
  setIsRefModal,
}) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.timerHead}
        style={{ backgroundImage: `url(${BgHead.src})` }}
      >
        <div className={styles.timerWrapperTitle}>
          <Image
            src={LogoSmall}
            width={30}
            height={30}
            alt="Logo"
            className={styles.logo}
          />
          Token Sale
        </div>
      </div>

      <div className={styles.timer}>
        <div className={styles.timerTitle}>
          <h2 className={styles.timerHeading}>Stage 1 is about to start!</h2>
        </div>

        <div className={styles.progress}>
          {/* <RaisedProgressBar
            segments={15}
            currentAmount={14500000}
            targetAmount={17000000}
            title={'Tokens sold:'}
            color={'#99FFF9'}
          /> */}
        </div>

        <div className={styles.timerContainer}>
          <span className={styles.title}>Stage 1 is coming in</span>

          <HeroTimer targetDate={new Date(stage1DateStr)} />
        </div>

        <Pays />
        <StayUpdated />

        <div className={styles.referral}>
          <button onClick={() => setIsRefModal(true)} className={styles.refBtn}>
            + Get referral link
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenSaleStage1AS;
