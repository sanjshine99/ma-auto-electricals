import {
  FaPhoneAlt,
  FaCar,  
} from "react-icons/fa";





export const motHeroData = {
  badge: "Trusted Vehicle Care",

  title: {
    before: "ECU Repairs &",
    highlight: "Services",
  },

  description: {
    afterBold:
      "Advanced ECU diagnostics, repairs, and replacements to restore optimal engine performance and reliability.",
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
    title: "Professional ECU Services",
    subtitle: "Accurate diagnosis and professional ECU-related repairs",
  },

  services: [
    {
      title: "ECU Diagnostics & Repairs",
      desc: "Specialist solutions for ECU faults.",
      icon: FaCar,
      points: [
        "ECU fault code analysis",
        "Wiring and sensor checks",
        "ECU repair or replacement",
        "Software-related issue diagnosis",
      ],
    },
  ],
};

export const majorServicesData = {
  service_name: "ECU Services",

  intro_description:
    "Why Choose MA Auto Electrics for ECU Services?\n✓ Advanced diagnostic tools\n✓ Experienced ECU specialists\n✓ Reliable and safe solutions\n✓ Suitable for modern vehicles",

  benefits: [
    {
      title: "Advanced Diagnostic Tools",
      description:
        "We use state-of-the-art diagnostic equipment to accurately identify ECU faults and issues.",
    },
    {
      title: "Experienced ECU Specialists",
      description:
        "Our team has in-depth knowledge and experience in ECU repairs, replacements, and software-related fixes.",
    },
    {
      title: "Reliable and Safe Solutions",
      description:
        "All ECU repairs are performed safely and reliably to restore optimal engine performance.",
    },
    {
      title: "Suitable for Modern Vehicles",
      description:
        "Our ECU services cater to modern vehicles with complex electronic systems, ensuring compliance and efficiency.",
    },
  ],

  signs: [
    "Engine warning light",
    "Poor engine performance",
    "Starting issues",
    "Unexplained electrical faults",
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

  heading: "ECU Specialists in Accrington, Lancashire",

  subheading:
    "Choose MA Auto Electrics for advanced ECU diagnostics, repairs, and replacements you can trust.",

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
