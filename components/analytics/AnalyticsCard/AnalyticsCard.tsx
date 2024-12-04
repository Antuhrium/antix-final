import type { CSSProperties, PropsWithChildren } from 'react';

import s from './AnalyticsCard.module.scss';

export const AnalyticsCard = ({
   children,
   style,
}: PropsWithChildren<{ style?: CSSProperties }>) => {
   return (
      <div className={s.card} style={style}>
         {children}
      </div>
   );
};
