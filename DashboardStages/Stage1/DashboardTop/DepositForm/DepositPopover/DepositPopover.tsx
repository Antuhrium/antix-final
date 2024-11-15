import Image from 'next/image';
import type { CSSProperties } from 'react';

import { FadeInNew } from '../../../../../components/FadeInNew/FadeInNew';
import arrow from '/public/dashboard/svg/arrow-down.svg';
import s from './DepositPopover.module.scss';

interface PopoverProps {
   open: boolean;
   text: string;
   style?: CSSProperties
}

export const DepositPopover = ({ text, open, style }: PopoverProps) => {
   return (
      open && (
         <FadeInNew direction="down" distance={15}>
            <div style={style} className={s.wrapper}>
               <div className={s.content}>
                  <p>{text}</p>
               </div>

               <Image
                  width={26}
                  height={26}
                  src={arrow}
                  loading="lazy"
                  className={s.icon}
                  alt="popover-arrow"
               />
            </div>
         </FadeInNew>
      )
   );
};