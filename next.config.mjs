import withVideos from "next-videos";

const DOMAIN = 'token.antix.in'

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: 'https://antix.cryptoindex.com',
        // API_URL: 'http://localhost:3001',
        TOKENSALE_ETH: '0x35b8f67107b7C04Cef5a3ab92170ac16Ca61BEd6',
        TOKENSALE_BSC: '0x69838c1E7646B9e76Aa8Aa897cB55a4Bc7717ed4',
        TOKENSALE_BASE: '0x7393bF067c7a274776A12359d2BC519689f3F4fc',
        WALLET_CONNECT_ID: 'd193e168fb88acc351bc3e4027699fa7',
        DOMAIN: DOMAIN,
        REFERRAL_LINK: 'https://'+DOMAIN+'/?refcode=',
    },
    reactStrictMode: false,
    images: {
        unoptimized: true, 
    },
    output: 'export',
    transpilePackages: ['gsap'],
    webpack: config => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
    }
};

export default withVideos({
    ...nextConfig,
});
