import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { Chat } from '../components/Chat';

const ChatTab: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <IonHeader translucent={true}
        style={{
          borderBottom: "0.5px solid",
        }}
      >
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{t('gpt.title')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Chat />
      </IonContent>
    </IonPage>
  );
};

export default ChatTab;