import React from 'react'
import HeroSection from '../components/Hero';
import Service from '../components/Service';
import ProductSellers from '../components/ProductSection';
import ContactSection from '../components/Contact/ContactSection';
import Testimonials from '../components/ImageSlider';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <Service />
            <ProductSellers />
            <ContactSection />
            <Testimonials />
        </div>
    )
}

export default Home