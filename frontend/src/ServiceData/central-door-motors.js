import {
  FaPhoneAlt,
  FaCar,
} from "react-icons/fa";




export const motHeroData = {
  badge: "Trusted Vehicle Care",

  title: {
    before: "Central Door",
    highlight: "Motors",
  },

  description: {
    afterBold:
      "Restore proper locking and unlocking functionality with expert central door motor repairs.",
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
    title: "Professional Central Locking Services",
    subtitle: "Diagnosis and repair of central door locking motor issues",
  },

  services: [
    {
      title: "Central Door Motor Repairs",
      desc: "Secure and reliable door locking solutions.",
      icon: FaCar,
      points: [
        "Door lock actuator replacement",
        "Electrical wiring inspection",
        "Key fob and locking system testing",
      ],
    },
  ],
};


export const majorServicesData = {
  service_name: "Central Door Motor Services",

  intro_description:
    "Why Choose MA Auto Electrics for Central Door Motor Services?\n✓ Auto electrical specialists\n✓ Secure and reliable repairs\n✓ Neat internal door work\n✓ Works with factory locking systems",

  benefits: [
    {
      title: "Auto Electrical Specialists",
      description:
        "Our team has expert knowledge in vehicle electrical systems, ensuring your central door motors are repaired accurately and efficiently.",
    },
    {
      title: "Secure and Reliable Repairs",
      description:
        "We restore proper locking and unlocking functionality to keep your vehicle safe and secure.",
    },
    {
      title: "Neat Internal Door Work",
      description:
        "All repairs are performed carefully inside the door panels to maintain factory standards and aesthetics.",
    },
    {
      title: "Works with Factory Locking Systems",
      description:
        "Our solutions are compatible with original manufacturer locking systems and key fobs.",
    },
  ],

  signs: [
    "Doors not locking or unlocking",
    "One door not responding",
    "Clicking sound without movement",
    "Key fob works intermittently",
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

  heading: "Central Door Motor Specialists in Accrington, Lancashire",

  subheading:
    "Choose MA Auto Electrics for expert central door motor diagnostics, repairs, and reliable locking solutions.",

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
