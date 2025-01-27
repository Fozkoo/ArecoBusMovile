import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, bus } from 'ionicons/icons';
import Home from './pages/Home';
import '@fontsource-variable/onest';
import PuntosSube from './pages/PuntosSube';
import Admin from './pages/Admin';
import SearchLocality from './pages/SearchLocality';
import ErrorPage from './pages/ErrorPage';
import RutabusAP from './pages/RutabusAP';
import MasterbusAG from './pages/MasterbusAG';
import RicarditoAD from './pages/RicarditoAD';
import RicarditoAV from './pages/RicarditoAV';
import { useMenu } from './context/MenuContextProps';
import ChevallierAR from './pages/ChevallierAR';
import PilarExpressPI from './pages/PilarExpressPI';
import RutabusPA from './pages/RutabusPA';

setupIonicReact();


const App: React.FC = () => {

  const { isMenuVisible } = useMenu();

  return (
    <IonApp className='h-full'>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet id="main-content">
          <Route exact path="/Home" component={Home} />
          <Route exact path="/PuntosSube" component={PuntosSube} />
          <Route exact path="/Admin" component={Admin} />
          <Route exact path="/SearchLocality" component={SearchLocality} />
          <Route exact path="/ErrorPage" component={ErrorPage} />
          <Route exact path="/RutabusAP" component={RutabusAP} />
          <Route exact path="/RutabusPA" component={RutabusPA} />
          <Route exact path="/MasterbusAG" component={MasterbusAG} />
          <Route exact path="/RicarditoAD" component={RicarditoAD} />
          <Route exact path="/RicarditoAV" component={RicarditoAV} />
          <Route exact path="/ChevallierAR" component={ChevallierAR} />
          <Route exact path="/PilarExpressPI" component={PilarExpressPI} />
          <Redirect exact path="/" to="/Home" />
        </IonRouterOutlet>


        <IonTabBar slot="bottom" className={`h-[65px] ${isMenuVisible ? 'flex' : 'hidden'} relative shadow-sm desktop-hidden`}>
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
  )
};

export default App;
