import React from 'react'


import logoHeader from '..//images/Logo.png'

function Header() {
  return (
    <> 
    <div className="container-header flex justify-center items-center h-[65px]">
        <div className="container-items justify-center items-center flex gap-3">
            <img src={logoHeader} alt="" className='h-10'/>
        </div>
    </div>
    </>
  )
}

export default Header