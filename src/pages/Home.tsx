import React, { useEffect } from 'react'
import '@fontsource-variable/onest';
import '..//theme/variables.css';
import { useState } from 'react';
import helper from '../service/Helper.js';



function Home() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await helper.realData();
            console.log(data);
            
        } catch (err) {
            console.log(err + " error");
        } 
    };

    fetchData();

  }, []);


  return (
    <>
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
    </>
  )
}

export default Home