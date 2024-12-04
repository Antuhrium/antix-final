import bg from "/public/images/dashboard-bg.png";
import { firstTableHead, firstTableItems, secondTableHead, secondTableItems, thirdTableHead, thirdTableItems, fourthTableHead, fourthTableItems, fifthTableHead, fifthTableItems, sixthTableHead, sixthTableItems, seventhTableHead, seventhTableItems } from '@/components/analytics/mocdata';
import { AnalyticsHead } from '@/components/analytics/AnalyticsHead/AnalyticsHead';
import { AnalyticsTable } from '@/components/analytics/AnalyticsTable/AnalyticsTable';
// import ConnectWallet from '@/components/ConnectModals/ConnectWallet/ConnectWallet';
import Header from '@/sections/Header/Header';
import s from './page.module.scss';
import { useState } from "react";

const Analytics = () => {
   const [activeAnalytics, setActiveAnalytics] = useState<'Day' | 'All' | 'Referral'>('Day');
   const [activeStage, setActiveStage] = useState<1 | 2>(1);

   return (
      <main
         className={s.page}
         style={{ backgroundImage: `url(${bg.src})` }}
      >
         {/* TODO: add mode for analytics in header */}
         <Header
            isAnalitics
            activeAnalytics={activeAnalytics}
            setActiveAnalytics={setActiveAnalytics}
         />
         {/* <ConnectWallet /> */}

         <div className={s.content}>
         <AnalyticsHead activeAnalytics={activeAnalytics} />

         {activeAnalytics === 'Day' && (
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
         )}

         {activeAnalytics === 'All' && (
            <>
               <div className={s.tables}>
                  <div className={s.wrapper}>
                     <AnalyticsTable tableHeadItems={firstTableHead} items={firstTableItems} />
                     <div className={s.stageButtons}>
                        <button className={`${s.stageButton} ${activeStage === 1 ? s.activeStageButton : ''}`} onClick={() => setActiveStage(1)}>Stage #1</button>
                        <button className={`${s.stageButton} ${activeStage === 2 ? s.activeStageButton : ''}`} onClick={() => setActiveStage(2)}>Stage #2</button>
                     </div>
                     <AnalyticsTable tableHeadItems={secondTableHead} items={secondTableItems} />
                  </div>
                  <div className={s.wrapper}>
                     <AnalyticsTable tableHeadItems={fifthTableHead} items={fifthTableItems} />
                     <AnalyticsTable tableHeadItems={sixthTableHead} items={sixthTableItems} />
                  </div>
               </div>
               <div className={s.tokenomicsWrapper}>
                  <div className={s.tokenomicsTitle}>
                     <h4>Tokenomics</h4>
                     <h4>Cap</h4>
                  </div>
                  <AnalyticsTable tableHeadItems={seventhTableHead} items={seventhTableItems} />
               </div>
            </>
         )}
         </div>

      </main>
   )
}

export default Analytics;