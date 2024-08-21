import React, { useEffect } from 'react'
import '@fontsource-variable/onest';
import '..//theme/variables.css';
import { useState } from 'react';
import helper from '../service/Helper.js';
import Card from '../components/Card';
import Header from '../components/Header';
import Menu from '../components/Menu';
import logoHeader from '..//images/rutabus.jpg'


function Home() {



  return (
    <>
      <Header/>
      <div className="container-content-home flex flex-col p-3 mt-10 h-full">
        <Card/>
        asd
        
      </div>

      
    </>
  )
}

export default Home