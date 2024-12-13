import { FC } from 'react';
import styles from './NewsItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';

interface INewsItem {
  date: string;
  text: string;
  image: string;
  url: string;
}

const NewsItem: FC<INewsItem> = ({ date, text, image, url }) => {
  return (
    <div className={styles.container}>
      <p className={styles.date}>{date}</p>
      <p className={styles.text}>{text}</p>

      <div className={styles.bottom}>
        <Image src={image} alt="logo" width={120} height={38} />
        <Link
          href={url}
          target="_blank"
          className={styles.btnReadMore}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default NewsItem;
