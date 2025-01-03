"use client"

import bg from '/public/images/team-bg.png';
import { TeamPreview } from './components/TeamPreview/TeamPreview';
import { LogoCarousel } from './components/LogoCarousel/LogoCarousel';
import { TeamCarousel } from './components/TeamCarousel/TeamCarousel';
import s from './Team.module.scss';
import { advisorsList } from '../Advisors/mocdata';
import { Tabs } from '../../components/Tabs/Tabs';
import { useTabStore } from '../../stores/useTabStore'
import { useTranslation } from 'react-i18next';
import { teamItemType } from './components/TeamCarousel/mocdata'

const Team = () => {
   const { setTab, tab } = useTabStore();
   const { t } = useTranslation('landing');
   const commandList = t('team.list', { returnObjects: true }) as teamItemType[];

   return (
      <>
         <div className={s.teamAdvisorsMobile} id='Team1'>
            <div className={s.mobileBtns}>
               <button
                  className={tab === 'team'? s.mobileActive : ''}
                  onClick={() => setTab('team')}
               >
                  {t('team.mobile.button_1')}
               </button>
               <button
                  className={tab === 'advisors'? s.mobileActive : ''}
                  onClick={() => setTab('advisors')}
               >
                  {t('team.mobile.button_2')}
               </button>
            </div>
            <p className={s.mobileDesc}>{t('team.description.text_1')} <span>{t('team.description.span')}</span>{t('team.description.text_2')}</p>
            <Tabs data={tab === "team" ? commandList : advisorsList} />
         </div>
         <div
            id="Team"
            className={s.team}
            style={{ backgroundImage: `url(${bg.src})` }}
         >
            <TeamPreview />
            <div>
               <LogoCarousel />
               <TeamCarousel />
            </div>
         </div>
      </>
   );
};

export default Team;
