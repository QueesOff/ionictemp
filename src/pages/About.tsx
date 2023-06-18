import React from "react";
import { Link } from "react-router-dom";
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import { useTranslation } from "react-i18next";

interface HomeProps {
  name?: string;
}

const About: React.FC<HomeProps> = (props) => {
  const { t } = useTranslation()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{t('menu.room')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Container maxW={'3xl'}>
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}>
            <Stack
              direction={'column'}
              spacing={3}
              align={'center'}
              alignSelf={'center'}
              position={'relative'}>
              <Button
                colorScheme={'green'}
                bg={'green.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'green.500',
                }}>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                <Link to="/signup">Signup</Link>
              </Button>
            </Stack>
          </Stack>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default About;
