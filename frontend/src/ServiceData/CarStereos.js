import {
  FaPhoneAlt,
  FaCar,
  FaBluetooth,
  FaTools,
  FaMobileAlt,
  FaMusic,


} from "react-icons/fa";

export const motHeroData = {
  badge: "Car Audio Specialists",

  title: {
    before: "Car Stereo",
    highlight: "Installation Services",
  },

  description: {
    afterBold:
      "Upgrade your driving experience with professional car stereo supply and installation from MA Auto Electrics. We fit modern audio systems that deliver superior sound quality, connectivity, and reliability.",
  },

  buttons: {
    primary: {
      text: "Book: +44 7889 133123‬",
      href: "tel:+447889133123",
      icon: FaPhoneAlt,
      bg: "#317F21",
      color: "#FFFFFF",
    },
    secondary: {
      text: "Book Your Service",
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
    title: "Professional Car Stereo Services",
    subtitle:
      "Expert installation of car audio systems tailored to your vehicle and personal preferences",
  },

  services: [
    {
      title: "Car Stereo Installation",
      desc:
        "Professional fitting of car stereos to ensure seamless integration and optimal performance.",
      icon: FaCar,
      points: [
        "Single DIN & Double DIN units",
        "Factory stereo replacement",
        "Secure wiring and mounting",
        "Clean, factory-finish installation",
      ],
    },
    {
      title: "Bluetooth & Smart Connectivity",
      desc:
        "Stay connected on the road with modern Bluetooth-enabled stereo systems.",
      icon: FaBluetooth,
      points: [
        "Bluetooth handsfree calling",
        "Wireless music streaming",
        "Smartphone integration",
        "Voice control compatibility",
      ],
    },
    {
      title: "Apple CarPlay & Android Auto",
      desc:
        "Upgrade to smart infotainment systems for safer and more convenient driving.",
      icon: FaMobileAlt,
      points: [
        "Apple CarPlay installation",
        "Android Auto support",
        "Touchscreen displays",
        "Navigation and app integration",
      ],
    },
    {
      title: "Sound System Upgrades",
      desc:
        "Enhance your vehicle’s audio quality with professional sound upgrades.",
      icon: FaMusic,
      points: [
        "Speaker upgrades",
        "Amplifier installation",
        "Subwoofer fitting",
        "Improved sound clarity and bass",
      ],
    },
    {
      title: "Stereo Fault Diagnosis & Repairs",
      desc:
        "We diagnose and repair issues with existing car audio systems.",
      icon: FaTools,
      points: [
        "No sound or distorted audio",
        "Wiring faults",
        "Screen or display issues",
        "Bluetooth connection problems",
      ],
    },
  ],
};


export const majorServicesData = {
  service_name: "Car Stereo Services",

  intro_description:
    "Our experienced technicians ensure your car stereo is installed safely, professionally, and to the highest standard, using quality components and industry best practices.",

  benefits: [
    {
      title: "Experienced Auto Electrical Specialists",
      description:
        "Our skilled technicians specialise in car audio installations, ensuring every stereo system is fitted correctly and safely.",
    },
    {
      title: "High-Quality Branded Systems",
      description:
        "We supply and install trusted, high-quality stereo brands for excellent sound, reliability, and long-term performance.",
    },
    {
      title: "Neat, Damage-Free Installation",
      description:
        "All installations are completed with clean wiring and secure mounting, leaving a factory-finish with no damage to your vehicle.",
    },
    {
      title: "Wide Vehicle Compatibility",
      description:
        "Our stereo installations are compatible with most vehicle makes and models, from older cars to modern vehicles.",
    },
    {
      title: "Honest Advice & Competitive Pricing",
      description:
        "We provide clear guidance on the best options for your needs, with fair pricing and no unnecessary upselling.",
    },
  ],

  signs: [
    "Poor or distorted sound quality",
    "No Bluetooth or handsfree capability",
    "Outdated or non-functional stereo unit",
    "Screen or control buttons not working",
    "Want modern features like Apple CarPlay or Android Auto",
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

  heading: "Car Stereo Specialists in Accrington, Lancashire",

  subheading:
    "Contact MA Auto Electrics today for expert car stereo installation and upgrades.",

  buttons: {
    call: {
      text: "Call +44 7889 133123‬",
      href: "tel:+447889133123",
      icon: FaPhoneAlt,
    },
    book: {
      text: "Book Service",
      href: "/contact",
    },
  },
};
