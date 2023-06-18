import React, { useState, useRef } from 'react';

import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonHeader,
  getConfig,
  IonCard, IonCardContent, IonCardHeader
} from '@ionic/react';
import { options, search } from 'ionicons/icons';
import './SchedulePage.scss';

import ShareSocialFab from '../components/ShareSocialFab';

import * as selectors from '../data/selectors';
import { connect } from '../data/connect';
import { setSearchText } from '../data/sessions/sessions.actions';
import { Schedule } from '../models/Schedule';
import { useTranslation } from 'react-i18next';

import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import Weather from '../components/Weather/Weather';
import NewsPage from '../components/NewsPage';
import MapView from './MapView';

const sizes = ['full']


interface OwnProps { }

interface StateProps {
  schedule: Schedule;
  favoritesSchedule: Schedule;
  mode: 'ios' | 'md';
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
}

type SchedulePageProps = OwnProps & StateProps & DispatchProps;

const SchedulePage: React.FC<SchedulePageProps> = ({
  setSearchText,
  mode,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('md')
  const handleSizeClick = (newSize: React.SetStateAction<string>) => {
    setSize(newSize)
    onOpen()
  }
  const [segment, setSegment] = useState<'all' | 'favorites'>('all');
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const pageRef = useRef<HTMLElement>(null);

  const ios = mode === 'ios';

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500);
  };
  const { t } = useTranslation();
  return (
    <IonPage ref={pageRef} id="schedule-page">
      <IonHeader translucent={true}>
      <IonTitle className='title'>GosAsis</IonTitle>
        <IonToolbar>
          {!showSearchbar && (
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonContent fullscreen>
          {/* Content: */}
          <Box display={'flex'}>
            <IonCard style={{ width: '50%' }}>
              <IonCardHeader>
              </IonCardHeader>
              <IonCardContent>
                <Weather />
              </IonCardContent>
            </IonCard>
            <IonCard style={{ width: '50%' }}>
              <IonCardHeader>
              </IonCardHeader>
              <IonCardContent>
                <p>Качество воздуха</p>
                <p>AQI: 33</p>
                <p>CO2: 399ppm</p>
                <p>PM25: 8.0 мкг/м3</p>
              </IonCardContent>
            </IonCard>
          </Box>

              {sizes.map((size) => (
                 <Button
                 backgroundColor={'#68ce78'}
                 onClick={() => handleSizeClick(size)}
                 key={size}
                 w={'90%'}
                 m={5}>
                {`Map`}</Button>
              ))}

              <Modal onClose={onClose} size={size} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Modal Title</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <MapView />
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <NewsPage />
        </IonContent>
      </IonContent>
      <ShareSocialFab />
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    schedule: selectors.getSearchedSchedule(state),
    favoritesSchedule: selectors.getGroupedFavorites(state),
    mode: getConfig()!.get('mode'),
  }),
  mapDispatchToProps: {
    setSearchText,
  },
  component: React.memo(SchedulePage),
});
