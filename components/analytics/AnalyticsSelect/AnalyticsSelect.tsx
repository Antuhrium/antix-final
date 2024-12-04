'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import s from './AnalyticsSelect.module.scss';
import { FadeInNew } from '@/components/FadeInNew/FadeInNew';
import { ArrowIcon } from '../icons/ArrowIcon'

interface SelectProps {
   // todo: change any type to another items type;
   items: any[];
   prefix: ReactNode;
}

export const AnalyticsSelect = ({ items, prefix }: SelectProps) => {
   const [isOpen, setIsOpen] = useState(false);
   const [selected, setSelected] = useState('29/11');
   const analyticsRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            analyticsRef.current &&
            !analyticsRef.current.contains(event.target as Node)
         ) {
            setIsOpen(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   return (
      <div
         className={s.dropdown}
         ref={analyticsRef}
      >
         <button className={s.btn}>
            <div className={s.value}>
               {prefix}
               {selected}
            </div>

            <div className={`${s.icon} {isOpen && s.open}`}>
               <ArrowIcon />
            </div>
         </button>

         {isOpen && (
            <FadeInNew direction='down' distance={10}>
               <div className={s.menu}>
                  {items.map(() => <div>MOCVALUES</div>)}
               </div>
            </FadeInNew>
         )}
      </div>
   );
};