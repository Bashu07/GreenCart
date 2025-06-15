import React, { useContext } from 'react';
import ProductCard from './ProductCard';
import { AppContext } from '../context/AppContext';

const BestSeller = () => {
  const { products } = useContext(AppContext);

  return (
    <div className="mt-16 px-4 md:px-8 max-w-screen-xl mx-auto">
      {/* Section Header */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        Best Sellers
      </h2>

      {/* Products Grid */}
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
