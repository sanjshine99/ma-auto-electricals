import { FaPhoneAlt , FaPhone , FaCar,
  FaWrench,
  FaTools,
  FaMapMarkerAlt,
  FaBell,
  FaTruck,
  FaClipboardCheck,
  FaSearch,
  FaCertificate,} from "react-icons/fa";

export const motHeroData = {
  badge: "Qualified Technicians",

  title: {
    highlight: "MOT Testing Services",
  },

  description: {
    // beforeBold: "Trust ",
    // bold: "Naz Motors",
    afterBold:
      "Ensure your vehicle meets legal safety standards with professional MOT testing from MA Auto Electrics. Our expert technicians provide thorough inspections to keep your vehicle roadworthy and compliant.",
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
    "Book your MOT with MA Auto Electrics today for professional, reliable vehicle testing and peace of mind.",

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
    title: "Professional MOT Services",
    subtitle:
      "Comprehensive MOT testing, preparation, and certification for all vehicle types",
  },

  services: [
    {
      title: "Full MOT Testing",
      desc: "Accurate and thorough inspections to ensure your vehicle meets MOT requirements.",
      icon: FaClipboardCheck,
      points: [
        "Safety checks on brakes, steering, and suspension",
        "Lights, indicators, and reflectors inspection",
        "Exhaust, emissions, and fuel system testing",
        "Tyres, wheels, and bodywork checks",
      ],
    },
    {
      title: "Pre-MOT Inspection & Preparation",
      desc: "Identify potential issues before your MOT to avoid failure.",
      icon: FaSearch,
      points: [
        "Diagnostic checks for common faults",
        "Corrective advice and minor repairs",
        "Emissions and fluid level assessment",
        "Safety feature verification",
      ],
    },
    {
      title: "Post-Failure Repairs & Retesting",
      desc: "Repairs and retesting services to help your vehicle pass MOT standards.",
      icon: FaTools,
      points: [
        "Fault diagnosis and required repairs",
        "Parts replacement where necessary",
        "Full system recalibration",
        "Retesting to ensure compliance",
      ],
    },
    {
      title: "Professional Testing & Certification",
      desc: "MOTs carried out by certified technicians following UK legal standards.",
      icon: FaCertificate,
      points: [
        "Official MOT certificate provided",
        "Accurate documentation for legal and insurance use",
        "Experienced technicians for reliable testing",
        "Friendly guidance and expert advice",
      ],
    },
  ],
};



export const majorServicesData = {
  service_name: "Professional MOT Testing",
  intro_description:
    "Our expert MOT services help prevent breakdowns, maintain vehicle safety, and ensure full compliance with UK legal requirements.",

  benefits: [
    {
      title: "Certified MOT Testing Station",
      description:
        "We operate as a certified MOT testing station, carrying out inspections in line with official UK MOT standards."
    },
    {
      title: "Experienced & Qualified Technicians",
      description:
        "Our trained and qualified technicians conduct thorough and accurate MOT tests you can trust."
    },
    {
      title: "Reliable & Efficient Service",
      description:
        "We deliver accurate MOT testing with minimal downtime, getting you back on the road quickly and safely."
    },
    {
      title: "All Makes & Models Covered",
      description:
        "Our MOT services are suitable for all vehicle makes and models, including personal and commercial vehicles."
    },
    {
      title: "Honest Advice & Transparent Pricing",
      description:
        "We provide clear explanations, honest recommendations, and upfront pricing with no hidden costs."
    }
  ],

  signs: [
    "MOT due date approaching or expired",
    "Dashboard warning lights illuminated",
    "Unusual noises or vibrations while driving",
    "Poor braking or steering response",
    "Tyres worn, damaged, or below legal limits",
    "Concerns about vehicle safety or emissions"
  ]
};
