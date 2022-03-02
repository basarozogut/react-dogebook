import logo from './logo.svg';
import './App.css';
import DogList from './components/DogList';
import DogGallery from './components/DogGallery';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import api from './api/api';


function App() {
  const [dogs, setDogs] = useState([]);
  const [currentBreed, setCurrentBreed] = useState(null);

  useEffect(() => {
    api.get(`breeds/list/all`)
      .then(res => {
        setDogs(Object.keys(res.data.message));
      });
  }, []);

  function handleDogSelected(breed) {
    setCurrentBreed(breed);
  }

  return (
    <Container>
      <Row>
        <Col md={3}>
          <DogList dogs={dogs} onDogSelected={handleDogSelected} />
        </Col>
        <Col md={9}>
          <DogGallery breed={currentBreed} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
