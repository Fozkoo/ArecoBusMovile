import React from 'react'


import logoHeader from '..//images/rutabus.jpg'

function Header() {
  return (
    <> 
    <div className="container-header flex justify-center items-center h-[80px] shadow-md ">
        <div className="container-items justify-center items-center flex gap-3">
            <img src={logoHeader} alt="" className='h-10'/>
        </div>
    </div>
    </>
  )
}

export default Header