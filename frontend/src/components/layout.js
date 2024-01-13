import React from 'react'
import Sidebar from './sidebar'

const Layout = ({children}) => {
  return (
    <div className='flex min-h-[100vh] relative'>
      <div className='sticky top-0 max-h-[100vh] min-w-2/12'>
        <Sidebar/>
      </div>

      <div className='w-10/12 py-4 px-4'>
        {children}
      </div>
    </div>
  )
}

export default Layout
