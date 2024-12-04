import type { AnalyticsTableItem } from '../AnalyticsTable/AnalyticsTable';
import usdt from '/public/svg/tether-icon.svg';
import usdc from '/public/svg/usdc-icon.svg';
import eth from '/public/svg/ether-icon.svg';
import bnb from '/public/svg/bnb-icon.svg';

// FIRST TABLE
export const firstTableHead = ['Receipt of money', 'All', 'ETH', 'BSC'];
export const firstTableItems: AnalyticsTableItem[] = [
   { isGlow: true, values: [{ text: 'Total in $ (buy)' }, { text: '144 835' }, { text: '' }, { text: '' }] },

   { isGlow: false, values: [{ icon: usdt, text: 'USDT' }, { text: '80500' }, { text: '65780' }, { text: '14720' }] },
   { isGlow: false, values: [{ icon: usdc, text: 'USDC' }, { text: '19650' }, { text: '25000' }, { text: '7200' }] },
   { isGlow: false, values: [{ icon: eth, text: 'ETH' }, { text: '24,73' }, { text: '43,56' }, { text: '-' }] },
   { isGlow: false, values: [{ icon: bnb, text: 'BNB' }, { text: '32,74' }, { text: '-' }, { text: '23,55' }] },

   { isGlow: true, values: [{ text: 'Total in $ (deposit)' }, { text: '32 643' }] },

   { isGlow: false, values: [{ icon: usdt, text: 'USDT' }, { text: '2700' }, { text: '2500' }, { text: '2000' }] },
   { isGlow: false, values: [{ icon: usdc, text: 'USDC' }, { text: '1040' }, { text: '960' }, { text: '720' }] },
   { isGlow: false, values: [{ icon: eth, text: 'ETH' }, { text: '24,73' }, { text: '43,56' }, { text: '-' }] },
   { isGlow: false, values: [{ icon: bnb, text: 'BNB' }, { text: '32,74' }, { text: '-' }, { text: '23,55' }] },
];

// SECOND TABLE
export const secondTableHead = ['Number of purchases', 'All', 'ETH', 'BSC'];
export const secondTableItems: AnalyticsTableItem[] = [
   { isGlow: true, values: [{ text: 'Total' }, { text: '144 835' }, { text: '' }, { text: '' }] },

   { isGlow: false, values: [{ text: 'Deposit' }, { text: '21' }, { text: '34' }, { text: '45' }] },
   { isGlow: false, values: [{ text: 'Buy (total)' }, { text: '45' }, { text: '23' }, { text: '45' }] },

   { isGlow: false, values: [{ icon: usdt, text: 'USDT' }, { text: '17' }, { text: '11' }, { text: '6' }] },
   { isGlow: false, values: [{ icon: usdc, text: 'USDC' }, { text: '13' }, { text: '32' }, { text: '15' }] },
   { isGlow: false, values: [{ icon: eth, text: 'ETH' }, { text: '21' }, { text: '21' }, { text: '-' }] },
   { isGlow: false, values: [{ icon: bnb, text: 'BNB' }, { text: '32' }, { text: '-' }, { text: '23' }] },
];

// THIRD TABLE
export const thirdTableHead = ['', 'All', 'ETH', 'BSC'];
export const thirdTableItems: AnalyticsTableItem[] = [
   { isGlow: false, values: [{ text: 'Sold by vAntix' }, { text: '4 652 464' }, { text: '5 646 333' }, { text: '14 555 555' }] },
   { isGlow: false, values: [{ text: '% from max' }, { text: '12,5%' }, { text: '5%' }, { text: '45%' }] },
];

// FOURTH TABLE
export const fourthTableHead = ['Average check (buy)', 'All', 'ETH', 'BSC'];
export const fourthTableItems: AnalyticsTableItem[] = [
   { isGlow: false, values: [{ icon: usdt, text: 'USDT' }, { text: '5900' }, { text: '3400' }, { text: '6500' }] },
   { isGlow: false, values: [{ icon: usdc, text: 'USDC' }, { text: '4330' }, { text: '2330' }, { text: '1235' }] },
   { isGlow: false, values: [{ icon: eth, text: 'ETH' }, { text: '-' }, { text: '4 543' }, { text: '-' }] },
   { isGlow: false, values: [{ icon: bnb, text: 'BNB' }, { text: '-' }, { text: '-' }, { text: '1344' }] },  
];