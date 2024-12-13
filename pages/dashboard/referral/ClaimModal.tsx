import styles from './ClaimModal.module.scss';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useChainId } from 'wagmi';
import { explorerUrls } from '@/utils/utils'

export type ModalStatus = 'none' | 'pending' | 'success' | 'fail';
interface ModalProps {
   txHash   : string
   status   : ModalStatus,
   retryFn  : Function
}

export default function ClaimStatusModal({ txHash, status, retryFn }: ModalProps) {
   const chainId = useChainId()
   const dialog:any = useRef(null)
   const [dataStatus, setDataStatus] = useState(status);

   const { t } = useTranslation('dashboard');

   useEffect(()=>{
      setDataStatus(status)
   },[status])

   useEffect(()=>{
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
         desc  : <p className={styles.successTitle}>{t('stage.referral.claim.successStatus.text')}<a href={txUrl} target='_blank' rel="noopener">{t('stage.referral.claim.successStatus.link')}</a></p>
      }
   } as any)[dataStatus] || {}


   function reloadPage(){
      window.location.reload()
   }


   return <dialog ref={dialog} popover="auto" className={styles.modal} data-status={dataStatus}>
      <button data-action="close" onClick={close}></button>

      <figure></figure>
      {content.title !== '' && <h5>{content.title}</h5>}
      <article>{content.desc}</article>

      {dataStatus ==='fail' && <button style={{ marginTop: 16 }} className={styles.btn} onClick={()=>retryFn()}>{t('stage.depositModal.fail.retry')}</button>}

      {dataStatus === 'success' && (
         <button style={{ marginTop: 16 }} className={styles.btn} onClick={()=>reloadPage()}>{t('stage.referral.claim.continue')}</button>
      )}
   </dialog>
}
