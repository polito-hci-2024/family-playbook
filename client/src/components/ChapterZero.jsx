import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useState } from 'react';
import '../CSS/ChapterZero.css';
import FormCharacterPage from './FormCharacterPage';
import ModalGuide from './ModalGuide'
import ButtonsGeneral from './ButtonsGeneral';

function ChapterZero() {


  return (
    <div className="background-component">
      <h1 className="title">Chapter Zero</h1>
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1 }}>
        <Container fluid className="character-panel">
          <ModalGuide videoSrc="mp4/initialGuide.mp4" />
          <Row>
            <Col>
              <FormCharacterPage></FormCharacterPage>
            </Col>
          </Row>
        </Container>
      </motion.div>

      <ButtonsGeneral></ButtonsGeneral>
    </div >
  );
}

export default ChapterZero;
