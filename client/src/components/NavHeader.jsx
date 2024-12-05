import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavHeader(props) {
    return (
      <Navbar bg='warning' data-bs-theme="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link className="fs-1 fw-bold" style={{ color: 'black', textDecoration: 'none' }} to="/">Family Playbook</Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }

export default NavHeader;