import React from 'react';
import { RouteComponentProps, withRouter, useLocation } from 'react-router';

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonToggle,
} from '@ionic/react';
import {
  hammer,
  moonOutline,
  person,
  language,
  home,
  chatbox,
  map
} from 'ionicons/icons';

import { connect } from '../data/connect';
import { setDarkMode } from '../data/user/user.actions';

import './Menu.css';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


interface Pages {
  title: string;
  path: string;
  icon: string;
  routerDirection?: string;
}
interface StateProps {
  darkMode: boolean;
  isAuthenticated: boolean;
  menuEnabled: boolean;
}

interface DispatchProps {
  setDarkMode: typeof setDarkMode;
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }

const Menu: React.FC<MenuProps> = ({
  darkMode,
  history,
  setDarkMode,
  menuEnabled,
}) => {

  const location = useLocation();
  const { t } = useTranslation();

  const routes = {
    appPages: [
      { title: t('menu.home'), path: '/tabs/schedule', icon: home },
      { title: t('menu.chat'), path: '/tabs/speakers', icon: chatbox },
      { title: t('menu.map'), path: '/tabs/map', icon: map },
      { title: t('menu.room'), path: '/tabs/about', icon: person },
    ]
  };




  const handleLanguageToggle = () => {
    const newLanguage = i18n.language === 'kg' ? 'ru' : 'kg';
    i18n.changeLanguage(newLanguage);
  };
  function renderlistItems(list: Pages[]) {
    return list
      .filter((route) => !!route.path)
      .map((p) => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem
            detail={false}
            routerLink={p.path}
            routerDirection="none"
            className={
              location.pathname.startsWith(p.path) ? 'selected' : undefined
            }
          >
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="overlay" disabled={!menuEnabled} contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>{t('menu.pages')}</IonListHeader>
          {renderlistItems(routes.appPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>{t('menu.switches')}</IonListHeader>
          <IonItem>
            <IonIcon
              slot="start"
              icon={moonOutline}
              aria-hidden="true"
            ></IonIcon>
            <IonToggle
              checked={darkMode}
              onClick={() => setDarkMode(!darkMode)}
            >
              {t('menu.theme')}
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonIcon
              slot="start"
              icon={language}
              aria-hidden="true"
            ></IonIcon>
            <IonToggle checked={i18n.language === 'ru'} onIonChange={handleLanguageToggle}>
              {t('menu.lng')}
            </IonToggle>
          </IonItem>
        </IonList>

        <IonList lines="none">
          <IonListHeader>
            {t('menu.titleTutor')}
          </IonListHeader>
          <IonItem
            button
            onClick={() => {
              history.push('/tutorial');
            }}
          >
            <IonIcon slot="start" icon={hammer} />
            {t('menu.tutor')}
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin,
    menuEnabled: state.data.menuEnabled,
  }),
  mapDispatchToProps: {
    setDarkMode,
  },
  component: withRouter(Menu),
});
