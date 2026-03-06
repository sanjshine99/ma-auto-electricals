import { FaPhoneAlt , FaPhone , FaCar,
  FaWrench,
  FaTools,
  FaClock,
  FaBolt,
  FaMapMarkerAlt,
  FaBell,
  FaTruck,} from "react-icons/fa";

export const motHeroData = {
  badge: "Qualified Technicians",

  title: {
    before: "Vehicle Tracking ",
    highlight: "System Installation",
  },

  description: {
    // beforeBold: "Trust ",
    // bold: "Naz Motors",
    afterBold:
      "Protect and monitor your vehicle with advanced vehicle tracking systems from MA Auto Electrics. Our solutions provide real-time location tracking, security, and peace of mind.",
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

  heading: " Car Electric Specialists in Accrington, Lancashire",

  subheading:
    "Contact MA Auto Electrics for professional vehicle tracking system installation and enhanced security for your vehicle.",

  buttons: {
    call: {
      text: "Call +44 7889 133123‬",
      href: "tel:+447889133123",
      icon: FaPhone,
    },
    book: {
      text: "Book Service",
      href: "/contact",
    },
  },
};


export const automotiveServicesData = {
  heading: {
    title: "Professional Vehicle Tracking Services",
    subtitle:
      "Expert installation and setup of vehicle tracking and monitoring systems for all vehicle types",
  },

  services: [
    {
      title: "GPS Vehicle Tracking",
      desc: "Real-time GPS tracking solutions for vehicle security and management.",
      icon: FaMapMarkerAlt,
      points: [
        "Accurate GPS location monitoring",
        "Mobile and desktop app integration",
        "Alerts for movement or unauthorized use",
        "Historical route and travel logs",
      ],
    },
    {
      title: "Geofencing & Alerts",
      desc: "Set up virtual zones and receive instant notifications.",
      icon: FaBell,
      points: [
        "Customizable virtual boundaries",
        "Instant notifications via app or SMS",
        "Movement and speed alerts",
        "Theft prevention monitoring",
      ],
    },
    {
      title: "Fleet & Asset Tracking",
      desc: "Efficient tracking and management of fleets and valuable assets.",
      icon: FaTruck,
      points: [
        "Real-time fleet monitoring",
        "Trip and mileage reports",
        "Vehicle usage analytics",
        "Optimized route management",
      ],
    },
    {
      title: "Professional Installation & Setup",
      desc: "All tracking systems installed by experienced technicians.",
      icon: FaTools,
      points: [
        "Concealed wiring and secure installation",
        "Compatibility checks with all vehicle models",
        "Full system testing and calibration",
        "User guidance and support",
      ],
    },
    {
      title: "Troubleshooting & Maintenance",
      desc: "Diagnosis and repair of existing tracking systems.",
      icon: FaWrench,
      points: [
        "Connectivity or signal issue resolution",
        "Tracking device fault repairs",
        "App or software integration fixes",
        "System recalibration and performance checks",
      ],
    },
  ],
};



export const majorServicesData = {
  service_name: "Vehicle Tracking Services",
  intro_description:
    "Our professional vehicle tracking installations enhance security, prevent theft, and give you complete control over your vehicle with reliable, real-time monitoring.",

  benefits: [
    {
      title: "Experienced Auto Electrical Specialists",
      description:
        "Our skilled technicians have extensive experience installing vehicle tracking systems with precision, reliability, and attention to detail."
    },
    {
      title: "Reliable Tracking Devices",
      description:
        "We install high-quality, dependable tracking devices that deliver accurate location data and consistent performance."
    },
    {
      title: "Discreet Professional Installation",
      description:
        "All tracking systems are installed neatly and discreetly, ensuring secure concealment without affecting your vehicle’s appearance."
    },
    {
      title: "Universal Vehicle Compatibility",
      description:
        "Our tracking solutions are compatible with all vehicle makes and models, from personal cars to commercial fleets."
    },
    {
      title: "Ongoing Support & Monitoring",
      description:
        "We provide continued support, system checks, and guidance to ensure your tracking system operates smoothly at all times."
    }
  ],

  signs: [
    "Concern about theft or unauthorized vehicle use",
    "Managing a fleet or multiple vehicles",
    "Need real-time tracking, alerts, and notifications",
    "Want detailed usage history and reports",
    "Require added security for personal or business vehicles"
  ]
};
