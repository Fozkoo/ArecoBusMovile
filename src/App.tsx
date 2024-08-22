import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonMenu, IonContent, IonHeader, IonToolbar, IonTitle, setupIonicReact, IonList, IonItem } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, bus, settings } from 'ionicons/icons';
import Home from './pages/Home';
import RutabusAP from './pages/RutabusAP';
import MasterbusAG from './pages/MasterbusAG';
import '@fontsource-variable/onest';
import PuntosSube from './pages/PuntosSube';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
  <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet id="main-content">
        <Route exact path="/home" component={Home} />
        <Route exact path="/rutabusAP" component={RutabusAP} />
        <Route exact path="/masterbusAG" component={MasterbusAG} />
        <Route exact path="/PuntosSube" component={PuntosSube} />
        <Redirect exact path="/" to="/home" />
      </IonRouterOutlet>

      <IonTabBar
  slot="bottom"
  className="h-[65px]  shadow-[0_-4px_6px_-3px_rgba(0,0,0,0.1)]"
>
  <IonTabButton tab="home" href="/home">
    <IonIcon icon={home} />
    <IonLabel className="">Inicio</IonLabel>
  </IonTabButton>
  <IonTabButton tab="PuntosSube" href="/PuntosSube">
    <IonIcon icon={bus} />
    <IonLabel>Puntos SUBE</IonLabel>
  </IonTabButton>
</IonTabBar>


    </IonTabs>
    
  </IonReactRouter>
</IonApp>
);

export default App;
