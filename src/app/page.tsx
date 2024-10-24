import type { Metadata } from 'next';

import Header from "@/sections/Header/Header";
import styles from "./page.module.scss";
import HeroSection from "@/sections/HeroSection/HeroSection";
import FeaturedIn from "@/sections/FeaturedIn/FeaturedIn";
import PlatformToReplace from "@/sections/PlatformToReplace/PlatformToReplace";
import MarketLeader from "@/sections/MarketLeader/MarketLeader";
import Why from "@/sections/Why/Why";
import Quote from "@/sections/Quote/Quote";
import NftPassport from "@/sections/NftPassport/NftPassport";
import Statistics from "@/sections/Statistics/Statistics";
import ReplacingHumans from "@/sections/ReplacingHumans/ReplacingHumans";
import Amazon from "@/sections/Amazon/Amazon";
import AntixFeatures from "@/sections/AntixFeatures/AntixFeatures";
import Creations from "@/sections/Creations/Creations";
import Tokenomics from "@/sections/Tokenomics/Tokenomics";
import JoinUs from "@/sections/JoinUs/JoinUs";
import ExclusiveOffer from "@/sections/ExclusiveOffer/ExclusiveOffer";
import Footer from "@/sections/Footer/Footer";
import UserFlow from "@/sections/UserFlow/UserFlow";
import AIDriven from "@/sections/AIDriven/AIDriven";
import AntixToken from "@/sections/AntixToken/AntixToken";
import Team from '@/sections/Team/Team';
import Advisors from "@/sections/Advisors/Advisors";
import DigitalMap from "@/sections/DigitalMap/DigitalMap";
import Roadmap from '@/sections/Roadmap/Roadmap';
// import FloatingWidget from "@/components/FloatingWidget/FloatingWidget";

export const metadata: Metadata = {
    title: 'Antix Digital Twins',
    description: 'Antix Digital Twins',
    openGraph: {
        title: "Antix Digital Twins",
        description: "Antix Digital Twins",
    }
};

export default function Home() {
    return (
        <div className={styles.container}>
            <Header />
            <HeroSection />
            <FeaturedIn />
            <PlatformToReplace />
            {/* <FloatingWidget /> */}
            <MarketLeader />
            <Why />
            <Quote />
            <Statistics />
            <ReplacingHumans />
            <Amazon />
            <AntixFeatures />
            <NftPassport />
            <Creations />
            <DigitalMap />
            <AIDriven />
            <AntixToken />
            <UserFlow />
            <Tokenomics />
            <Team />
            <Advisors />
            <Roadmap />
            <JoinUs />
            <ExclusiveOffer />
            <Footer />
        </div>
    );
}
