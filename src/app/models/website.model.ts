import { AboutUs } from "./about-us.model";
import { Address } from "./address.model";
import { Menu } from "./menu.model";
import { MetaTags } from "./meta-tags.model";
import { Payments } from "./payments.model";
import { SocialMedia } from "./social-media.model";
import { ThemeColor } from "./theme-color.model";

export class Website {
    aboutUs: AboutUs;
    aboutUsImage: string = "";
    acHoldName: string = "";
    acNo: number = null;
    active: boolean;
    address: Address;
    brand_logo: string = "";
    businessCategory: string = "";
    customDomains: [];
    domainName: string = "";
    email: string = "";
    enableCart: boolean;
    enableCustomDomain: boolean;
    enableEcommerce: boolean;
    galleryLimit: number = 10;
    ifsc: string = "";
    mainMenu: Menu;
    metaTags: MetaTags;
    multipleLanguage: boolean;
    noscript:string = ""
    ownerName: string = "";
    payments: Payments;
    phoneNo: number = null;
    productsLimit: number = 10;
    productButton: string = "";
    productHeading: string = "";
    resellerCode: string = "";
    script: string = "";
    serviceHeading: string = "";
    servicesLimit: number = 10;
    shopName: string = "";
    sliderLimit: number = 3;
    socialMedia: SocialMedia;
    style: string = "";
    termsAndConditions: string = "";
    testimonialHeading: string = "";
    theme: number = null;
    themeColors: ThemeColor;
    themeCover: string = "";
    validity: any;
    whatsappNo: string = ""
}