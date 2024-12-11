import React from 'react';
import Header from '@/sections/Header/Header';
const Footer = dynamic(() => import("@/sections/Footer/Footer"), { ssr: false });
import Image from 'next/image';

import 'swiper/scss';
import 'swiper/scss/navigation';
import BackIcon from '@/public/svg/back-icon.svg';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Arrow from '@/public/svg/top-arrow.svg';

import styles from './news.module.scss';
import NewsItem from '@/components/NewsItem/NewsItem';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

const countries = [
  'Brazilian',
  'Chinese',
  'Czech',
  'English',
  'French',
  'German',
  'Indonesian',
  'Italian',
  'Japanese',
  'Korean',
  'Latvian',
  'Malay',
  'Polish',
  'Portuguese',
  'Romanian',
  'Russian',
  'Spanish',
  'Turkish',
  'Ukrainian',
  'Vietnamese',
];

const News = () => {
  const router = useRouter();
  const { t } = useTranslation('dashboard');

  return (
    <main className={styles.page}>
      <Header isDashboard isNews />
      <section className={styles.container}>
        <div className={styles.titleWrapper}>
          <button className={styles.btnBack} onClick={() => router.push('/')}>
            <Image src={BackIcon} alt="Go back" width={24} height={24} />
          </button>
          <h2 className={styles.title}>{t('news.title')}</h2>
        </div>

        <div className={styles.allMediaWrapper}>
          <Image
            src={'/images/flags/English.png'}
            alt="Flag"
            width={24}
            height={24}
          />
          <h4 className={styles.allMediaTitle}>{t('news.allMedia')}</h4>
        </div>

        <div className={styles.newsWrapper}>
          <NewsItem date='2024-11-01' image='/images/featured-in/1.png' text="Antix Entra em Cripto com o Lançamento do Token ANTIX, Oferecendo Acesso Antecipado a Humanos Digitais Potencializados por IA" />
          <NewsItem date='2024-11-01' image='/images/featured-in/2.png' text="Antix Entra em Cripto com o Lançamento do Token ANTIX, Oferecendo Acesso Antecipado a Humanos Digitais Potencializados por IA" />
          <NewsItem date='2024-11-01' image='/images/featured-in/3.png' text="Antix Entra em Cripto com o Lançamento do Token ANTIX, Oferecendo Acesso Antecipado a Humanos Digitais Potencializados por IA" />
          <NewsItem date='2024-11-01' image='/images/featured-in/4.png' text="Antix Entra em Cripto com o Lançamento do Token ANTIX, Oferecendo Acesso Antecipado a Humanos Digitais Potencializados por IA" />
        </div>
      </section>
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderTitle}>{t('news.readLocalNews')}</div>
        <div className={styles.slider}>
          <Swiper
            spaceBetween={32}
            slidesPerView={3}
            navigation={{
              nextEl: '#next-slide',
              prevEl: '#prev-slide',
            }}
            modules={[Navigation]}
            loop={true}
          >
            {countries.map((country, index) => (
              <SwiperSlide
                className={styles.slideWrapper}
                key={`${country}-${index}`}
              >
                <div className={styles.slideName}>
                  <Image
                    src={`/images/flags/${country}.png`}
                    alt="Flag"
                    width={32}
                    height={32}
                  />
                  <span>{country}</span>
                </div>
                <Image
                  src={BackIcon}
                  alt=""
                  width={44}
                  height={44}
                  className={styles.sliderArrow}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.prevSlide} id="prev-slide">
            <Image src={Arrow} alt="Previous" width={20} height={10} />
          </div>
          <div className={styles.nextSlide} id="next-slide">
            <Image src={Arrow} alt="Next" width={20} height={10} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default News;
