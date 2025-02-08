import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useState } from 'react';
import '../CSS/ChapterZero.css';
import FormCharacterPage from './FormCharacterPage';
import ModalGuide from './ModalGuide'
import ButtonsGeneral from './ButtonsGeneral';
import InteractiveGuide from './GuidaRebecca';
function ChapterZero() {

  const [messages] = useState([
    " <b>Hi, I'm Lumi</b>, <br>Welcome to <b><i>PlayBook</b></i>!🎉",
    " <i><b>Playbook</i></b> is your gateway to fun-filled adventures for families in <b>Turin</b>, with experiences <u>tailored just for you</u>, turning your city into the perfect playground.",
    " <b><i>How It Works:</b></i><br><b>1.</b> Choose a <i>character</i>, a <i>path</i>, and an <i>object</i> to start your adventure.<br><b>2.</b><i> Based on your choices</i>, we’ll suggest exciting real-world activities.<br><b>3.</b>Take on the challenges and complete your journey along the way!",
    " <b>Every day is a new adventure.</b> <br><i> Ready to begin?🚀</i>"
  ]);
  

  return (
    <div className="background-component">
      <h1 className="title">Chapter Zero</h1>
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1 }}>
        <Container fluid className="character-panel">
          <Row>
            <Col>
              <FormCharacterPage></FormCharacterPage>
            </Col>
          </Row>
        </Container>
      </motion.div>

      <ButtonsGeneral messages={messages}></ButtonsGeneral>
    </div >
  );
}

export default ChapterZero;
