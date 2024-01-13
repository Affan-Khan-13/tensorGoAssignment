import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import getUserById from '../utils/getUserById';
import { useUser } from '../redux/userContext';
import Door from '../icons/door';
import Calendaricon from '../icons/calendarIcon';
import Statusicon from '../icons/statusIcon';
import Dashboardicon from '../icons/dashboardIcon';
import Clipboardicon from '../icons/clipboardIcon';

const Sidebar = () => {
  const { state } = useUser();
  const user = state.user;

  const [intial, setInitial] = useState();
  const [shortname, setShortname] = useState();
  useEffect(() => {
    if (user) {
      const name = user?.name
      const words = name?.split(' ');
      const firstTwoWords = words.length > 1 ? words.slice(0, 2).join(' ') : name;
      setShortname(firstTwoWords);
      const firstname = name?.split('');
      const letter = firstname[0];
      setInitial(letter);
    }
  }, [user])

  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get('id');

  useEffect(() => {
    if (id) {
      localStorage.setItem('userId', id);
    }
    else {
      const idCheck = localStorage.getItem('userId')
      if (!idCheck) {
        navigate('/login');
        console.log("outsid")
      }
    }
  }, [id])

  const Logout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  }


  return (
    <div className='h-full w-full bg-[#ECEFF1] flex flex-col justify-between text-black py-4 px-2'>
      <div className='flex flex-col gap-8'>
        <div className='flex gap-3 items-center pt-2'>
          <div className='bg-black h-max w-max rounded-full px-3 py-2 text-white font-bold'>{intial}</div>
          <div className='text-[1rem] font-medium'>{shortname}</div>
        </div>

        <div className='flex flex-col gap-2'>
          <Link to={'/'}><div className={`px-4 py-3 flex gap-4 items-center text-[1rem] font-medium  rounded-lg select-none ${location.pathname === '/' ? 'bg-[#fff]' : ''}`}><Clipboardicon/> Home</div></Link>
          <Link to={'/billing'}><div className={`px-4 py-3 flex gap-4 items-center text-[1rem] font-medium  rounded-lg select-none ${location.pathname === '/billing' ? 'bg-[#fff]' : ''}`}><Statusicon/> Billing</div></Link>
          <Link to={'/invoices'}><div className={`px-4 py-3 flex gap-4 items-center text-[1rem] font-medium  rounded-lg select-none ${location.pathname.includes('/invoice') ? 'bg-[#fff]' : ''}`}><Dashboardicon/> Invoices</div></Link>
          <Link to={'/profile'}><div className={`px-4 py-3 flex gap-4 items-center text-[1rem] font-medium  rounded-lg select-none ${location.pathname === '/profile' ? 'bg-[#fff]' : ''}`}><Calendaricon/> Profile</div></Link>
        </div>
      </div>

      <div>
      <div className="px-4 py-4 text-[#FF2828] font-sans flex gap-2 items-center font-medium cursor-pointer select-none" onClick={() => Logout()}>
          <Door /> Sign Out
        </div>
      </div>

    </div>
  )
}

export default Sidebar
