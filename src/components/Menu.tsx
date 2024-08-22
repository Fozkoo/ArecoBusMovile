import React, { useEffect, useState } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { search, radio, subwayOutline } from 'ionicons/icons'; // Importa los iconos necesarios
import '../theme/variables.css';
import Home from '../pages/Home';
import RutabusAP from '../pages/RutabusAP';
import logo from '../images/rutabus.jpg'; // Ruta corregida

const Menu: React.FC = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isMobileView) {
    return null;
  }

  return (
<>
          <IonTabBar slot="bottom" className="custom-tab-bar">
            <IonTabButton tab="search" className="custom-icon-color">
              <IonIcon icon={search} className="custom-icon-size" />
              <IonLabel className="custom-label-size">Lineas</IonLabel>
            </IonTabButton>

            <IonTabButton tab="home" href="/home" className="custom-icon-color">
              <IonIcon icon={subwayOutline} className="custom-icon-size" />
              <IonLabel className="custom-label-size">Home</IonLabel>
            </IonTabButton>

            <IonTabButton tab="rutabusAP" className="custom-icon-color">
              <IonIcon icon={radio} className="custom-icon-size" />
              <IonLabel className="custom-label-size">Puntos Sube</IonLabel>
            </IonTabButton>
        </IonTabBar>
        </>
  );
};

export default Menu;
