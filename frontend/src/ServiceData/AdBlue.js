import {
  FaPhoneAlt,
  FaCar,
} from "react-icons/fa";





export const motHeroData = {
  badge: "Trusted Vehicle Care",

  title: {
    before: "AdBlue",
    highlight: "Services",
  },

  description: {
    afterBold:
      "Professional AdBlue system diagnostics and repairs to keep your diesel vehicle compliant and running smoothly.",
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
    title: "Professional AdBlue Services",
    subtitle: "Specialist diagnosis and repair of AdBlue system faults",
  },

  services: [
    {
      title: "AdBlue System Diagnostics & Repairs",
      desc: "Reliable solutions for AdBlue-related issues.",
      icon: FaCar,
      points: [
        "AdBlue fault code diagnosis",
        "Sensor and injector checks",
        "System repairs and resets",
      ],
    },
  ],
};


export const majorServicesData = {
  service_name: "AdBlue Services",

  intro_description:
    "Why Choose MA Auto Electrics for AdBlue Services?\n✓ Diesel emissions specialists\n✓ Accurate system diagnostics\n✓ Compliance-focused repairs\n✓ Reliable and professional service",

  benefits: [
    {
      title: "Diesel Emissions Specialists",
      description:
        "Our team has expert knowledge in diesel emissions and AdBlue systems to ensure compliance and efficiency.",
    },
    {
      title: "Accurate System Diagnostics",
      description:
        "We use professional diagnostic tools to identify AdBlue system faults precisely and quickly.",
    },
    {
      title: "Compliance-Focused Repairs",
      description:
        "All repairs are carried out to ensure your vehicle meets emission standards and regulations.",
    },
    {
      title: "Reliable and Professional Service",
      description:
        "Our services are performed with professionalism, reliability, and attention to detail.",
    },
  ],

  signs: [
    "AdBlue warning messages",
    "Vehicle not starting due to AdBlue fault",
    "Reduced engine performance",
    "Dashboard countdown warnings",
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

  heading: "AdBlue Specialists in Accrington, Lancashire",

  subheading:
    "Choose MA Auto Electrics for professional AdBlue system diagnostics and repairs you can trust.",

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
