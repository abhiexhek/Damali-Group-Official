/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Brands", href: "#brands" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Contact", href: "#contact" }
];

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "#about" },
    { label: "Why Us", href: "#why-choose-us" },
    { label: "Our History", href: "#about" },
    { label: "Careers (Retail Partners)", href: "#contact" }
  ],
  support: [
    { label: "B2B Contact Form", href: "#contact" },
    { label: "Warranty Routing", href: "#why-choose-us" },
    { label: "Office Directions", href: "#contact" },
    { label: "Inquiry Archives", href: "#contact" }
  ]
};
