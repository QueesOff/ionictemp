import React, { lazy, Suspense } from 'react';
import VoxelDogLoader from '../components/voxel-dog-loader'
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  useIonViewWillEnter,
} from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import { setMenuEnabled } from '../data/sessions/sessions.actions';
import { setHasSeenTutorial } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  Flex
} from '@chakra-ui/react';

interface OwnProps extends RouteComponentProps { }
interface DispatchProps {
  setHasSeenTutorial: typeof setHasSeenTutorial;
  setMenuEnabled: typeof setMenuEnabled;
}

interface TutorialProps extends OwnProps, DispatchProps { }

const LazyVoxelDog = lazy(() => import('../components/voxel-dog'));

const Tutorial: React.FC<TutorialProps> = ({
  history,
  setHasSeenTutorial,
  setMenuEnabled,
}) => {
  useIonViewWillEnter(() => {
    setMenuEnabled(false);
  });


  const startApp = async () => {
    await setHasSeenTutorial(true);
    await setMenuEnabled(true);
    history.push('/tabs/schedule', { direction: 'none' });
  };

  return (
    <IonPage id="tutorial-page">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton color="primary" onClick={startApp}>
              Skip
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Container maxW={'3xl'}>
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}>
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}>
              Make money from <br />
              <Text as={'span'} color={'green.400'}>
                your audience
              </Text>
            </Heading>
            <Text color={'gray.500'}>
              Monetize your content by charging your most loyal readers and reward
              them loyalty points. Give back to your loyal readers by granting
              them access to your pre-releases and sneak-peaks.
            </Text>
          </Stack>
          <Flex justify={'center'}>
            <Suspense fallback={<VoxelDogLoader />}>
              <LazyVoxelDog />
            </Suspense>
          </Flex>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setHasSeenTutorial,
    setMenuEnabled,
  },
  component: Tutorial,
});