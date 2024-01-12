import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='w-full min-h-[100vh] flex justify-center items-center'>
      <Link to={'http://localhost:3001/api/v1/users/auth/google'}>
      <div className='px-4 py-3 flex justify-center items-center bg-green-500 text-black font-bold rounded-2xl'>
        Login
      </div>
      </Link>
    </div>
  )
}

export default Login
