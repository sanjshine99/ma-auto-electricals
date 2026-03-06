import {
    FaPhoneAlt,
    FaTools,
    FaVolumeUp,
} from "react-icons/fa";

export const motHeroData = {
    badge: "Brake Pad Specialists",
    title: {
        before: "Brake Pads",
    },
    description: {
        afterBold:
            "Ensure safe and reliable braking with professional brake pad replacement services from MA Auto Electrics. We install high-quality brake pads designed for performance, durability, and safety.",
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
        title: "Professional Brake Pad Services",
        subtitle:
            "Expert inspection and replacement of worn brake pads for optimal stopping power.",
    },
    services: [
        {
            title: "Brake Pad Replacement",
            desc:
                "Safe and efficient brake pad installation.",
            icon: FaVolumeUp,
            points: [
                "Front and rear brake pads",
                "OEM and high-quality aftermarket pads",
                "Correct bedding-in procedure",
                "Noise and vibration reduction",
            ],
            callToAction: {
                text: "Book Your Brake Service",
                href: "/contact",
            },
        },
        {
            title: "Brake System Inspection",
            desc:
                "Complete checks to ensure braking safety.",
            icon: FaTools,
            points: [
                "Disc condition inspection",
                "Brake fluid level and quality check",
                "Caliper and hardware inspection",
            ],
            callToAction: {
                text: "Schedule Inspection",
                href: "/contact",
            },
        },
    ],
};

export const majorServicesData = {
    service_name: "Brake Services",
    intro_description:
        "MA Auto Electrics offers professional brake services to keep your vehicle safe, reliable, and performing at its best.",
    benefits: [
        {
            title: "Safety-Focused Workmanship",
            description:
                "All brake services are performed with attention to detail and vehicle safety in mind.",
        },
        {
            title: "High-Quality Brake Components",
            description:
                "We use OEM and premium aftermarket pads to ensure lasting performance and reliability.",
        },
        {
            title: "Fast Turnaround",
            description:
                "Efficient service to get you back on the road quickly without compromising quality.",
        },
        {
            title: "Suitable for Most Vehicles",
            description:
                "Our services cover a wide range of cars, vans, and light commercial vehicles.",
        },
        {
            title: "Clear Advice & Pricing",
            description:
                "Transparent inspections and honest recommendations so you know exactly what your vehicle needs.",
        },
    ],
    signs: [
        "Squealing or grinding noise",
        "Reduced braking performance",
        "Brake warning light",
        "Vibration when braking",
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
