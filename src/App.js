
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Phrase from './components/Phrase';
import Spinner from './components/Spinner';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5rem;
  flex-direction: column;
`;

const Button = styled.button`
  background: -webkit-linear-gradient(top left, #007d35 0%, #007d35 40%, #0f574e 100%);
  background-size: 300px;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  margin-top: 3rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border: 2px solid black;
  transition: background-size .3s ease;

  :hover {
    cursor:pointer;
    background-size: 400px;
  }
`;

const SpinnerContainer = styled.div`
  margin-top: 20rem;
`


function App() {

  // State of phrase
  const [ phrase, savePhrase ] = useState({});

  // State for loading
  const [ loading, updateLoading ] = useState(true);


  const consultAPI = async () => {
    const api = await fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
    const phrase = await api.json();
    savePhrase(phrase[0]);
    updateLoading(false);
  }

  // Load a phrase when document ready
  useEffect( () => {
    consultAPI();
  }, []);

  return (
    <Container>
      {loading ? <SpinnerContainer><Spinner /></SpinnerContainer> : null}
      <Phrase phrase={phrase} />
      <Button
        onClick={consultAPI}
      >Get phrase</Button>
    </Container>
  );
}

export default App;
