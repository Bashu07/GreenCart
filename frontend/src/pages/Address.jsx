import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'



// Enhanced input field component with better styling
const InputField = ({ type, placeholder, name, handleChange, address, icon }) => (
  <div className="relative group">
    <input
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      type={type}
      required
      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none
                 transition-all duration-300 ease-in-out
                 hover:border-gray-300 hover:shadow-sm
                 placeholder:text-gray-400 text-gray-700
                 group-hover:bg-white/70"
    />
    {icon && (
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
        {icon}
      </div>
    )}
  </div>
)

const Address = () => {


  const {axios , user , navigate} = useAppContext()

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "", // Fixed: was 'Zipcode'
    country: "",
    phone: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress, // Fixed: was ...Address
      [name]: value
    }))
  }

  const onSubmitHandler = async (e) => {
  e.preventDefault()

  try {
    const { data } = await axios.post('/api/address/add', {
      ...address,
      userId: user._id, // ✅ include userId here
    })

    if (data.success) {
      toast.success(data.message)
      navigate('/cart')
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }

}

  useEffect(()=>{
    if(!user){
      navigate('/cart')
    }
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-primary bg-clip-text text-transparent mb-4">
            Add Shipping Address
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Please provide your shipping details to ensure accurate and timely delivery of your order.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <div className="order-2 lg:order-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8 lg:p-10">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Shipping Information</h2>
              </div>

              <form onSubmit={onSubmitHandler} className="space-y-6">
                {/* Name Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <InputField
                      handleChange={handleChange}
                      address={address}
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <InputField
                      handleChange={handleChange}
                      address={address}
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <InputField
                    handleChange={handleChange}
                    address={address}
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    }
                  />
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <InputField
                    handleChange={handleChange}
                    address={address}
                    name="street"
                    type="text"
                    placeholder="123 Main Street, Apt 4B"
                  />
                </div>

                {/* City and State */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <InputField
                      handleChange={handleChange}
                      address={address}
                      name="city"
                      type="text"
                      placeholder="City name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <InputField
                      handleChange={handleChange}
                      address={address}
                      name="state"
                      type="text"
                      placeholder="State/Province"
                    />
                  </div>
                </div>

                {/* Zip Code and Country */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                    <InputField
                      handleChange={handleChange}
                      address={address}
                      name="zipcode"
                      type="text"
                      placeholder="12345"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <InputField
                      handleChange={handleChange}
                      address={address}
                      name="country"
                      type="text"
                      placeholder="Country"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <InputField
                    handleChange={handleChange}
                    address={address}
                    name="phone"
                    type="tel"
                    placeholder="+977 123-456"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    }
                  />
                </div>

                {/* Submit Button */}
                <button onSubmit={onSubmitHandler}
                  type="submit"
                  className="w-full mt-8 bg-primary text-white py-4 px-6 rounded-xl font-medium text-lg
                           hover:bg-primary-dull
                           transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
                           shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/25"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Shipping Address
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-2xl opacity-20 transform rotate-6"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30">
                <img
                  className="w-full max-w-md h-auto object-contain"
                  src={assets.add_address_iamge}
                  alt="Add shipping address illustration"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white/60 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-white/30">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Secure & Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14 8l2.8 3.4A1 1 0 0116 13H6a1 1 0 010-2h8.34L12 8l2.34-3H6a1 1 0 000 2H3V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Trusted by 10k+ customers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Address