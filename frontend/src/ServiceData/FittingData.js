import { FaPhoneAlt , FaCar,
  FaWrench,
  FaTools,
  FaClock,
  FaBolt,} from "react-icons/fa";

export const motHeroData = {
  badge: "Qualified Technicians",

  title: {
    before: "Installations &",
    highlight: "Fitting Services",
  },

  description: {
    // beforeBold: "Trust ",
    // bold: "Naz Motors",
    afterBold:
      "Professional installations and fittings for all your car electrical and accessory needs. MA Auto Electrics ensures every system is installed safely, securely, and to the highest standard.",
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
    "Contact MA Auto Electrics today for expert installations and fittings of car electrical systems and accessories.",

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
    title: "Professional Installations & Fitting",
    subtitle:
      "Expert fitting of electrical systems, accessories, and devices for all vehicle makes and models",
  },

 services: [
  {
    title: "Car Electrical Installations",
    desc: "Comprehensive installation of electrical components and systems.",
    icon: FaCar,
    points: [
      "Wiring and harness installation",
      "Battery and power system connections",
      "Lighting upgrades and repairs",
      "Audio and infotainment systems",
    ],
  },
  {
    title: "Accessory Fitting",
    desc: "Professional installation of car accessories for optimal performance.",
    icon: FaWrench,
    points: [
      "Handsfree kits and phone mounts",
      "Parking sensors and cameras",
      "Alarm and security systems",
      "Vehicle tracking devices",
    ],
  },
  {
    title: "Professional Equipment & Tools",
    desc: "All fittings carried out using the latest tools and techniques.",
    icon: FaTools,
    points: [
      "Precision tools for neat installations",
      "Compatibility checks with vehicle electronics",
      "Secure mounting and wiring",
      "System testing and verification",
    ],
  },
  {
    title: "Maintenance & Troubleshooting",
    desc: "Ensure your installations remain functional and safe.",
    icon: FaClock,
    points: [
      "Fault diagnosis on fitted systems",
      "Repair or replacement of damaged components",
      "Software and firmware updates",
      "System recalibration and testing",
    ],
  },
  {
    title: "Custom Solutions & Upgrades",
    desc: "Tailored solutions for unique requirements or advanced upgrades.",
    icon: FaBolt,
    points: [
      "Bespoke wiring solutions",
      "Integration of multiple systems",
      "Upgrades to existing installations",
      "Expert advice and planning",
    ],
  },
],
};



export const majorServicesData = {
  service_name: "Installations & Fitting",
  intro_description: "We deliver professional, reliable, and safe installations for all car systems and accessories. Every job is done to the highest standard for lasting performance.",
  benefits: [
    {
      title: "Experienced Specialists",
      description: "Our auto electrical specialists bring years of expertise to every installation, ensuring your systems are fitted correctly the first time."
    },
    {
      title: "Professional Fittings",
      description: "We take pride in neat, professional, and secure fittings that look great and perform flawlessly for years to come."
    },
    {
      title: "Universal Compatibility",
      description: "Compatible with all makes and models - whether you drive a compact car or luxury vehicle, we've got you covered."
    },
    {
      title: "Quality Guaranteed",
      description: "We use only quality parts and deliver superior workmanship on every job, backed by our commitment to excellence."
    },
    {
      title: "Thorough Testing",
      description: "Full system testing and verification ensures everything works perfectly before we hand back your keys."
    }
  ],
  signs: [
    "Installing new car electronics or accessories",
    "Upgrading or replacing old systems",
    "Experiencing faults or malfunctions in existing installations",
    "Want safe and professional integration",
    "Need expert guidance and support"
  ]
};