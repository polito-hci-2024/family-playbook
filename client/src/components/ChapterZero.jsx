import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../CSS/ChapterZero.css';
import FormCharacterPage from './FormCharacterPage';

function ChapterZero() {

  return (
    <div className="background-component">
      <h1 className="title">Chapter Zero</h1>
      <Container fluid className="character-panel">
        <Row>
          <Col>
            <FormCharacterPage></FormCharacterPage>
          </Col>
        </Row>
      </Container>
      <div>
        <img src='../../img/lumi.png' className='lumi'></img>
        <img src='../../img/cloudWelcome.png' className='cloud'></img>
      </div>
    </div >
  );
}

export default ChapterZero;
