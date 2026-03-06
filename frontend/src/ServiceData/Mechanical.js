import {
    FaPhoneAlt,
    FaTools,
    FaCogs,

} from "react-icons/fa";

export const motHeroData = {
    badge: "Handsfree Car Kit Specialists",

    title: {
        before: "Mechanical ",
        highlight: "(All) Services",
    },

    description: {
        afterBold:
            "Comprehensive mechanical repair and maintenance services for all vehicle makes and models. At MA Auto Electrics, we handle everything from routine mechanical work to complex repairs to keep your vehicle safe, reliable, and roadworthy.",
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
        title: "Professional Mechanical Services",
        subtitle:
            "Expert mechanical repairs carried out by experienced technicians using quality parts and industry best practices.",
    },

    services : [
        {
            title: "General Mechanical Repairs",
            desc: "Reliable solutions for a wide range of mechanical issues.",
            icon: FaTools,
            points: [
                "Engine mechanical repairs",
                "Suspension and steering components",
                "Cooling system repairs",
                "Exhaust system repairs",
                "Drivetrain and gearbox support",
            ],
        },
        {
            title: "Preventive Maintenance",
            desc:
                "Regular maintenance to reduce breakdowns and extend vehicle life.",
            icon: FaCogs,
            points: [
                "Scheduled servicing",
                "Component inspections",
                "Wear-and-tear part replacement",
                "Safety and performance checks",
            ],
        },
    ]
};

export const majorServicesData = {
  service_name: "Mechanical Services",

  intro_description:
    "Our mechanical services provide reliable, professional solutions to keep your vehicle safe, efficient, and roadworthy.",

  benefits: [
    {
      title: "Experienced Mechanical Specialists",
      description:
        "Our qualified technicians have extensive experience diagnosing and repairing a wide range of mechanical issues.",
    },
    {
      title: "High-Quality Parts & Workmanship",
      description:
        "We use trusted parts and proven repair methods to ensure long-lasting performance and reliability.",
    },
    {
      title: "Honest Fault Diagnosis",
      description:
        "Clear, accurate diagnostics with transparent advice so you know exactly what your vehicle needs.",
    },
    {
      title: "Suitable for All Vehicle Makes & Models",
      description:
        "Our mechanical services cover most cars, vans, and light commercial vehicles.",
    },
    {
      title: "Competitive Pricing",
      description:
        "Fair, competitive pricing with no hidden costs and honest repair recommendations.",
    },
  ],

  signs: [
    "Unusual noises or vibrations while driving",
    "Poor handling or reduced braking performance",
    "Engine performance or power issues",
    "Warning lights appearing on the dashboard",
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
        "Contact MA Auto Electrics for professional handsfree car kit installation and upgrades.",

    buttons: {
        call: {
            text: "Call +44 7889 133123‬",
            href: "tel:+447889133123",
            icon: FaPhoneAlt,
        },
        book: {
            text: "Book Installation",
            href: "/contact",
        },
    },
};
