import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../CSS/ChapterZero.css';
import FormCharacterPage from './FormCharacterPage';

function ChapterZero() {

  return (
    <div className="background-component">
      <h1 className="title">Chapter Zero</h1>
      <motion.div initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay:  0.2, duration: 1 }}>
        <Container fluid className="character-panel">
          <Row>
            <Col>
              <FormCharacterPage></FormCharacterPage>
            </Col>
          </Row>
        </Container>
      </motion.div>
      <div>
          <img src='../../img/lumi_smile.png' className='lumi'></img>
          <img src='../../img/cloudWelcome.png' className='cloud'></img>
      </div>
    </div >
  );
}

export default ChapterZero;
