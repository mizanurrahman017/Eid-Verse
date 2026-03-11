import React from 'react';
import HeroSection from '../../../Components/Header/Hero/HeroSection';
import EidCountDown from '../../../Components/Header/EidCountDown/EidCountDown';
import WishGenerator from '../../../Components/Header/WishGenerator/WishGenerator';
import GreetingCard from '../../../Components/Header/GreetingCard/GreetingCard';
import EidWishesGellery from '../../../Components/Header/EidWishesGellery/EidWishesGellery';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <EidCountDown></EidCountDown>
            <WishGenerator></WishGenerator>
            <GreetingCard></GreetingCard>
            <EidWishesGellery></EidWishesGellery>
        </div>
    );
};

export default Home;