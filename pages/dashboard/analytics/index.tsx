import bg from "/public/images/dashboard-bg.png";
import { firstTableHead, firstTableItems, secondTableHead, secondTableItems, thirdTableHead, thirdTableItems, fourthTableHead, fourthTableItems } from '@/components/analytics/mocdata';
import { AnalyticsHead } from '@/components/analytics/AnalyticsHead/AnalyticsHead';
import { AnalyticsTable } from '@/components/analytics/AnalyticsTable/AnalyticsTable';
import ConnectWallet from '@/components/ConnectModals/ConnectWallet/ConnectWallet';
import Header from '@/sections/Header/Header';
import s from './page.module.scss';

const Analytics = () => {
   return (
      <main
         className={s.page}
         style={{ backgroundImage: `url(${bg.src})` }}
      >
         {/* TODO: add mode for analytics in header */}
         <Header />
         {/* <ConnectWallet /> */}

         <div className={s.content}>
            <AnalyticsHead />

            <div className={s.tables}>
               <div className={s.wrapper}>
                  <AnalyticsTable tableHeadItems={firstTableHead} items={firstTableItems} />
                  <AnalyticsTable tableHeadItems={secondTableHead} items={secondTableItems} />
               </div>
               <div className={s.wrapper}>
                  <AnalyticsTable tableHeadItems={thirdTableHead} items={thirdTableItems} />
                  <AnalyticsTable tableHeadItems={fourthTableHead} items={fourthTableItems} />
               </div>
            </div>
         </div>
      </main>
   )
}

export default Analytics;