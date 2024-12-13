import s from './TransactionItem.module.scss';
import Image from 'next/image';
import { formatCrypto, explorerUrls } from '@/utils/utils';
import vesting_antix from '/public/svg/vantix-icon.svg';
import TetherIcon from "/public/svg/tether-icon.svg";
import BNBIcon from "/public/svg/bnb-icon.svg";
import USDCIcon from "/public/svg/usdc-icon.svg";
import ETHIcon from "/public/svg/ether-icon.svg";
import DEGENIcon from "/public/svg/degen-coin.svg";
import WETHIcon from "/public/svg/wethera-coin.svg";
import CBBTCIcon from "/public/svg/cbbtc-coin.svg";
import MANTRAIcon from "/public/svg/mantra-coin.svg";
import BASEIcon from '/public/svg/base-chain.svg';

const tokensIcons:any = {
    BNB  : BNBIcon,
    USDC : USDCIcon,
    ETH  : ETHIcon,
    cbBTC : CBBTCIcon,
    DEGEN : DEGENIcon,
    MANTRA : MANTRAIcon,
    WETH : WETHIcon,
    BASE : BASEIcon,
    USDT : TetherIcon,
}

const tokensSymbols:any = {
   '1_0x0000000000000000000000000000000000000000' :'ETH',
   '1_0xdac17f958d2ee523a2206206994597c13d831ec7' :'USDT',
   '1_0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' :'USDC',

   '56_0x0000000000000000000000000000000000000000' :'BNB',
   '56_0x55d398326f99059ff775485246999027b3197955' :'USDT',
   '56_0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d' :'USDC',

   '8453_0x0000000000000000000000000000000000000000' : 'ETH',
   '8453_0x4200000000000000000000000000000000000006' : 'WETH',
   '8453_0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' : 'USDC',
   '8453_0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf' : 'cbBTC',
   '8453_0x3992B27dA26848C2b19CeA6Fd25ad5568B68AB98' : 'MANTRA',
   '8453_0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed' : 'DEGEN',
}


function getTokenSymbol(chainId:number, address:string){
   return tokensSymbols[chainId+'_'+address.toLowerCase()]
}

export const TransactionItem = ({tx}:{tx:any}) => {
   const tokenSymbol = getTokenSymbol(tx.chainId, tx.token)
   const tokenIcon = tokensIcons[tokenSymbol]

   let received = tx.vAntix
   if (!received || received === '0' || received === '-') received = 0

   return (
      <ul
         className={s.transaction}
      >
         <li>{new Date(tx.createdAt).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</li>
         <li>{tx.type}</li>
         <li>
               <Image
                  src={tokenIcon}
                  alt="amount-icon"
                  width={24}
                  height={24}
               />
               <p>
                  {formatCrypto(tx.amount)}
                  {" "}
                  {tokenSymbol}
               </p>
         </li>
         <li>{!!received && <>
            <Image
               src={vesting_antix}
               alt="vesting-antix"
               width={24}
               height={24}
               className={s.vestingAntix}
            />
            {formatCrypto(received)} vAntix
         </>}</li>
         <li>
            Deposit Stage #{tx.stage}
         </li>
         <li>
            <a href={explorerUrls[tx.chainId] + '/tx/' + tx.hash} className={s.address} target="_blank" rel="noreferrer, noopener">View Transaction</a>
         </li>
      </ul>
   );
};
