import {
  FaPhoneAlt,
  FaCar} from "react-icons/fa";




export const motHeroData = {
  badge: "Trusted Vehicle Care",

  title: {
    before: "All Car",
    highlight: "Electrics",
  },

  description: {
    afterBold:
      "Complete auto electrical solutions for modern and older vehicles. From minor faults to complex electrical systems, we handle it all.",
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
    title: "Professional Auto Electrical Services",
    subtitle: "Comprehensive electrical diagnostics and repairs",
  },

  services: [
    {
      title: "Auto Electrical Repairs",
      desc: "Expert solutions for vehicle electrical systems.",
      icon: FaCar,
      points: [
        "Wiring repairs",
        "Lighting systems",
        "Sensors and modules",
        "Battery drain issues",
      ],
    },
  ],
};


export const majorServicesData = {
  service_name: "Auto Electrical Services",

  intro_description:
    "Why Choose MA Auto Electrics for Auto Electrical Services?\n✓ Skilled auto electrical technicians\n✓ Advanced diagnostic equipment\n✓ Accurate fault finding\n✓ Safe and reliable repairs",

  benefits: [
    {
      title: "Skilled Auto Electrical Technicians",
      description:
        "Our team has specialist knowledge and experience to diagnose and repair all types of auto electrical faults efficiently.",
    },
    {
      title: "Advanced Diagnostic Equipment",
      description:
        "We use professional diagnostic tools to identify electrical faults accurately and quickly.",
    },
    {
      title: "Accurate Fault Finding",
      description:
        "Every issue is carefully analyzed to ensure the right repair is carried out the first time.",
    },
    {
      title: "Safe and Reliable Repairs",
      description:
        "All repairs are performed to the highest standards to ensure your vehicle remains safe and reliable.",
    },
  ],

  signs: [
    "Dashboard warning lights",
    "Battery draining issues",
    "Electrical components not working",
    "Intermittent faults",
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

  heading: "Auto Electrical Specialists in Accrington, Lancashire",

  subheading:
    "Choose MA Auto Electrics for skilled auto electrical diagnostics, repairs, and solutions you can trust.",

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
