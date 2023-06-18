import { forwardRef, Ref } from 'react';
import { Box, Spinner, useColorModeValue } from '@chakra-ui/react';

export const DogSpinner: React.FC = () => (
  <Spinner
    size="xl"
    position="absolute"
    left="50%"
    top="50%"
    ml="calc(0px - var(--spinner-size) / 2)"
    mt="calc(0px - var(--spinner-size))"
  />
);

interface DogContainerProps {
  children: React.ReactNode;
}

export const DogContainer = forwardRef(
  ({ children }: DogContainerProps, ref: Ref<HTMLDivElement>) => (
    <Box
      ref={ref}
      className="voxel-dog"
      mt={['-20px', '-60px', '-120px']}
      mb={['-40px', '-140px', '-200px']}
      w={[280, 480, 500]}
      h={[280, 480, 500]}
      position="relative"
    >
      {children}
    </Box>
  )
);

const Loader: React.FC = () => {
  return (
    <DogContainer>
      <DogSpinner />
    </DogContainer>
  );
};

export default Loader;
