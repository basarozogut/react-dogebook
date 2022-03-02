import logo from './logo.svg';
import './App.css';
import DogList from './components/DogList';
import DogGallery from './components/DogGallery';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import api from './api/api';


function App() {
  const [dogs, setDogs] = useState([]);
  const [dogsFiltered, setDogsFiltered] = useState([]);
  const [currentBreed, setCurrentBreed] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  useEffect(() => {
    api.get(`breeds/list/all`)
      .then(res => {
        setDogs(Object.keys(res.data.message));
      });
  }, []);

  useEffect(() => {
    setDogsFiltered(dogs);
  }, [dogs]);

  function handleDogSelected(breed) {
    setCurrentBreed(breed);
  }

  function handleOnSearchInputChange(e) {
    const input = e.target.value;
    setSearchInput(input);
    setDogsFiltered(dogs.filter(breed => breed.includes(input)));
  }

  return (
    <Container>
      <Row>
        <Col md={3}>
          <h3>Doges</h3>
          <Form.Control
            ref={inputEl}
            placeholder="Doge search"
            className="mb-3"
            onChange={handleOnSearchInputChange}
            value={searchInput} />
          <DogList
            dogs={dogsFiltered}
            onDogSelected={handleDogSelected} />
        </Col>
        <Col md={9}>
          <DogGallery breed={currentBreed} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
