import React from 'react';
import styles from './Pays.module.scss';
import Image from 'next/image';
import usdt from '/public/svg/tether-icon.svg';
import usdc from '/public/svg/usdc-icon.svg';
import bnb from '/public/svg/bnb-icon.svg';
import eth from '/public/svg/ether-icon.svg';
import degen from '/public/svg/degen-coin.svg';
import wethera from '/public/svg/wethera-coin.svg';
import cbbtc from '/public/svg/cbbtc-coin.svg';
import mantra from '/public/svg/mantra-coin.svg';

const paysIcons = [usdt, usdc, bnb, eth, degen, wethera, cbbtc, mantra];

const Pays = () => {
  return (
    <div className={styles.pays}>
      <h3 className={styles.paysTitle}>Pay with</h3>

      <div className={styles.paysIcons}>
        {paysIcons.map((icon, i) => (
          <Image
            key={i}
            src={icon}
            alt="icon"
            width={24}
            height={24}
          />
        ))}
      </div>
    </div>
  );
};

export default Pays;
