import React, { useEffect, useState } from 'react'
import { useUser } from '../redux/userContext'

const Profile = () => {
  const { state } = useUser();
  const user = state.user;

  const [intial, setInitial] = useState();
  useEffect(() => {
    if (user) {
      const name = user?.name
      const firstname = name?.split('');
      const letter = firstname[0];
      setInitial(letter);
    }
  }, [user])
  if(!user){
    return (
      <div className='w-full h-full justify-center items-center text-[2rem] font-bold'>
        Loading....
      </div>
    )
  }
  return (
    <div className='max-w-full h-full py-12 flex flex-col items-center gap-6'>
      <div className='h-max w-max text-[10rem] font-medium bg-black rounded-full py-4 px-16 flex items-center justify-center text-white'>
        {intial}
      </div>

      <div className='text-[4rem] font-bold'>
        {user?.name}
      </div>

      <div className='text-[2.5rem] font-semibold'>
        {user?.email}
      </div>
    </div>
  )
}

export default Profile
