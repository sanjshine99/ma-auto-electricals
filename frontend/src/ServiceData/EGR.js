import {
  FaPhoneAlt,
  FaCar,
    
} from "react-icons/fa";





export const motHeroData = {
  badge: "Trusted Vehicle Care",

  title: {
    before: "EGR",
    highlight: "Services",
  },

  description: {
    afterBold:
      "Keep your emissions system working efficiently with professional EGR diagnostics and repairs.",
  },

  buttons: {
    primary: {
      text: "Call: +44 7889 133123",
      href: "tel:+447889133123",
      icon: FaPhoneAlt,
      bg: "#317F21",
      color: "#FFFFFF",
    },
    secondary: {
      text: "Book Service",
      href: "/contact",
      border: "#317F21",
      color: "#317F21",
      hoverBg: "#317F21",
      hoverColor: "#FFFFFF",
    },
  },
};






export const automotiveServicesData = {
  heading: {
    title: "Professional EGR Services",
    subtitle: "Inspection, cleaning, and replacement of faulty EGR systems",
  },

  services: [
    {
      title: "EGR Valve Diagnostics & Repairs",
      desc: "Restore engine efficiency and emissions control.",
      icon: FaCar,
      points: [
        "EGR fault diagnosis",
        "EGR valve cleaning",
        "EGR replacement if required",
      ],
    },
  ],
};

export const majorServicesData = {
  service_name: "EGR Services",

  intro_description:
    "Why Choose MA Auto Electrics for EGR Services?\n✓ Emissions system expertise\n✓ Accurate diagnostics\n✓ Improved engine performance\n✓ Reduced emissions issues",

  benefits: [
    {
      title: "Emissions System Expertise",
      description:
        "Our team has specialist knowledge of EGR systems to ensure your vehicle runs efficiently and meets emissions standards.",
    },
    {
      title: "Accurate Diagnostics",
      description:
        "We use professional diagnostic tools to identify EGR faults quickly and precisely.",
    },
    {
      title: "Improved Engine Performance",
      description:
        "Proper EGR servicing restores engine efficiency and helps prevent power loss.",
    },
    {
      title: "Reduced Emissions Issues",
      description:
        "Our services help minimize harmful emissions and maintain compliance with environmental standards.",
    },
  ],

  signs: [
    "Loss of power",
    "Engine warning light",
    "Rough idling",
    "Increased emissions",
  ],
};




export const emergencyCtaData = {
  palette: {
    primary: "#317F21",
    fgOnPrimary: "#FFFFFF",
    secondaryBg: "#C6F0C2",
    secondaryText: "#3B0000",
    outline: "#FFFFFF",
    darkBg: "#9B0D24",
  },

  heading: "EGR Specialists in Accrington, Lancashire",

  subheading:
    "Choose MA Auto Electrics for professional EGR system diagnostics and repairs you can trust.",

  buttons: {
    call: {
      text: "Call +44 7889 133123",
      href: "tel:+447889133123",
      icon: FaPhoneAlt,
    },
    book: {
      text: "Book Service",
      href: "/contact",
    },
  },
};
