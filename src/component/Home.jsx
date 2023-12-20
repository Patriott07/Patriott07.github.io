
import 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/home.css';
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
import Cookies from 'js-cookie';

// const axios = require('axios');
const url = "http://127.0.0.1/API_laravel/public/api";

function Home() {
    const navigate = useNavigate();
    const [dataFeedback, setDataFeedback] = useState([]);
    const [text, setText] = useState('');
    const [rating, setRating] = useState('');
    const [token, setToken] = useState(Cookies.get('token'));
    const [user, setUser] = useState('');

    useEffect(() => {
        // Panggil getDataFeedback saat komponen di-mount
        getDataFeedback();
        getUserInfo();
        // redirectLogin(token, false);
    }, []); // Gunakan array kosong agar useEffect hanya dijalankan sekali setelah mounting

    function getUserInfo() {
        if (Cookies.get('detailUser')) {
            setUser(JSON.parse(Cookies.get('detailUser')));
        }
        console.log(Cookies.get('detailUser'), user, token);
    }
    async function getDataFeedback() {
        const response = await axios.get(`${url}/feedback`);
        setDataFeedback(response.data.data);
        console.log(dataFeedback);
    }

    function redirectLogin(data, showAlert = true) {
        if (!data && showAlert === true) {
            Swal.fire({
                title: "Malfunction",
                text: 'Kamu belum login. permintaan dibatalkan.',
                icon: "error"
            }).then(() => {
                navigate('/login');
            })
        } else if (!data && showAlert === false) {
            navigate('/login');
        }
    }

    function keepHere(token, path, showAlert = true) {
        if (!token) {
            navigate(path); //dia akan pindah
        }
        if(showAlert && token) {
            Swal.fire({
                title: "Malfunction",
                text: 'Kamu udah login. permintaan dibatalkan.',
                icon: "error"
            });
        }
        // jika disini ia akan stay
    }

    function postFeedback() {
        // console.log('Sending ..');
        redirectLogin(token); //check is login or not
        axios.post(`${url}/feedback/post`, {
            content: text,
            rate: rating
        },
            {
                headers: {
                    Authorization: token
                }
            }).then((response) => {
                Swal.fire({
                    title: "Congrats",
                    text: response.data.message,
                    icon: "success"
                });

                setText('');
                setRating('');

            }).catch(error => {
                // Swal.fire({
                //     title: "Malfunction",
                //     text: error.response.data.message,
                //     icon: "error"
                // });
            })
    }

    function getResponseUser(num) {
        if (num >= 4) {
            return "Sangat Puas";
        }
        if (num < 4 && num >= 2) {
            return "Merasa cukup";
        }
        if (num < 2) {
            return "Kecewa. kurang memuaskan";
        }
    }


    // { getDataFeedback() }
    return (
        <div id='home'>
            <NavbarCom isLogin={token} />
            {/* header */}
            <div id="section-1" className='mt-5'>
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-6">
                            <div className="fs40 mb-3">Jaga Kesehatan Keuanganmu dengan kami. Hanya di <br /> <span className="mark-logo">inMoney</span></div>
                            <div className="fs18 mb-4">
                                Catat berbagai pengeluaranmu dengan kami. Analisis bagaimana uangmu digunakan
                            </div>
                            <div className="mb-3">
                                <div className="d-lg-flex d-md-flex align-items-center gap-2 justify-content-start">
                                    <div>
                                        <Mybutton type='button' value='Ayo, mulai sekarang!' event={() => { navigate('/dashboard')}} fixClass='Mybutton2' clas='px-3 py-2 position-relative mb-3' />
                                    </div>
                                    <div className="fs16">
                                        Tidak punya Account ? <A value="Daftar disini" event={() => { keepHere(token, '/signup') }} clas='a' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={headerFoto} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            {/* section 2 */}
            <div className="" id="section-2">
                <div className="col-lg-6 col-md-10 mx-auto">
                    <div className="fs40 text-center">
                        Apa keuntungan menggunakan <span className='mark-logo'>inMoney?</span>
                    </div>
                </div>

                <div className="mt-5 col-lg-8 col-md-10 mx-auto">
                    <div className="row justify-content-center gap-4 align-items-center">
                        <div className="My-card" id='cardOne'>
                            <div className="fs27 text-card position-relative">
                                User Friendly
                            </div>
                        </div>
                        <div className="My-card" id='cardTwo'>
                            <div className="fs27 text-card position-relative">
                                Temukan Commu nity
                            </div>
                        </div>
                        <div className="My-card" id='cardThree'>
                            <div className="fs27 text-card position-relative">
                                Keamanan dan Privasi
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* section 3 */}
            <div id="section-3">
                <div className="fs40 text-center mb-3">
                    Apa Kata mereka?
                </div>
                <div className="container-feedback p-5 mx-sm-auto">
                    <Carousel fade data-bs-theme="dark" className='row carosel justify-content-center'>
                        {dataFeedback.map(function (response, index) {

                            let rate = Array.from({ length: response.rate });

                            return (

                                <Carousel.Item className='col-lg-6' key={index}>
                                    <div className="card-feedback">
                                        <div className="tGray fs14">
                                            {response.tanggal}
                                        </div>
                                        <div className="fs27 mt-3">
                                            {response.pengguna.name}

                                        </div>
                                        <div className="mt-3 fs16">
                                            {response.content}
                                        </div>
                                        <div className="mt-4 row justify-content-between">
                                            <div className='col-6'>
                                                {rate.map(function (data, index) {
                                                    return (
                                                        <svg key={index} className='me-1' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path d="M9.15301 5.408C10.42 3.136 11.053 2 12 2C12.947 2 13.58 3.136 14.847 5.408L15.175 5.996C15.535 6.642 15.715 6.965 15.995 7.178C16.275 7.391 16.625 7.47 17.325 7.628L17.961 7.772C20.421 8.329 21.65 8.607 21.943 9.548C22.235 10.488 21.397 11.469 19.72 13.43L19.286 13.937C18.81 14.494 18.571 14.773 18.464 15.117C18.357 15.462 18.393 15.834 18.465 16.577L18.531 17.254C18.784 19.871 18.911 21.179 18.145 21.76C17.379 22.342 16.227 21.811 13.925 20.751L13.328 20.477C12.674 20.175 12.347 20.025 12 20.025C11.653 20.025 11.326 20.175 10.671 20.477L10.076 20.751C7.77301 21.811 6.62101 22.341 5.85601 21.761C5.08901 21.179 5.21601 19.871 5.46901 17.254L5.53501 16.578C5.60701 15.834 5.64301 15.462 5.53501 15.118C5.42901 14.773 5.19001 14.494 4.71401 13.938L4.28001 13.43C2.60301 11.47 1.76501 10.489 2.05701 9.548C2.35001 8.607 3.58001 8.328 6.04001 7.772L6.67601 7.628C7.37501 7.47 7.72401 7.391 8.00501 7.178C8.28501 6.965 8.46501 6.642 8.82501 5.996L9.15301 5.408Z" fill="#586E88" />
                                                        </svg>
                                                    )
                                                })}
                                            </div>
                                            <div className='col-6'>
                                                <div className="fs14 tGray text-end">
                                                    {getResponseUser(rate.length)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Carousel.Item>
                            );
                        })}
                        {/* <Carousel.Item className='col-lg-6'>
                            <div className="card-feedback">
                                test
                            </div>
                        </Carousel.Item>
                        <Carousel.Item className='col-lg-6'>
                            <div className="card-feedback">
                                test
                            </div>
                        </Carousel.Item> */}
                    </Carousel>
                </div>
            </div>

            {/* section 4 */}
            <div id="section-4">
                <div className="container">
                    <div className="col-lg-6">
                        <div className="fs27 mb-3">I need help.</div>
                        <div className="fs18 mb-3">
                            Luangkan waktu anda sedikit untuk kami. kami butuh feedback anda
                        </div>

                    </div>

                    <div className="row mt-5 mb-5 justify-content-between align-items-center">
                        <div className="col-lg-5 mb-4 mb-lg-0">
                            <img src={imageFeedback} alt="" />
                        </div>
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Name"
                                className="mb-3"
                            >
                                <Form.Control type="text" readOnly value={`${user.name}`} placeholder="name@example.com" />
                                <div className="form-text">
                                    Write down your name here..
                                </div>
                            </FloatingLabel>


                            <FloatingLabel controlId="text" label="Your feedback here. . .">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '120px' }}
                                    onChange={(e) => setText(e.target.value)}
                                    value={text}
                                    required
                                />
                                <div className="form-text">
                                    i apperiacte your feedback.
                                </div>
                            </FloatingLabel>
                            <div className="row mt-3">
                                <div className="col-6">
                                    <FloatingLabel controlId="rating" label="give me some rating..">
                                        <Form.Select aria-label="Floating label select example" value={rating} onChange={(e) => setRating(e.target.value)} required>
                                            <option>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                            <option value="4">Four</option>
                                            <option value="5">Five</option>
                                        </Form.Select>

                                    </FloatingLabel>
                                </div>
                                <div className="col-6">
                                    <div className="text-end pt-4">
                                        <Mybutton type='button' event={postFeedback} value='Kirim saranmu' fixClass='Mybutton2' clas='px-3 py-2 position-relative mb-3' />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="text-center fs18">
                        You have spesific feedback for us? <span className="a">Contact here</span>
                    </div>
                </div>
            </div>

            {/* footer */}
            <div id="footer" className='container'>
                <div className="py-5 px-3">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="fs40">inMoney</div>
                            <div className="fs16 tGray col-9">
                                @Copyright Patriott07 | Febiynti07 | ahmd-fariz. 2023.
                            </div>
                        </div>
                        <div className="col-lg-8 mt-4 mt-lg-0">
                            <div className="row justify-content-around">
                                <div className="col-lg-4 col-6">
                                    <div className="fs27 mb-3">Page</div>
                                    <a href='' className="fs16 a mb-3">Sign up</a> <br /><br />
                                    <a href='' className="fs16 a mb-3">Sign in</a> <br /><br />
                                    <a href='' className="fs16 a mb-3">Community page</a> <br /><br />
                                    <a href='' className="fs16 a mb-3">Dashboard page</a> <br /><br />
                                </div>
                                <div className="col-lg-4 col-5">
                                    <div className="fs27 mb-3">Sosial</div>
                                    <a href='' className="fs16 a mb-3">Facebook</a> <br /><br />
                                    <a href='' className="fs16 a mb-3">Instagram</a> <br /><br />
                                    <a href='' className="fs16 a mb-3">github</a> <br /><br />
                                    <a href='' className="fs16 a mb-3">youtube</a> <br /><br />
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-5 pt-5 tGray fs14">
                            2023 Made with love and Dedicate. <br />
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="8" viewBox="0 0 1063 8" fill="none">
                                <path d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM1062.35 4.35355C1062.55 4.15829 1062.55 3.84171 1062.35 3.64645L1059.17 0.464466C1058.98 0.269204 1058.66 0.269204 1058.46 0.464466C1058.27 0.659728 1058.27 0.976311 1058.46 1.17157L1061.29 4L1058.46 6.82843C1058.27 7.02369 1058.27 7.34027 1058.46 7.53553C1058.66 7.7308 1058.98 7.7308 1059.17 7.53553L1062.35 4.35355ZM1 4.5H1062V3.5H1V4.5Z" fill="black" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )


}

function Mybutton(props) {
    const { value, type, clas, fixClass, event = null } = props;
    return (
        <button className={`${clas} ${fixClass}`} onClick={event} type={type} >
            <span>{value}</span>
        </button>
    );
}
function A(props) {
    const navigate = useNavigate();
    const { event, value, clas } = props;
    return (
        <span onClick={event} className={clas}>{value}</span>
    )
}






export default Home;