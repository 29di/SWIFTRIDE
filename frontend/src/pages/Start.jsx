import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
  <div className='relative bg-cover bg-center bg-[url("https://plus.unsplash.com/premium_photo-1691547068199-d533e924836e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1033")] h-screen pt-8 flex flex-col justify-end w-full'>
        {/* Background overlay for better readability */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent'></div>
        {/* Content */}
        <div className='relative z-10 bg-white/90 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl px-6 py-5 max-w-xl w-[92%] mx-auto mb-8'>
          <h2 className='text-[28px] md:text-[30px] font-semibold text-gray-900'>Get Started with SwiftRide</h2>
          <Link to='/login' className='flex items-center justify-center w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl mt-5 transition-colors duration-200 shadow'>
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Start