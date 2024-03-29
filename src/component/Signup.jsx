/* eslint-disable */
import 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/login.css';
import { Navigate, useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';


const url = "https://patriottoa.000webhostapp.com/api";
function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Panggil getDataFeedback saat komponen di-mount
        
    }, []);

    function trySignup() { 
        axios.post(`${url}/users/signUp`,{
            email : email,
            password : password,
            name : username
        }).then((response) => {
            console.log(response);
            Swal.fire({
                title: "Congrats",
                text: response.data.data.message + '. <br> Btw you wanna save the email? for another from.',
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Make it!"
              }).then((result) => {
                if (result.isConfirmed) {
                    Cookies.set('email', email , {expires : 7})
                    Cookies.set('pass', password , {expires : 7})
                  Swal.fire({
                    title: "Clear",
                    text: "Now everything is gonna be easy.",
                    icon: "success"
                  });
                }

                navigate('/login');

              });
        }).catch(error => {
            console.log(error);
            Swal.fire({
                title: "Malfunction",
                text: error.response.data.message,
                icon: "error"
            });
        });
    }
    return (
        <div id='login'>
            <div className="app-signup container vh-100 text-center">
                <div className="fs40 mark-logo" onClick={()=> navigate('/')}>
                    inMoney.
                </div>
                <div className="mt-3">
                    <div className="col-lg-4 col-10 mx-auto">
                        Catat berbagai pengeluaranmu dengan kami. Analisis bagaimana uangmu digunakan
                    </div>
                </div>

                <div className="mt-3">
                    <div className="row justify-content-center gap-5 align-items-center">
                        <div className="fs27 col-lg-2 col-5 mark-logo">
                            Signup
                        </div>
                        <div className="fs16 col-lg-2 col-5 b mark-logo" onClick={() => { navigate('/login') }}>
                            Switch
                        </div>
                    </div>
                    <div className="form text-start">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Your username.."
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Type name here.." value={username} onChange={(e) => setUsername(e.target.value)} />
                        </FloatingLabel>

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

                        <Mybutton type='button' event={() => trySignup()} value='Create account' fixClass='Mybutton2' clas='mt-3 px-3 py-2 text-start' />
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

export default Signup;