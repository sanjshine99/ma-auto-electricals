import {
  FaPhoneAlt,
  FaCar,
  FaWrench,
  FaThermometerHalf,
  FaCheckCircle,
  FaBolt,
  
  
  
} from "react-icons/fa";



export const motHeroData = {
  badge: "Trusted Vehicle Care",

  title: {
    before: "Car Repairs &",
    highlight: "Servicing",
  },

  description: {
    afterBold:
      "Reliable car repairs and professional servicing to keep your vehicle safe, efficient, and road-ready. At MA Auto Electrics, we provide high-quality workmanship for all makes and models.",
  },

  buttons: {
    primary: {
      text: "Call: +44 7889 133123‬",
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
    title: "Professional Car Repairs & Servicing",
    subtitle:
      "Comprehensive mechanical and electrical maintenance tailored to your vehicle",
  },

  services: [
    {
      title: "Full & Interim Car Servicing",
      desc:
        "Routine servicing to maintain performance, reliability, and manufacturer standards.",
      icon: FaCar,
      points: [
        "Full and interim service options",
        "Oil and filter changes",
        "Fluid level checks and top-ups",
        "Service resets and inspections",
      ],
    },
    {
      title: "Mechanical Repairs",
      desc:
        "Expert repair solutions for common and complex vehicle issues.",
      icon: FaWrench,
      points: [
        "Brake repairs and replacements",
        "Suspension and steering repairs",
        "Exhaust system repairs",
        "Clutch and gearbox-related repairs",
      ],
    },
    {
      title: "Electrical Repairs",
      desc:
        "Specialist auto electrical repairs using professional diagnostic tools.",
      icon: FaBolt,
      points: [
        "Battery and charging system repairs",
        "Starter motor and alternator faults",
        "Lighting and wiring repairs",
        "Dashboard warning light issues",
      ],
    },
    {
      title: "Engine & Cooling System Repairs",
      desc:
        "Professional inspection and repair of engine and cooling components.",
      icon: FaThermometerHalf,
      points: [
        "Overheating diagnosis",
        "Radiator and cooling fan repairs",
        "Thermostat and water pump issues",
        "Engine performance concerns",
      ],
    },
    {
      title: "MOT Preparation & Repairs",
      desc:
        "Pre-MOT inspections and repairs to help your vehicle pass first time.",
      icon: FaCheckCircle,
      points: [
        "MOT pre-checks",
        "Emissions and safety repairs",
        "Warning light diagnosis",
        "Post-failure repair work",
      ],
    },
  ],
};

export const majorServicesData = {
  service_name: "Car Repairs & Servicing",

  intro_description:
    "Regular servicing and professional repairs protect your vehicle’s longevity and help prevent costly breakdowns.",

  benefits: [
    {
      title: "Experienced Technicians",
      description:
        "Our skilled team ensures all repairs and servicing are carried out safely and professionally.",
    },
    {
      title: "High-Quality Parts and Workmanship",
      description:
        "We use reliable parts and deliver expert workmanship to maintain your vehicle’s performance and safety.",
    },
    {
      title: "Honest Advice and Transparent Pricing",
      description:
        "We provide clear guidance on necessary repairs and fair pricing without hidden costs.",
    },
    {
      title: "Suitable for All Makes and Models",
      description:
        "Whether you drive a compact car or a luxury vehicle, our services cater to all types of vehicles.",
    },
    {
      title: "Reliable Local Service in Accrington",
      description:
        "Our team is dedicated to providing trusted, convenient vehicle care in the Accrington area.",
    },
  ],

  signs: [
    "Unusual noises or vibrations",
    "Warning lights on the dashboard",
    "Reduced performance or fuel efficiency",
    "Difficulty starting the vehicle",
    "Braking or steering issues",
    "Vehicle due or overdue for service",
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
    "Choose MA Auto Electrics for dependable car repairs and servicing you can trust.",

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
