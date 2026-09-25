/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompanyInfo, Statistic, ServiceFeature, TimelineAchievement } from '../types';

export const COMPANY_CONFIG: CompanyInfo = {
  name: "Damali Group",
  shortName: "Damali Group",
  tagline: "Trusted Distributor of Leading FMCG & Home Appliance Brands in Morang, Nepal",
  description: "Established as a premiere distribution house in Morang, we bridge the gap between global brands and local households. We deliver genuine, high-quality Fast Moving Consumer Goods (FMCG) and Home Appliances to hundreds of retail partners across the region, ensuring fast supply, comprehensive customer care, and reliable inventory management.",
  mission: "To empower regional merchants and deliver original premium-grade home appliances and consumer products across Morang, Nepal with a seamless, highly optimized supply chain that builds long-term commercial trust.",
  vision: "To become the absolute standard for enterprise-level distribution in Eastern Nepal, recognized for our commitment to authenticity, innovative logistics, and strong regional market access.",
  experienceYears: 12,
  phoneNumbers: [
    "+977 9852030291"
  ],
  whatsapp: "9852030291",
  whatsappUrl: "https://wa.me/9779852030291",
  emails: [
    "info@damaligroup.com.np",
    "inquiries@damaligroup.com.np"
  ],
  addresses: {
    office: "Damali Group Corporate Office, Main Highway Road",
    city: "Morang",
    country: "Nepal",
    // Exact Google Maps location coordinates: 26.655216617100947, 87.559809525134
    mapEmbedUrl: "https://maps.google.com/maps?q=26.655216617100947,87.559809525134&hl=en&z=17&output=embed",
    coordinates: {
      lat: 26.655216617100947,
      lng: 87.559809525134
    },
    googleMapsLink: "https://www.google.com/maps?q=26.655216617100947,87.559809525134"
  },
  socialLinks: {
    facebook: "https://www.facebook.com/share/19PALjUoUB/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/damali_electronics?igsi=MThmd2x3b3l6NnE0MA%3D%3D&utm_source=qr",
    whatsapp: "https://wa.me/9779852030291"
  }
};

export const STATISTICS_DATA: Statistic[] = [
  {
    id: "years-in-biz",
    value: "18+",
    label: "Years in Business",
    description: "Serving the Nepalese consumer market since 2008 with pride and reliability."
  },
  {
    id: "brands-distributed",
    value: "25+",
    label: "Brands Represented",
    description: "Official authorized dealer of leading international and domestic giants."
  },
  {
    id: "retail-partners",
    value: "1,200+",
    label: "Retail Partners",
    description: "Strong, ever-growing network of wholesalers, supermarkets, and electronic shops."
  },
  {
    id: "coverage",
    value: "Eastern",
    label: "Region Coverage",
    description: "Serving Morang and surrounding districts of Eastern Nepal with top-tier logistics."
  }
];

export const SERVICE_FEATURES: ServiceFeature[] = [
  {
    id: "genuine-products",
    title: "100% Genuine Products",
    description: "We are authorized, direct-from-manufacturer distributors. Every beverage, appliance, or purifier is guaranteed 100% original with manufacturer warranties.",
    iconName: "ShieldCheck"
  },
  {
    id: "fast-supply",
    title: "Fast, Reliable Logistics",
    description: "Our dedicated vehicle fleet delivers orders promptly to retailers across metropolitan, suburban, and rural sectors without delay.",
    iconName: "Truck"
  },
  {
    id: "large-inventory",
    title: "Massive Ready Stock",
    description: "With modern centralized temperature-controlled warehouses, we maintain extensive inventory levels to safeguard supply consistency even during peak seasons.",
    iconName: "Warehouse"
  },
  {
    id: "support",
    title: "Excellent Enterprise Support",
    description: "Dedicated account managers provide commercial support, point-of-sale materials, training, and seamless after-sales service claim routing.",
    iconName: "Headphones"
  },
  {
    id: "trusted-brands",
    title: "World's Top Brands",
    description: "Partnered directly with household giants including LG, Samsung, Coca-Cola, Panasonic, and Luminous to build deep consumer confidence.",
    iconName: "Award"
  },
  {
    id: "regional-logistics",
    title: "Regional Logistics Hub",
    description: "Centrally located in Morang, ensuring efficient, rapid delivery and strong supply lines to all regional retail partners.",
    iconName: "MapPin"
  }
];

export const TIMELINE_ACHIEVEMENTS: TimelineAchievement[] = [
  {
    year: "2014",
    title: "Coca-Cola",
    status: "active",
    description: "Appointed authorized distribution partner for Coca-Cola, building an extensive beverage supply chain and cold-chain logistics network across the region.",
    brands: ["Coca-Cola", "Sprite", "Fanta"]
  },
  {
    year: "2022",
    title: "Parle Agro — Frooti, Appy, Fizz, Smoodh",
    status: "active",
    description: "Established strategic FMCG distribution partnership with Parle Agro, delivering market-leading beverage staples including Frooti, Appy, Fizz, and Smoodh.",
    brands: ["Frooti", "Appy", "Fizz", "Smoodh"]
  },
  {
    year: "2024",
    title: "Red Bull",
    status: "active",
    description: "Expanded our premium beverage distribution portfolio with Red Bull energy drinks, servicing hundreds of commercial retail shelves.",
    brands: ["Red Bull"]
  },
  {
    year: "2025",
    title: "Home Appliances — LG, Samsung, etc.",
    status: "active",
    category: "Home Appliances",
    description: "Pioneered a dedicated Home Appliances distribution category, partnering with global consumer electronics leaders including LG, Samsung, and other leading appliance brands.",
    brands: ["LG", "Samsung", "Panasonic", "Haier", "Skyworth", "Midea", "IFB"]
  }
];
