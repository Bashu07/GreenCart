import React from 'react';
import { assets, features } from '../assets/assets';

const BottomBanner = () => {
  return (
    <div className='relative mt-16 md:mt-24 mb-16 md:mb-24'>
      {/* Background Images covering full container */}
      <div className='relative w-full min-h-screen md:min-h-[500px]'>
        {/* Desktop Image */}
        <img 
          className='absolute inset-0 w-full h-full object-cover hidden md:block' 
          src={assets.bottom_banner_image} 
          alt="banner"
        />
        {/* Mobile Image */}
        <img 
          className='absolute inset-0 w-full h-full object-cover block md:hidden' 
          src={assets.bottom_banner_image_sm} 
          alt="banner"
        />
        
        {/* Simple overlay for text readability */}
        <div className='absolute inset-0 bg-black/30'></div>
      </div>

      {/* Content positioned over the full background image */}
      <div className='absolute inset-0 flex items-center justify-center md:justify-end px-4 md:px-8 lg:px-16'>
        <div className='w-full max-w-sm md:max-w-md lg:max-w-lg text-center md:text-left'>
          
          {/* Main Heading */}
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800  mb-6 md:mb-8'>
            Why We Are The Best
          </h1>

          {/* Features List */}
          <div className='space-y-2 md:space-y-4 '>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className='bg-primary/5 hover:bg-primary/25 hover:scale-105 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-md'
              >
                <div className='flex items-center gap-3 md:gap-4 md:right-0'>
                  {/* Icon */}
                  <img 
                    src={feature.icon} 
                    alt={feature.title} 
                    className='w-8 h-8 md:w-10 md:h-10 flex-shrink-0' 
                  />
                  
                  {/* Content */}
                  <div className='flex-1 text-left'>
                    <h3 className='text-base md:text-lg font-semibold text-gray-900 mb-1'>
                      {feature.title}
                    </h3>
                    <p className='text-xs md:text-sm text-gray-700 leading-relaxed'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;