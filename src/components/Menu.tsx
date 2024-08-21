import React, { useEffect, useState } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { search, radio, subwayOutline } from 'ionicons/icons'; // Importa los iconos necesarios

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
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home" component={Home} />
          <Route exact path="/rutabusAP" component={RutabusAP} />
          <Redirect exact path="/" to="/home" />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="search" href="/search">
            <IonIcon icon={search} />
            <IonLabel>Lineas</IonLabel>
          </IonTabButton>

          <IonTabButton tab="home" href="/home">
            <IonIcon icon={subwayOutline} />  {/* Usa el icono importado */}
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="rutabusAP" href="/rutabusAP">
            <IonIcon icon={radio} />
            <IonLabel>Puntos Sube</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Menu;
