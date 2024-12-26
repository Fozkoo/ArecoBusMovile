import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonMenu, IonContent, IonHeader, IonToolbar, IonTitle, setupIonicReact, IonList, IonItem } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, bus, settings } from 'ionicons/icons';
import Home from './pages/Home';
// import RutabusAP from './pages/RutabusAP';
//import MasterbusAG from './pages/MasterbusAG';
//import RicarditoAD from './pages/RicarditoAD';
//import RicarditoAV from './pages/RicarditoAV';
import '@fontsource-variable/onest';
import PuntosSube from './pages/PuntosSube';
import PageTesting from './pages/PageTesting';

import TestPage from './pages/TestPage';
import PruebaRapida from './pages/PruebaRapida';

setupIonicReact();



const App: React.FC = () => (

  

<IonApp>
  <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet id="main-content">
        <Route exact path="/home" component={Home} />
        <Route exact path="/PuntosSube" component={PuntosSube} />
        <Route exact path="/PruebaRapida" component={PruebaRapida} />
        <Redirect exact path="/" to="/home" />
      </IonRouterOutlet>

      {/* El menú debe estar fuera del IonRouterOutlet */}
      <IonTabBar slot="bottom" className="h-[65px] relative shadow-sm desktop-hidden">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} style={{ color: '#3B82F6' }} />
          <IonLabel style={{ color: '#3B82F6' }} className="text-[14px] font-semibold">Inicio</IonLabel>
        </IonTabButton>
        <IonTabButton tab="PuntosSube" href="/PuntosSube">
          <IonIcon icon={bus} style={{ color: '#3B82F6' }} />
          <IonLabel style={{ color: '#3B82F6' }} className="text-[14px] font-semibold">Puntos SUBE</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonReactRouter>
</IonApp>

);

export default App;
