import TokenIcon from "/public/svg/mobile-menu/token.svg";
import WhitepaperIcon from "/public/svg/mobile-menu/whitepaper.svg";
import BuyNowIcon from "/public/svg/mobile-menu/buy-now.svg";
import MyAccountIcon from "/public/svg/mobile-menu/my-account.svg";


type linksType = {
    label: string;
    href: string;
    disabled?: boolean;
};

export const links: linksType[] = [
    {
        label: "Token",
        href: "ANTIXTokens",
    },
    {
        label: "Whitepaper",
        href: "https://antix.gitbook.io/antix-white-paper",
    },
    {
        label: "Buy Now",
        href: "Hero",
    },
];

export const linksDashboard: linksType[] = [
    {
        label: "Dashboard",
        href: "",
        disabled: false,
    },
    {
        label: "Claim",
        href: "",
        disabled: true,
    },
    {
        label: "Referral",
        href: "",
        disabled: true,
    },
];

type mobileLinksType = {
    label: string;
    href: string;
    icon?: string;
    disabled?: boolean;
};

export const mobileLinks: mobileLinksType[] = [
    {
        label: "Token",
        href: "ANTIXTokens",
        icon: TokenIcon,
    },
    {
        label: "Whitepaper",
        href: "https://antix.gitbook.io/antix-white-paper",
        icon: WhitepaperIcon,
    },
    {
        label: "Buy Now",
        href: "Hero",
        icon: BuyNowIcon,
    },
    {
        label: "My Account",
        href: "/dashboard",
        icon: MyAccountIcon,
    },
];

export const mobileLinksDashboard: mobileLinksType[] = [
    {
        label: "Dashboard",
        href: "",
        disabled: false,

    },
    {
        label: "Claim",
        href: "",
        disabled: true,
    },
    {
        label: "Referral",
        href: "",
        disabled: true,
    },
    {
        label: "Back to the Main Page",
        href: "/",
        disabled: false,
    },
];
