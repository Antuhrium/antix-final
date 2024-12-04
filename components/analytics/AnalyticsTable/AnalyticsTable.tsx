import Image from 'next/image'
import s from './AnalyticsTable.module.scss';

interface AnalyticsTableValue {
   text: string;
   icon?: string;
}

interface TableProps {
   tableHeadItems: string[];
   items: AnalyticsTableItem[];
}

export interface AnalyticsTableItem {
   values: AnalyticsTableValue[];
   isGlow: boolean;
}

export const AnalyticsTable = ({ tableHeadItems, items }: TableProps) => {
   return (
      <div className={s.table}>
         <ul className={s.head}>
            {tableHeadItems.map((str, i) => <li key={i}>{str}</li>)}
         </ul>

         <div>
            {items.map(({ isGlow, values }, i) => (
               <ul
                  key={i}
                  className={`${s.row} ${isGlow && s.glowed}`}
               >
                  {values.map(({ icon, text }, i) => (
                     <li className={s.rowItem} key={i}>
                        {icon && (
                           <Image
                              src={icon}
                              alt="icon"
                              width={24}
                              height={24}
                           />
                        )}
                        {text}
                     </li>
                  ))}
               </ul>
            ))}
         </div>
      </div>
   );
};