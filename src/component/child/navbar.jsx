
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarCom() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary nav">
            <Container>
                <Navbar.Brand href="#" className='fs40 mark-logo'>InMoney.</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className='text-center'>
                    <Nav
                        className="ms-auto my-2 my-lg-0 me-5 pe-5 gap-4"
                        style={{ maxHeight: '200px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#home" className="a2 link-nav position-relative">Home</Nav.Link>
                        <Nav.Link href="#" className="link-nav a2 position-relative">Keuntungan</Nav.Link>
                        <Nav.Link href="#action2" className="link-nav a2 position-relative">Testimony</Nav.Link>
                        <Nav.Link href="#action2" className="link-nav a2 position-relative">Contact</Nav.Link>

                    </Nav>
                    <Mybutton type='button' value='Buat Akun' fixClass='Mybutton' clas='px-3 py-2 position-relative'/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function Mybutton(props){
    const {value, type, clas, fixClass } = props;
    return (
        <button className={`${clas} ${fixClass}`} type={type} >
            <span>{value}</span>
        </button>
    );
}


export default NavbarCom;