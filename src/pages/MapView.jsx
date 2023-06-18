import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonModal, useIonViewWillEnter } from '@ionic/react';
import { useRef, useState } from 'react';
import { GoogleMap } from '@capacitor/google-maps'
import MarkerInfoWindow from '../components/MarkerInfoWindow';
import './MapView.css'
import { Button, Flex, Input, useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const MapView = () => {
  const { t } = useTranslation();

  const markers = [
    {
      id: 1,
      name: t('map.TSON_1'),
      address: t('map.address_1'),
      phone: "0 312 986 192",
      lat: 42.86898400343084,
      lng: 74.57409629038119
    },
    {
      id: 2,
      name: t('map.TSON_2'),
      address: t('map.address_2'),
      phone: "0 555 533 669",
      lat: 42.88019388906398,
      lng: 74.67866776133195
    },
    {
      id: 3,
      name: t('map.TSON_3'),
      address: t('map.address_3'),
      phone: "-",
      lat: 42.814921123156566,
      lng: 74.63295144780732
    },
    {
      id: 4,
      name: t('map.TSON_4'),
      address: t('map.address_4'),
      phone: "-",
      lat: 42.861953922316694,
      lng: 74.33633791402775
    },
    {
      id: 5,
      name: t('map.TSON_5'),
      address: t('map.address_5'),
      phone: "0 312 986 192",
      lat: 42.88552322862658,
      lng: 74.61597043248595
    },
    {
      id: 6,
      name: t('map.TSON_6'),
      address: t('map.address_6'),
      phone: "-",
      lat: 42.85873860561839,
      lng: 74.67770050429526
    },
    {
      id: 7,
      name: t('map.TSON_7'),
      address: t('map.address_7'),
      phone: "-",
      lat: 42.84425070425271,
      lng: 74.55975304507447
    }
  ];

  const key = 'YOUR_API_KEY';
  let newMap;
  const mapRef = useRef(null);
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
        title: t('map.placeNotFound'),
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

  const markerClick = (marker) => {
    setSelectedMarker(markers.filter((m) => m.lat === marker.latitude && m.lng === marker.longitude)[0]);
    present(modalOptions);
  };

  const addMapMarker = async (marker) => {
    await newMap.addMarker({
      coordinate: {
        lat: marker.lat,
        lng: marker.lng
      },
      title: marker.title
    });
  };

  const addMapMarkers = () => markers.forEach((marker) => addMapMarker(marker));

  const createMap = async () => {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: 'google-map',
      element: mapRef.current,
      apiKey: key,
      config: mapConfig
    });

    newMap.setOnMarkerClickListener((marker) => markerClick(marker));
    addMapMarkers();
  };

  useIonViewWillEnter(() => createMap());

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{t('map.title')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Flex w={'90%'} m={'auto'} mt={'15px'}>
          <Input
            borderWidth={'2px'}
            borderColor={'#90CDF4'}
            borderRight={'none'}
            placeholder={t('map.searchPlaceholder')}
            size="md"
            w="90%"
            borderRadius="5px 0px 0px 5px"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <Button
            colorScheme="blue"
            size="md"
            borderRadius="0px 5px 5px 0px"
            onClick={searchPlace}
          >
            {t('map.searchButton')}
          </Button>
        </Flex>
        <Flex justifyContent="center">
          <capacitor-google-map height="400px" ref={mapRef} id="map"></capacitor-google-map>
        </Flex>
      </IonContent>
    </IonPage>
  );
};

export default MapView;
