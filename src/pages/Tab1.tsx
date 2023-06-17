import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { Box } from '@chakra-ui/react';
import Weather from '../components/Weather/Weather';
import NewsPage from '../components/NewsCard';


const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='title'>GosAsis</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent fullscreen>
          {/* Content: */}
          <Box display={'flex'}>
            {/* <IonCard>
              <IonCardHeader>
                <IonCardTitle>333</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Card Title</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard> */}
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
            <NewsPage />
        </IonContent>
      </IonPage>
  );
};
export default Tab1;