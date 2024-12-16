import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/*importa libreria CSS per NavHeader*/
import '../CSS/NavHeader.css';

function NavHeader() {
  return (<Navbar className='navheader-design'>
    <Container>
      <Navbar.Brand href="/">
        <img src="../../img/lumi.png" width="100 px" height="100 px" className="d-inline-block align-top"></img>

      </Navbar.Brand>
      <Navbar.Text className='navheader-text'>Family Playbook</Navbar.Text>
    </Container>
  </Navbar>

  );
}
export default NavHeader;