import {
  FaPhoneAlt,
  FaCar,
  FaTools,
  FaBolt,
  FaMicrochip,
  FaCheckCircle,
  
  
} from "react-icons/fa";


export const motHeroData = {
  badge: "Vehicle Diagnostics Experts",

  title: {
    before: "Vehicle",
    highlight: "Diagnostics Services",
  },

  description: {
    afterBold:
      "Accurate and reliable vehicle diagnostics to quickly identify electrical and mechanical faults. At MA Auto Electrics, we use advanced diagnostic equipment to keep your vehicle running efficiently and safely.",
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
    title: "Professional Vehicle Diagnostics",
    subtitle:
      "Advanced fault-finding solutions for all vehicle makes and models",
  },

  services: [
    {
      title: "Computerised Vehicle Diagnostics",
      desc:
        "Comprehensive computer diagnostics to detect faults across your vehicle’s systems.",
      icon: FaCar,
      points: [
        "Engine management diagnostics",
        "ABS and airbag fault detection",
        "Transmission and gearbox diagnostics",
        "Emissions and sensor checks",
      ],
    },
    {
      title: "Engine Fault Code Reading",
      desc:
        "Quick and accurate identification of engine warning lights and fault codes.",
      icon: FaBolt,
      points: [
        "Check engine light diagnostics",
        "Fault code interpretation",
        "Clear and reset warning lights",
        "Detailed fault explanation",
      ],
    },
    {
      title: "Electrical System Diagnostics",
      desc:
        "Expert testing of your vehicle’s electrical components and wiring.",
      icon: FaTools,
      points: [
        "Battery and charging system checks",
        "Alternator and starter motor testing",
        "Wiring and fuse inspections",
        "Electrical fault tracing",
      ],
    },
    {
      title: "Sensor & ECU Diagnostics",
      desc:
        "Advanced testing of vehicle sensors and electronic control units (ECUs).",
      icon: FaMicrochip,
      points: [
        "Oxygen (O2) sensor testing",
        "Mass airflow and temperature sensors",
        "ECU communication checks",
        "Live data analysis",
      ],
    },
    {
      title: "Pre-Repair & Post-Repair Diagnostics",
      desc:
        "Ensure accurate repairs and verify fault resolution.",
      icon: FaCheckCircle,
      points: [
        "Pre-repair system scanning",
        "Confirmation of successful repairs",
        "System reset and recalibration",
        "Road test verification",
      ],
    },
  ],
};

export const majorServicesData = {
  service_name: "Vehicle Diagnostics Services",

  intro_description:
    "Modern vehicles rely heavily on electronic systems. Professional diagnostics help pinpoint faults quickly, saving time and money while preventing unnecessary repairs.",

  benefits: [
    {
      title: "Faster Fault Identification",
      description:
        "Advanced diagnostic tools allow us to quickly identify issues across your vehicle’s electronic and mechanical systems.",
    },
    {
      title: "Reduced Repair Costs",
      description:
        "Accurate diagnostics prevent guesswork, helping avoid unnecessary part replacements and costly repairs.",
    },
    {
      title: "Improved Vehicle Performance",
      description:
        "Identifying and resolving faults early helps restore optimal engine performance and drivability.",
    },
    {
      title: "Better Fuel Efficiency",
      description:
        "Correctly diagnosed engine and sensor issues can significantly improve fuel economy.",
    },
    {
      title: "Increased Reliability & Safety",
      description:
        "Professional diagnostics ensure critical systems are working correctly, improving reliability and overall vehicle safety.",
    },
    {
      title: "Accurate, Data-Driven Repairs",
      description:
        "All repairs are based on precise diagnostic data, ensuring the right fix is applied the first time.",
    },
  ],

  signs: [
    "Warning lights on the dashboard",
    "Reduced engine performance",
    "Poor fuel economy",
    "Starting or charging issues",
    "Electrical faults or intermittent problems",
    "Failed or upcoming MOT concerns",
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

  heading: "Car Electric Specialists in Accrington, Lancashire",

  subheading:
    "Trust MA Auto Electrics for precise vehicle diagnostics using the latest technology and experienced technicians.",

  buttons: {
    call: {
      text: "Call +44 7889 133123‬",
      href: "tel:+447889133123",
      icon: FaPhoneAlt,
    },
    book: {
      text: "Book Diagnostics",
      href: "/contact",
    },
  },
};
