import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonNote, IonRow } from '@ionic/react';
import { globeOutline, heartOutline, locationOutline, navigateOutline, phonePortraitOutline } from "ionicons/icons";
import React from 'react';

const MarkerInfoWindow = ({ marker, dismiss }) => {
    return (
        <IonContent>
            <IonGrid className="ion-padding">
                <IonRow className="ion-margin-bottom">
                    <IonCol size="12">
                        <IonLabel>
                            <h1>{marker.name}</h1>
                        </IonLabel>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-justify-content-start ion-align-items-center">
                    <IonCol size="2">
                        <IonIcon icon={locationOutline} color="primary" style={{ fontSize: "1.5rem" }} />
                    </IonCol>
                    <IonCol size="10">{marker.address}</IonCol>
                </IonRow>
                <IonRow className="ion-justify-content-start ion-align-items-center">
                    <IonCol size="2">
                        <IonIcon icon={globeOutline} color="primary" style={{ fontSize: "1.5rem" }} />
                    </IonCol>
                    <IonCol size="10">https://grs.gov.kg/</IonCol>
                </IonRow>
                <IonRow className="ion-justify-content-start ion-align-items-center">
                    <IonCol size="2">
                        <IonIcon icon={phonePortraitOutline} color="primary" style={{ fontSize: "1.5rem" }} />
                    </IonCol>
                    <IonCol size="10">{marker.phone}</IonCol>
                </IonRow>
                <IonRow>
                    <IonButton>
                        <IonIcon icon={navigateOutline} />&nbsp;Navigate
                    </IonButton>
                </IonRow>
            </IonGrid>
        </IonContent>
    );
};

export default MarkerInfoWindow;