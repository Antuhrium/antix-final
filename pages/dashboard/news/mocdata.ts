type newsItemType = {
  id: number;
  title: string;
  date: string;
  image: string;
  link: string;
};

type newsType = {
  [key: string]: newsItemType[];
};

const news: newsType = {
  en: [
    {
      id: 1,
      title: 'Antix Rolls Out AVAGEN Update And Brings Crypto And Web3 To Digital Humans',
      date: '2024-08-16',
      image: '/images/featured-in/7.png',
      link: 'https://cryptopanic.com/news/19803012/Antix-Rolls-Out-AVAGEN-Update-and-Brings-Crypto-and-Web3-to-Digital-Humans',
    },
  ],
};
