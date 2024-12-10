import styles from './StatusModal.module.scss';
import { useRef, useEffect, useState } from 'react';
import { useChainId } from 'wagmi';
import EmailForm from './EmailForm';
// import Link from 'next/link'
import { TgIcon } from '@/components/GotQuestions/icons/TgIcon'
import { explorerUrls } from '@/utils/utils'
import { useTranslation } from 'react-i18next';

export type ModalStatus = 'none' | 'pending' | 'success' | 'email' | 'subscribed' | 'fail';
interface ModalProps {
   txHash   : string
   status   : ModalStatus,
   retryFn  : Function
}

export default function DepositStatusModal({ txHash, status, retryFn }: ModalProps) {
   const chainId = useChainId()
   const dialog:any = useRef(null)
   const [dataStatus, setDataStatus] = useState(status);

   const { t } = useTranslation();

   useEffect(()=>{
      setDataStatus(status)
   },[status])

   useEffect(()=>{
      console.log('useeffect dataStatus', dataStatus, dialog.current)
      if (dataStatus === 'none' || !dialog.current) return
      
      dialog.current.showModal()
   }, [dataStatus])

   function close(){
      dialog.current.close()
   }

   const txUrl = explorerUrls[chainId] + '/tx/' + txHash
   const content:any = ({
      pending: {
         title : t('stage.depositModal.pending'),
         desc  : <></>
      },
      fail: {
         title : t('stage.depositModal.fail.title'),
         desc  : <><p>{t('stage.depositModal.fail.text_1')}</p>
            <p style={{ marginTop: 24 }}>{t('stage.depositModal.fail.text_2')}<a style={{ color: '#12FFF1' }} href="https://t.me/antixtoken_bot" rel='noopener' target='_blank'>{t('stage.depositModal.fail.link')}</a></p></>
      },
      success: {
         title : t('stage.depositModal.success.title'),
         desc  : (
            <>
               <p className={styles.successTitle}>{t('stage.depositModal.success.title')}<a href={txUrl} target='_blank' rel="noopener">{t('stage.depositModal.success.link_1')}</a></p>

               <p className={styles.successDesc}>
                  {t('stage.depositModal.success.text_3')}
                  <a
                     className={styles.tgBot}
                     href="https://t.me/antixtoken_bot?start=w32496746"
                     target='_blank'
                     rel='noopener'
                  >
                     <TgIcon />
                     {t('stage.depositModal.success.link_2')}
                  </a>{" "}
                  {t('stage.depositModal.success.text_4')}
               </p>
            </>
         )
      },
      email: {
         title: '',
         desc: <EmailForm dataStatus={dataStatus} setDataStatus={setDataStatus} />
      },
      subscribed: {
         title: '',
         desc: (
            <p>
               {t('stage.depositModal.subscribed')}
            </p>
         )
      }
   } as any)[dataStatus] || {}


   return <dialog ref={dialog} popover="auto" className={styles.modal} data-status={dataStatus}>
      <button data-action="close" onClick={close}></button>

      <figure></figure>
      {content.title !== '' && <h5>{content.title}</h5>}
      <article>{content.desc}</article>

      {dataStatus ==='fail' && <button style={{ marginTop: 16 }} className={styles.btn} onClick={()=>retryFn()}>{t('stage.depositModal.fail.retry')}</button>}

      {dataStatus === 'success' && (
         <>
            <a href="https://t.me/antixtoken_bot?start=w32496746" target="_blank" className={styles.openTelegram}>
               {t('stage.depositModal.success.link_3')}
            </a>
            <span onClick={()=>setDataStatus('email')} className={styles.openEmailForm}>{t('stage.depositModal.success.subscribe')}</span>
         </>
      )}
   </dialog>
}
