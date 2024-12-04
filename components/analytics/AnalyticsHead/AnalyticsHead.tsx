import Image from 'next/image';

import eth from '/public/svg/ether-icon.svg';
import bnb from '/public/svg/bnb-icon.svg';
import usdt from '/public/svg/tether-icon.svg';
import vantix from '/public/svg/vantix-icon.svg';
import { AnalyticsSelect } from '@/components/analytics/AnalyticsSelect/AnalyticsSelect';
import { CalendarIcon } from '@/components/analytics/icons/CalendarIcon';
import { AnalyticsCard } from '@/components/analytics/AnalyticsCard/AnalyticsCard';
import s from './AnalyticsHead.module.scss';

interface AnalyticsHeadProps {
   activeAnalytics?: 'Day' | 'All' | 'Referral';
}

export const AnalyticsHead: React.FC<AnalyticsHeadProps> = ({
   activeAnalytics,
}) => {
  if (activeAnalytics === 'All') {
    return (
      <div className={s.head}>
        <div className={s.left}>
          <div className={s.select}>
            <h3>From</h3>
            <AnalyticsSelect items={[]} prefix={<CalendarIcon />} />
            <h3>To</h3>
            <AnalyticsSelect items={[]} prefix={<CalendarIcon />} />
          </div>
        </div>

        <div className={s.right}>
          <div className={s.rates}>
            <AnalyticsCard>
              <div className={s.rate}>
                <div className={s.title}>
                  <Image src={eth} alt="eth" width={24} height={24} />
                  <p>ETH rate</p>
                </div>

                <p>3563</p>
              </div>
            </AnalyticsCard>
            <AnalyticsCard>
              <div className={s.rate}>
                <div className={s.title}>
                  <Image src={bnb} alt="bnb" width={24} height={24} />
                  <p>BNB rate</p>
                </div>

                <p>650</p>
              </div>
            </AnalyticsCard>
          </div>
        </div>
      </div>
    );
  }
  if (activeAnalytics === 'Day') {
    return (
      <div className={s.head}>
        <div className={s.left}>
          <div className={s.select}>
            <h3>Day</h3>
            <AnalyticsSelect items={[]} prefix={<CalendarIcon />} />
          </div>
          <div className={s.rates}>
            <AnalyticsCard>
              <div className={s.rate}>
                <div className={s.title}>
                  <Image src={eth} alt="eth" width={24} height={24} />
                  <p>ETH rate</p>
                </div>

                <p>3563</p>
              </div>
            </AnalyticsCard>
            <AnalyticsCard style={{ marginTop: 8 }}>
              <div className={s.rate}>
                <div className={s.title}>
                  <Image src={bnb} alt="bnb" width={24} height={24} />
                  <p>BNB rate</p>
                </div>

                <p>650</p>
              </div>
            </AnalyticsCard>
          </div>
        </div>

        <div className={s.right}>
          <AnalyticsCard>
            <div className={s.targets}>
              <div className={s.title}>
                <Image src={usdt} alt="usdt" width={24} height={24} />
                <p>USDT target</p>
              </div>
              <ul className={s.items}>
                <li className={s.discount}>24,6%</li>
                <li className={s.separator} />
                <li>177 477</li>
                <li className={s.separator} />
                <li>720 000</li>
              </ul>
            </div>
          </AnalyticsCard>
          <AnalyticsCard style={{ marginTop: 8 }}>
            <div className={s.targets}>
              <div className={s.title}>
                <Image src={vantix} alt="vantix" width={24} height={24} />
                <p>vAntix target</p>
              </div>
              <ul className={s.items}>
                <li className={s.discount}>25,8%</li>
                <li className={s.separator} />
                <li>4 652 464</li>
                <li className={s.separator} />
                <li>18 000 000</li>
              </ul>
            </div>
          </AnalyticsCard>
        </div>
      </div>
    );
  }
};
