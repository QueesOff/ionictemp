import { IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonModal, useIonViewWillEnter } from '@ionic/react';
import { useRef, useState } from 'react';
import { GoogleMap } from '@capacitor/google-maps'
import MarkerInfoWindow from '../components/MarkerInfoWindow';
import { markers } from '../data';
import './Tab3.css'
import { Box, Button, Flex, Input, useToast } from '@chakra-ui/react';

const Tab3 = () => {

  const key = 'AIzaSyC6sAYdhqZUb4uhEtnOSSjaJukpyktGzxg'
  let newMap
  const mapRef = useRef(null)
  const toast = useToast();

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const searchPlace = () => {
    const searchedMarker = markers.find((marker) => marker.name.toLowerCase().includes(searchValue.toLowerCase()));
    if (searchedMarker) {
      setSelectedMarker(searchedMarker);
      present(modalOptions);
    } else {
      toast({
        title: 'Место не найдено',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };


  const [present, dismiss] = useIonModal(MarkerInfoWindow, {

    marker: selectedMarker
  });

  const modalOptions = {

    initialBreakpoint: 0.4,
    breakpoints: [0, 0.4],
    backdropBreakpoint: 0,
    onDidDismiss: () => dismiss()
  };

  const [mapConfig, setMapConfig] = useState({

    zoom: 10,
    center: {

      lat: markers[0].lat,
      lng: markers[0].lng
    }
  });
  const markerClick = marker => {

    setSelectedMarker(markers.filter(m => (m.lat === marker.latitude && m.lng === marker.longitude))[0]);
    present(modalOptions);
  }

  const addMapMarker = async marker => {

    await newMap.addMarker({

      coordinate: {
        lat: marker.lat,
        lng: marker.lng
      },
      title: marker.title
    });
  }

  const addMapMarkers = () => markers.forEach(marker => addMapMarker(marker));

  const createMap = async () => {

    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: "google-map",
      element: mapRef.current,
      apiKey: key,
      config: mapConfig
    });

    newMap.setOnMarkerClickListener((marker) => markerClick(marker));
    addMapMarkers();
  }

  useIonViewWillEnter(() => createMap());

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Capacitor Google Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Flex w={'90%'} m={'auto'} mt={'15px'}>
          <Input placeholder='Введите название места' size='md' w={'90%'} borderRadius={'5px 0px 0px 5px'} value={searchValue} onChange={handleSearchChange} />
          <Button colorScheme='teal' size='md' borderRadius={'0px 5px 5px 0px'} onClick={searchPlace}>
            Искать
          </Button>

        </Flex>
        <Flex justifyContent="center">
          <capacitor-google-map height="400px" ref={mapRef} id="map"></capacitor-google-map>
        </Flex>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;