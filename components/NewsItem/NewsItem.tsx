import React from 'react';
import styles from './NewsItem.module.scss';
import Image from 'next/image';

interface INewsItem {
  date: string;
  text: string;
  image: string;
}

const NewsItem: React.FC<INewsItem> = ({ date, text, image }) => {
  return (
    <div className={styles.container}>
      <p className={styles.date}>{date}</p>
      <p className={styles.text}>{text}</p>

      <div className={styles.bottom}>
        <Image src={image} alt="logo" width={120} height={38} />
        <button className={styles.btnReadMore}>Read More</button>
      </div>
    </div>
  );
};

export default NewsItem;
