import React, { useEffect, useState } from "react";
import { firestore } from "../firebase"; 
import { Box, Image, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";

interface News {
  id: string;
  title: string;
  desc: string;
  image: string;
}

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);  // to keep track of the selected news item
  const { isOpen, onOpen, onClose } = useDisclosure(); // modal handlers

  useEffect(() => {
    const fetchNews = async () => {
      const snapshot = await firestore.collection("news").get();
      const newsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as News[];
      setNews(newsData);
    };

    fetchNews();
  }, []);

  const handleCardClick = (newsItem: News) => {
    setSelectedNews(newsItem);
    onOpen(); 
  };

  return (
    <Box padding={'10px'}>
      {news.map((item) => (
        <Box key={item.id} onClick={() => handleCardClick(item)}  borderRadius="lg" overflow="hidden" display={'flex'}  marginBottom={'10px'}>
          <Box borderRadius="xl" padding={'5px'}  width={'30%'}>
            <Image background={'no-repeat'} backgroundSize={'cover'} src={item.image} alt={item.title} borderRadius="xl" padding={'5px'} width={'120px'} height={'110px'}/>
            </Box>
            <Box p="3" width={'70%'}>
              <Box fontWeight="semibold" fontSize={'18px'} lineHeight="tight" isTruncated  width={'250px'}>
                {item.title}
              </Box>
            </Box>
        </Box>
      ))}

      {selectedNews && (
        <Modal onClose={onClose} isOpen={isOpen}  size={'full'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader marginTop={'20px'}></ModalHeader>
            <ModalBody>
              <Image width={'400px'} height={'400px'} background={'no-repeat'} backgroundSize={'cover'} marginBottom={'20px'} borderRadius="xl" src={selectedNews.image} alt={selectedNews.title} />
              <Box fontWeight="semibold" fontSize={'18px'}>{selectedNews.title}</Box>
              <hr />
              {selectedNews.desc}
            </ModalBody>
            <ModalCloseButton />
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default NewsPage;
