/* eslint-disable */
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate , useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';


const url = "http://127.0.0.1/API_laravel/public/api";

function NavbarCom(props) {
    const navigate = useNavigate();
    const { isLogin } = props;
    function handleRedToSign(){
        navigate('/signup');
    }
    function handleLogout(){
        Swal.fire({
            title: "Beneran ?",
            text: "yakin mau logout? gamau scrool santay-santay dlu? hhe",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, gue bete."
          }).then((result) => {     
              axios.post(`${url}/users/logOut`,{
                      // Authorization : isLogin
                  },
                  {
                      headers : {
                          Authorization : isLogin
                      }
                  }
              ).then((response) => {
                  Cookies.remove('token');
                  Cookies.remove('detailUser');
                  navigate('/login');
              })
          });
          
    }
    
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
                        {/* <Nav.Link href="#action2" className="link-nav a2 position-relative">{//isLogin}</Nav.Link> */}

                    </Nav>
                    {
                        isLogin == null 
                            ?(
                                <Mybutton type='button' event={handleRedToSign} value='Buat Akun' fixClass='Mybutton' clas='px-3 py-2 position-relative' />
                            )
                            :(
                                <Mybutton type='button' event={handleLogout} value='Logout' fixClass='Mybutton' clas='px-3 py-2 position-relative' />
                            )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function Mybutton(props) {
    const { value, type, clas, fixClass, event } = props;
    return (
        <button className={`${clas} ${fixClass}`} type={type} onClick={event} >
            <span>{value}</span>
        </button>
    );
}


export default NavbarCom;