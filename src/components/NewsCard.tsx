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
    <Box>
      <h2>News</h2>
      {news.map((item) => (
        <Box key={item.id} onClick={() => handleCardClick(item)}  borderRadius="lg" overflow="hidden" display={'flex'}>
          <Image src={item.image} alt={item.title} borderRadius="lg" padding={'5px'} width={'130px'} height={'90px'} backgroundSize={'cover'}/>
          <Box p="6">
            <Box fontWeight="semibold"  lineHeight="tight" isTruncated>
              {item.title}
            </Box>
            <Box>
              {item.desc}
            </Box>
          </Box>
        </Box>
      ))}

      {selectedNews && (
        <Modal onClose={onClose} isOpen={isOpen}  size={'full'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedNews.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedNews.desc}
              <Image src={selectedNews.image} alt={selectedNews.title} />
            </ModalBody>
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
