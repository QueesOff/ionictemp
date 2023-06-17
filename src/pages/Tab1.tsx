import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
         {/* Content: */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
