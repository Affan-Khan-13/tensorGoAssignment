import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import getUserById from '../utils/getUserById';
import { useUser } from '../redux/userContext';

const Sidebar = () => {
  const { state } = useUser();
  const user = state.user;
  useEffect(() => {
    console.log(user, "Context wala user")
  }, [user])
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

  const Logout = () =>{
    localStorage.removeItem('userId');
    navigate('/login');
  }
  return (
    <div className='h-full w-full bg-[#c4c3c3] flex flex-col justify-between text-black py-4 px-2'>
      <div className='flex flex-col gap-8'>
        <div>
          <div>{user?.name}</div>
          <div>{user?.email}</div>
        </div>

        <div>
          Tabs
        </div>
      </div>

      <div onClick={()=>Logout()}>
        Logout
      </div>

    </div>
  )
}

export default Sidebar
