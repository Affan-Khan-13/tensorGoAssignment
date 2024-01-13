import React from 'react'
import { Link } from 'react-router-dom'
import Google from '../icons/google'

const Login = () => {
  return (
    <div className='w-full min-h-[100vh] flex justify-center items-center bg-cover bg-no-repeat' style={{ backgroundImage: 'url(/images/loginBackground.jpg)' }}>
      <div className=' py-8 px-8 rounded-lg flex flex-col items-center' style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))' }}>
        <div className='text-[0.9rem] font-medium text-white mb-6'>
          Login or Register
        </div>
        <Link to={'http://localhost:3001/api/v1/users/auth/google'}>
          <div className=" bg-white w-full justify-center border-[1px] font-Overused font-medium border-[#E5E7EB] py-4 rounded-xl flex gap-3 items-center p-3">
            <Google /> Continue with google
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Login
