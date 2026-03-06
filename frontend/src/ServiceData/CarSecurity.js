import { FaShieldAlt, FaLock, FaKey, FaMapMarkerAlt, FaTools, FaPhoneAlt } from "react-icons/fa";

export const motHeroData = {
  badge: "Qualified Technicians",

  title: {
    highlight: "Car Security Installation",
  },

  description: {
    // beforeBold: "Trust ",
    // bold: "Naz Motors",
    afterBold:
      "Protect your vehicle with advanced car security systems installed by MA Auto Electrics. Our expert solutions safeguard against theft and unauthorized access while giving you peace of mind.",
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

export const emergencyCtaData = {
  palette: {
    primary: "#317F21",
    fgOnPrimary: "#FFFFFF",
    secondaryBg: "#C6F0C2",
    secondaryText: "#3B0000",
    outline: "#FFFFFF",
    darkBg: "#9B0D24",
  },

  heading: "Car Electric Specialists in Accrington, Lancashire",

  subheading:
    "Contact MA Auto Electrics today for professional car security installation and upgrades.",

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

export const automotiveServicesData = {
  heading: {
    title: "Professional Car Security Services",
    subtitle:
      "Expert installation and setup of modern car security systems for all vehicles",
  },

  services: [
    {
      title: "Alarm Systems",
      desc: "Reliable alarms to deter theft and alert you to unauthorized access.",
      icon: FaShieldAlt,
      points: [
        "Audible and visible alarm alerts",
        "Motion and impact sensors",
        "Remote arming and disarming",
        "Compatible with most vehicles",
      ],
    },
    {
      title: "Immobilisers",
      desc: "Prevent your car from being started without the correct key or fob.",
      icon: FaLock,
      points: [
        "Engine immobilisation technology",
        "Key and fob recognition",
        "Added layer of theft protection",
        "Professional programming and setup",
      ],
    },
    {
      title: "Central Locking & Remote Entry",
      desc: "Upgrade your vehicle’s locking system for convenience and security.",
      icon: FaKey,
      points: [
        "Keyless entry installation",
        "Remote central locking controls",
        "Integration with alarm systems",
        "Factory-standard fitting",
      ],
    },
    {
      title: "GPS Tracking & Recovery Systems",
      desc: "Track your vehicle in real-time and aid recovery in case of theft.",
      icon: FaMapMarkerAlt,
      points: [
        "Real-time location tracking",
        "Geofencing and alerts",
        "Theft recovery assistance",
        "Integration with mobile apps",
      ],
    },
    {
      title: "Professional Installation & Maintenance",
      desc: "All security systems installed by skilled technicians for optimal reliability.",
      icon: FaTools,
      points: [
        "Neat, concealed wiring",
        "Compatibility checks with vehicle electronics",
        "System testing and verification",
        "User guidance and support",
      ],
    },
  ],
};



export const majorServicesData = {
  service_name: "Professional Car Security Services",
  intro_description:
    "Our professional car security installations give you peace of mind, protect your investment, and enhance the safety of your vehicle.",

  benefits: [
    {
      title: "Experienced Auto Electrical Specialists",
      description:
        "Our skilled technicians have extensive experience installing car security systems with precision, reliability, and attention to detail.",
    },
    {
      title: "High-Quality, Reliable Security Systems",
      description:
        "We use only top-tier security systems to ensure maximum protection against theft and unauthorized access.",
    },
    {
      title: "Professional & Discreet Installation",
      description:
        "All systems are installed neatly and discreetly, maintaining your vehicle’s aesthetics while ensuring full functionality.",
    },
    {
      title: "Compatible with All Makes & Models",
      description:
        "Our car security solutions are designed to work with every type of vehicle, from compact cars to luxury models.",
    },
    {
      title: "Ongoing Support & Maintenance",
      description:
        "We provide continued guidance, system checks, and maintenance to keep your security system operating at peak performance.",
    },
  ],

  signs: [
    "Concern about theft or break-ins",
    "Older or non-functional security system",
    "Desire for remote control and monitoring",
    "Frequent parking in high-risk areas",
    "Need for GPS tracking and recovery",
  ],
};
