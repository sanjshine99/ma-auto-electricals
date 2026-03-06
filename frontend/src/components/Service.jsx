
import React, { useState } from "react";
import {
    Music,
    Cpu,
    Wrench,
    PhoneCall,
    Camera,
    ShieldCheck,
    ClipboardCheck,
    MapPin,
    Cog,
    Disc,
    Wind,
    Lock,
    Zap,
    CircuitBoard,
    Recycle,
    Droplets,
    Settings,
    Sliders,
    ChevronDown,
    ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ─── Individual Service Card ────────────────────────────────────────────────
const SubCard = ({ service }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
            {/* Image */}
            <div className="w-full h-48 bg-gray-100 overflow-hidden">
                <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.style.display = "none";
                    }}
                />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                {/* Icon */}
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    {service.icon}
                </div>

                {/* Title */}
                <h4 className="text-gray-900 text-lg font-bold mb-2">
                    {service.title}
                </h4>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {service.description}
                </p>

                {/* Button */}
                <button
                    onClick={() => navigate(service.link)}
                    className="mt-4 w-full bg-[#317F21] hover:bg-[#28a31b] text-white font-semibold py-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors duration-300"
                >
                    See Details
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

// ─── Accordion Category Section ─────────────────────────────────────────────
const CategoryAccordion = ({ category }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Accordion Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
                <h3 className="text-gray-900 text-lg font-bold">
                    {category.label}
                </h3>
                <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`}
                />
            </button>

            {/* Accordion Body */}
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="border-t border-gray-100 px-6 py-6 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.services.map((service) => (
                            <SubCard key={service.id} service={service} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Main Service Page ──────────────────────────────────────────────────────
export default function Service() {
    const categories = [
        {
            label: "Mechanical & Servicing",
            services: [
                {
                    id: 3,
                    title: "Car Repairs & Servicing",
                    description:
                        "Our comprehensive car repairs and servicing keep your vehicle running safely and efficiently at all times.",
                    icon: <Wrench className="w-6 h-6 text-[#317F21]" />,
                    image: "/repair.jpeg",
                    link: "/car-repair",
                },
                {
                    id: 10,
                    title: "Mechanical (All)",
                    description:
                        "Complete mechanical repairs to keep your vehicle running smoothly — engine, gearbox, and beyond.",
                    icon: <Cog className="w-6 h-6 text-[#317F21]" />,
                    image: "/Mechanical.jpeg",
                    link: "/mechanical",
                },
                {
                    id: 11,
                    title: "Brake Pads",
                    description:
                        "Supply and fitting of high-quality brake pads for maximum safety and stopping performance.",
                    icon: <Disc className="w-6 h-6 text-[#317F21]" />,
                    image: "/Break.jpeg",
                    link: "/BrakePads",
                },
                 {
                    id: 7,
                    title: "MOT",
                    description:
                        "Trusted MOT testing and preparation to meet all legal safety and emissions standards.",
                    icon: <ClipboardCheck className="w-6 h-6 text-[#317F21]" />,
                    image: "/MOT.jpeg",
                    link: "/mot",
                },
            ],
        },
        {
            label: "Diagnostics & Electrical",
            services: [
                {
                    id: 2,
                    title: "Vehicle Diagnostics",
                    description:
                        "Advanced diagnostic scanning to identify and resolve electrical issues and engine faults quickly.",
                    icon: <Cpu className="w-6 h-6 text-[#317F21]" />,
                    image: "diagnostics.jpeg",
                    link: "/diagnostics",
                },
                {
                    id: 15,
                    title: "All Car Electrics",
                    description:
                        "Complete electrical system inspection and repair including battery, alternator, and wiring.",
                    icon: <Zap className="w-6 h-6 text-[#317F21]" />,
                    image: "/electrics.jpeg",
                    link: "/Car-Electrics",
                },
                {
                    id: 16,
                    title: "ECU Repairs / Services",
                    description:
                        "Professional installation and repair of all vehicle lighting and electrical wiring systems.",
                    icon: <CircuitBoard className="w-6 h-6 text-[#317F21]" />,
                    image: "/ECU.jpg",
                    link: "/ecu-repair-services",
                },
                {
                    id: 12,
                    title: "Window Regulators",
                    description:
                        "Repair and replacement of faulty electric window regulators to restore smooth operation.",
                    icon: <Sliders className="w-6 h-6 text-[#317F21]" />,
                    image: "/Window.jpg",
                    link: "/WindowRegulators",
                },
                 {
                    id: 13,
                    title: "Wiper Motors",
                    description:
                        "Wiper motor repairs and replacements for clear visibility in all weather conditions.",
                    icon: <Wind className="w-6 h-6 text-[#317F21]" />,
                    image: "/Wiper.jpg",
                    link: "/WiperMotors",
                },
                {
                    id: 14,
                    title: "Central Door Motors",
                    description:
                        "Diagnosis and repair of central locking systems to keep your doors working perfectly.",
                    icon: <Lock className="w-6 h-6 text-[#317F21]" />,
                    image: "/Central.jpg",
                    link: "/central-door-motors",
                },
            ],
        },
        {
            label: "Emissions & Engine Systems",
            services: [
                {
                    id: 17,
                    title: "EGR",
                    description:
                        "EGR diagnostics and cleaning to reduce emissions and restore optimal engine performance.",
                    icon: <Recycle className="w-6 h-6 text-[#317F21]" />,
                    image: "/EGR.jpg",
                    link: "/EGR",
                },
                {
                    id: 18,
                    title: "AdBlue",
                    description:
                        "AdBlue system diagnostics and repairs for diesel vehicles to meet emissions standards.",
                    icon: <Droplets className="w-6 h-6 text-[#317F21]" />,
                    image: "/Adblue.jpg",
                    link: "/AdBlue",
                },
               
            ],
        },
        {
            label: "Safety, Security & Tracking",
            services: [
                {
                    id: 6,
                    title: "Car Security",
                    description:
                        "We install reliable car security systems to protect your vehicle from theft and unauthorized access.",
                    icon: <ShieldCheck className="w-6 h-6 text-[#317F21]" />,
                    image: "Car.jpeg",
                    link: "/car-security",
                },
                {
                    id: 8,
                    title: "Vehicle Tracking Systems",
                    description:
                        "Real-time vehicle tracking for security and total peace of mind wherever you go.",
                    icon: <MapPin className="w-6 h-6 text-[#317F21]" />,
                    image: "Vehicle.jpeg",
                    link: "/vehicle-tracking",
                },
               
            ],
        },
        {
            label: "Accessories & Installations",
            services: [
                {
                    id: 1,
                    title: "Car Stereos",
                    description:
                        "We supply and install high-quality car stereos to enhance your driving experience with better sound.",
                    icon: <Music className="w-6 h-6 text-[#317F21]" />,
                    image: "stero.jpeg",
                    link: "/car-stereos",
                },
                {
                    id: 4,
                    title: "Handsfree Car Kits",
                    description:
                        "We professionally install handsfree car kits to help you stay connected safely on the road.",
                    icon: <PhoneCall className="w-6 h-6 text-[#317F21]" />,
                    image: "Hands.jpeg",
                    link: "/handsfree",
                },
                {
                    id: 9,
                    title: "Installations & Fitting",
                    description:
                        "Professional installations carried out by experienced technicians with precision and care.",
                    icon: <Settings className="w-6 h-6 text-[#317F21]" />,
                    image: "Installations.jpg",
                    link: "/installation",
                },
                 {
                    id: 5,
                    title: "Parking Sensors / Cameras",
                    description:
                        "Parking sensors and reversing cameras improve visibility and safety when manoeuvring.",
                    icon: <Camera className="w-6 h-6 text-[#317F21]" />,
                    image: "Parking.jpeg",
                    link: "/parking",
                },
               
                
            ],
        },
    ];

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-6 scroll-m-5"
            id="services"
        >
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                        Our Services
                    </h1>
                    <p className="text-lg text-slate-500">
                        Explore our comprehensive range of automotive services
                    </p>
                </div>

                {/* Accordion List */}
                <div className="flex flex-col gap-4">
                    {categories.map((category, index) => (
                        <CategoryAccordion key={index} category={category} />
                    ))}
                </div>
            </div>
        </div>
    );
}


