import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Google from '../icons/google'

const Login = () => {
  const [close, setClose] = useState(false);
  useEffect(()=>{
    const popup = localStorage.getItem('popup');
    if(popup){
      setClose(true);
    }
    else{
      setClose(false);
    }
  },[])

  const Close = () => {
    localStorage.setItem('popup', true);
    setClose(true);
  }
  return (
    <div className='w-full min-h-[100vh] flex justify-center items-center bg-cover bg-no-repeat' style={{ backgroundImage: 'url(/images/loginBackground.jpg)' }}>
      <div className={`absolute top-0 right-[25%] w-[50%] pb-4 px-4 text-center font-medium text-[0.9rem] bg-yellow-400 ${close === true ? "hidden" : ""}`}>
        <div className='w-full'>
          <div className='flex justify-end mb-2 text-red-500 text-[1.1rem] cursor-pointer' onClick={()=>Close()}>Close</div>
          </div>
        User Guide: (For the people evaluating) --- If you are logging in for the first time, you will be given default metrics, 30 Users and 15GB Storage. And after that everytime you login, 10 Users will be added and 3GB Storage Usage will be added. You can increase your billing cycle by logging in and logging out, there are no default invoices, and will be created 30 days after the cycle starts using Zappier.com as automation, but you can create invoices by clicking the given button on Home Page.<br/>
        The moment you generate a new Invoice the current cycle ends and new one starts, so the Users and Storage will be zero, and will need logging again to increase them.<br/>
        --- (so as to show the wroking of the automation, i have made the billing cycle to be of one day, even though it might display the expected end date for a month later but, each billing cycle ends and a new one starts everyday automatically to show the working of it using Zappier.com)<br/>
        <br/><br/>
        Also pls make sure that the frontend is running on port 3000 only, because the success URL for google login takes it there. Also the I have deployed the backend so as to make my MONGO_URI and other credentials safe, if you want to run it locally and test it, the changes you have to make will be given in readme.md file, pls refer to that file.<br/>
        Thank You
      </div>



      <div className=' py-8 px-8 rounded-lg flex flex-col items-center' style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))' }}>
        <div className='text-[0.9rem] font-medium text-white mb-6'>
          Login or Register
        </div>
        <Link to={'https://tensorgoassignment.onrender.com/api/v1/users/auth/google'}>
          <div className=" bg-white w-full justify-center border-[1px] font-Overused font-medium border-[#E5E7EB] py-4 rounded-xl flex gap-3 items-center p-3">
            <Google /> Continue with google
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Login
