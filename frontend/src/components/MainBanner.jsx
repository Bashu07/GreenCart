import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className="relative">
      {/* Desktop Banner */}
      <img
        className="w-full hidden md:block"
        src={assets.main_banner_bg}
        alt="Main Banner"
      />

      {/* Mobile Banner */}
      <img
        className="w-full md:hidden"
        src={assets.main_banner_bg_sm}
        alt="Main Banner Mobile"
      />

      {/* Text and CTA Section */}
      <div className="absolute top-1/2 md:top-1/3 left-1/2 md:left-16 transform -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0 text-center md:text-left text-white px-4 md:px-0 w-full md:w-auto space-y-4">
        <h1 className="text-xl mt-40  md:mt-0 md:text-4xl font-bold max-w-sm md:max-w-md leading-snug text-gray-800">
          Fresher you can Trust, Saving Today you will Love Tomorrow. Trust Us
        </h1>

        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 justify-center md:justify-start">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dull text-white px-5 py-2 rounded-md text-sm md:text-base font-medium transition-colors duration-200"
          >
            Shop Now
            <img src={assets.white_arrow_icon} alt="Arrow" className="w-4 h-4" />
          </Link>

          <Link
            to="/products"
            className="hidden md:inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 border border-primary px-5 py-2 rounded-md text-sm md:text-base font-medium transition duration-200"
          >
            Explore Deals
            <img src={assets.black_arrow_icon} alt="Arrow" className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner
