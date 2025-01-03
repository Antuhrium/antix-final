'use client';

import { Dispatch, SetStateAction } from 'react';
import s from './FaqAccordion.module.scss';
import { OpenIcon } from './icon/OpenIcon';

interface FaqProps {
   id: number;
   title: string;
   content: string;
   openedId: number | null;
   setOpenedId: Dispatch<SetStateAction<number | null>>;
}

export const FaqAccordion = ({
   title,
   content,
   openedId,
   id,
   setOpenedId,
}: FaqProps) => {
   const isOpened = openedId === id;

   return (
      <div
         onClick={() => setOpenedId(isOpened ? null : id)}
         className={s.wrapper}
      >
         <section className={s.title}>
            <h6>{title}</h6>

            <button className={`${s.open} ${isOpened && s.active}`}>
               <OpenIcon />
            </button>
         </section>

         <div
            className={`${s.content} ${isOpened && s.activeText}`}
            dangerouslySetInnerHTML={{ __html: content }}
         />
      </div>
   );
};
