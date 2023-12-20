import 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/login.css';
import headerFoto from '../image/header.png';
import NavbarCom from './child/navbar';
import { Navigate, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import imageFeedback from '../image/feedback-image.png';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';


const url = "http://127.0.0.1/API_laravel/public/api";
function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [save, setSave] = useState('');
    const [token, setToken] = useState('')
    // const [remember, setRemember] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Panggil getDataFeedback saat komponen di-mount
        checkedMe('email', 'email');
        checkedMe('pass', 'password');
    }, []);

    function checkedMe(key, type) {
        const isCheck = localStorage.getItem(key);
        // console.log(isCheck);
        if (isCheck != null) {
            if (type === 'email') {

                setEmail(isCheck);
            } else {

                setPassword(isCheck);
            }   
        }
        
    }

    function remember(keyEmail, emailVal, keyPass, passVal) {
        localStorage.setItem(keyEmail, emailVal);
        localStorage.setItem(keyPass, passVal);
        console.log('berhasil rember')
    }

    function tryLogin() {
        if (save === true) {
            remember('email', email, 'pass', password);
        }
        
        axios.post(`${url}/users/login`,{
            email : email,
            password : password
        }).then((response) => {
            console.log(response, "succes");
        }).catch(error => {
            console.log(error);
            Swal.fire({
                title: "Malfunction",
                text: error.response.data.message,
                icon: "error"
              });
        })
        
    }
    return (
        <div id='login'>
            <div className="app container vh-100 text-center">
                <div className="fs40 mark-logo">
                    inMoney.
                </div>
                <div className="mt-3">
                    <div className="col-lg-4 col-10 mx-auto">
                        Catat berbagai pengeluaranmu dengan kami. Analisis bagaimana uangmu digunakan
                    </div>
                </div>

                <div className="mt-5">
                    <div className="row justify-content-center gap-5 align-items-center">
                        <div className="fs27 col-lg-2 col-5 mark-logo">
                            Login
                        </div>
                        <div className="fs16 col-lg-2 col-5 b mark-logo" onClick={() => { navigate('/signup') }}>
                            Switch
                        </div>
                    </div>
                    <div className="form text-start">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FloatingLabel>

                        <Mybutton type='button' event={tryLogin} value='Login' fixClass='Mybutton2' clas='mt-3 px-3 py-2 text-start' />
                    </div>
                    <div className="footer-form mx-auto">
                        <div className="col-5">
                            <Form.Check // prettier-ignore
                                type='checkbox'
                                id={`default-checkboxes`}
                                label='Remember me'
                                // checked
                                value='test'
                                onChange={(e) => setSave(e.target.checked)}
                            />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}


function Mybutton(props) {
    const { value, type, clas, fixClass, event = null } = props;
    return (
        <button className={`${clas} ${fixClass}`} onClick={event} type={type} >
            <span>{value}</span>
        </button>
    );
}

export default Login;