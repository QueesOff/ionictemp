import React from 'react';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { home, location, person, chatbox } from 'ionicons/icons';
import SchedulePage from './SchedulePage';
import SpeakerList from './ChatTab';
import SessionDetail from './SessionDetail';
import MapView from './MapView';
import Profile from './About';
import { useTranslation } from 'react-i18next';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {
  const { t } = useTranslation();
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/schedule" />
        <Route
          path="/tabs/schedule"
          render={() => <SchedulePage />}
          exact={true}
        />
        <Route
          path="/tabs/speakers"
          render={() => <SpeakerList />}
          exact={true}
        />
        <Route path="/tabs/schedule/:id" component={SessionDetail} />
        <Route path="/tabs/speakers/sessions/:id" component={SessionDetail} />
        <Route path="/tabs/map" render={() => <MapView />} exact={true} />
        <Route path="/tabs/about" render={() => <Profile />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom"
        style={{
          borderTop: "0.5px solid",
        }}
      >
        <IonTabButton tab="schedule" href="/tabs/schedule">
          <IonIcon icon={home} />
          <IonLabel>{t('menu.home')}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="speakers" href="/tabs/speakers">
          <IonIcon icon={chatbox} />
          <IonLabel>{t('menu.chat')}</IonLabel>
        </IonTabButton>
        {/* <IonTabButton tab="map" href="/tabs/map">
          <IonIcon icon={location} />
          <IonLabel>{t('menu.map')}</IonLabel>
        </IonTabButton> */}
        <IonTabButton tab="about" href="/tabs/about">
          <IonIcon icon={person} />
          <IonLabel>{t('menu.room')}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
