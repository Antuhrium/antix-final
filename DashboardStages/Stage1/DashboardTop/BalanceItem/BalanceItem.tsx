import Image from 'next/image';

import s from './BalanceItem.module.scss';

interface BalanceProps {
   currencySrc: string;
   title: string;
   balance: string;
}

export const BalanceItem = ({ currencySrc, balance, title }: BalanceProps) => {
   return (
      <div className={s.wrapper}>
         <section className={s.currency}>
            <Image
               src={currencySrc}
               alt="currency"
               width={24}
               height={24}
            />

            <h5>{title}</h5>
         </section>

         <p className={s.balance}>{balance}</p>
      </div>
   );
};