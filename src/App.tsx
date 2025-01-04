import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, bus } from 'ionicons/icons';
import Home from './pages/Home';
import '@fontsource-variable/onest';
import PuntosSube from './pages/PuntosSube';
import Admin from './pages/Admin';
import PruebaRapida from './pages/PruebaRapida';
import SearchLocality from './pages/SearchLocality';
import ErrorPage from './pages/ErrorPage';
import RutabusAP from './pages/RutabusAP';


setupIonicReact();


const App: React.FC = () => (
<IonApp className='h-full'>
  <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet id="main-content">
        <Route exact path="/home" component={Home} />
        <Route exact path="/PuntosSube" component={PuntosSube} />
        <Route exact path="/PruebaRapida" component={PruebaRapida} />
        <Route exact path="/Admin" component={Admin} />
        <Route exact path="/SearchLocality" component={SearchLocality} />
        <Route exact path="/ErrorPage" component={ErrorPage} />
        <Route exact path="/RutabusAP" component={RutabusAP} />
        <Redirect exact path="/" to="/home" />
      </IonRouterOutlet>
      {/* menu */}
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
