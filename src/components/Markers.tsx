import React from 'react';
import { Marker } from 'react-leaflet';
import {IconLocation} from './IconLocation'

function Markers() {
  return (
    <>
      <Marker position={[-34.245703, -59.472414]} icon={IconLocation}/>
    </>
  );
}

export default Markers;

