import React from 'react';
import Header from '@/sections/Header/Header';
import Footer from '@/sections/Footer/Footer';
import Image from 'next/image';

import 'swiper/scss';
import 'swiper/scss/navigation';
import BackIcon from '@/public/svg/back-icon.svg';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Arrow from '@/public/svg/top-arrow.svg';

import styles from './news.module.scss';

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

  return (
    <main className={styles.page}>
      <Header isDashboard isNews />
      <section className={styles.container}>
        <div className={styles.titleWrapper}>
          <button className={styles.btnBack} onClick={() => router.push('/')}>
            <Image src={BackIcon} alt="Go back" width={24} height={24} />
          </button>
          <h2 className={styles.title}>What are the news everywhere?</h2>
        </div>

        <div className={styles.allMediaWrapper}>
          <Image
            src={'/images/flags/English.png'}
            alt="Flag"
            width={24}
            height={24}
          />
          <h4 className={styles.allMediaTitle}>All media</h4>
        </div>

        <div className={styles.sliderTitle}>Read your local Antix news in</div>
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
      </section>
      <Footer />
    </main>
  );
};

export default News;
