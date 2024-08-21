import React, { useEffect } from 'react'
import '@fontsource-variable/onest';
import '..//theme/variables.css';
import { useState } from 'react';
import helper from '../service/Helper.js';
import Card from '../components/Card';
import Header from '../components/Header';
import Menu from '../components/Menu';



function Home() {



  return (
    <>
      <Header/>
      <Menu/>
    </>
  )
}

export default Home