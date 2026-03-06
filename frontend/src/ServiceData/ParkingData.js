import { FaCamera, FaParking, FaRulerCombined, FaTools, FaPhoneAlt } from "react-icons/fa";

export const motHeroData = {
  badge: "Qualified Technicians",

    title: {
    before: "Parking Sensors &",
    highlight: "Camera Installation",
  },

  description: {
    // beforeBold: "Trust ",
    // bold: "Naz Motors",
    afterBold:
      "Make parking easier and safer with professional parking sensor and camera installation from MA Auto Electrics. We provide high-quality systems that enhance visibility and prevent collisions.",
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
    "Trust MA Auto Electrics for professional parking sensor and camera installation for safer and easier parking.",

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
    title: "Professional Parking Sensor & Camera Services",
    subtitle:
      "Expert installation and setup of parking assistance systems for all vehicle types",
  },

  services: [
    {
      title: "Rear Parking Sensors",
      desc: "Accurate sensors to alert you to obstacles while reversing.",
      icon: FaParking,
      points: [
        "Audible warning system",
        "Adjustable sensitivity levels",
        "Easy-to-read alerts",
        "Compatible with most vehicles",
      ],
    },
    {
      title: "Reversing Cameras",
      desc: "Clear rear-view cameras for safe and precise maneuvering.",
      icon: FaCamera,
      points: [
        "High-definition camera installation",
        "Wide-angle viewing",
        "Night vision support",
        "Dashboard or rear-view mirror display integration",
      ],
    },
    {
      title: "Front & 360° Parking Sensors",
      desc: "Advanced parking assistance for full vehicle awareness.",
      icon: FaRulerCombined,
      points: [
        "Front and rear sensor coverage",
        "Optional 360° surround view",
        "Collision prevention alerts",
        "Professional calibration for accuracy",
      ],
    },
    {
      title: "Professional Installation & Setup",
      desc: "All systems installed by experienced technicians to ensure reliability and aesthetics.",
      icon: FaTools,
      points: [
        "Neat wiring and mounting",
        "Compatibility checks for all vehicle models",
        "System testing and verification",
        "User guidance and demonstration",
      ],
    },
    {
      title: "Troubleshooting & Maintenance",
      desc: "We diagnose and repair existing parking sensors and cameras.",
      icon: FaTools,
      points: [
        "Sensor malfunctions",
        "Camera display issues",
        "Wiring or connection faults",
        "Calibration and system reset",
      ],
    },
  ],
};



export const majorServicesData = {
  service_name: "Professional Parking Sensors & Camera Services",
  intro_description:
    "Our professional installations improve safety, reduce parking stress, and protect your vehicle from damage.",

  benefits: [
    {
      title: "Experienced Auto Electrical Specialists",
      description:
        "Our skilled technicians have extensive experience installing parking sensors and camera systems with precision, reliability, and attention to detail.",
    },
    {
      title: "Quality Sensors and Cameras",
      description:
        "We use high-quality, accurate sensors and cameras to provide reliable alerts and ensure safe parking.",
    },
    {
      title: "Reliable and Accurate Alerts",
      description:
        "Our systems give precise distance warnings and visual guidance, reducing the risk of minor collisions.",
    },
    {
      title: "Neat, Factory-Like Installation",
      description:
        "All installations are carried out neatly, preserving your vehicle’s aesthetics and providing a professional finish.",
    },
    {
      title: "Suitable for All Makes & Models",
      description:
        "Our parking assistance solutions are compatible with every type of vehicle, from compact cars to larger or newer models.",
    },
  ],

  signs: [
    "Difficulty judging distances while reversing",
    "Frequent minor bumps or scrapes",
    "Limited rear or side visibility",
    "Desire for safer parking in tight spaces",
    "Driving larger or newer vehicles",
  ],
};
