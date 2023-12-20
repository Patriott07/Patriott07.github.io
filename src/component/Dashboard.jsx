import '../component/css/dashboard.css';
import 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
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

function Dashboard() {
    const [token, setToken] = useState(Cookies.get('token'));
    const navigate = useNavigate();
    useEffect(() => {
        // Panggil getDataFeedback saat komponen di-mount
        redirectLogin(token, false);
    }, []);

    function setActive(i){
        const navTab = document.getElementsByClassName('nav-tab');
        Array.from(navTab).forEach(function(data,index){
            data.classList.remove('nav-tab-active');
        });

        navTab[i].classList.add('nav-tab-active');
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
    return (
        <div className=''>
            <div className="row vh-100">
                <div className="col-lg-3 left-bar py-4">
                    <div className="fs40 text-center">inMoney.</div>
                    <div className="container mt-5">
                        <div className=''>
                            <span className="chip mb-4">Overview</span>
                            <div className="nav-tab ms-4 mt-4 mb-2" onClick={()=>{setActive(0)}}>
                                <svg className='me-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="" />
                                </svg>
                                <span className="fs18">
                                    Dashboard
                                </span>
                            </div>
                            <div className="nav-tab ms-4 mb-2" onClick={()=>{setActive(1)}}>
                                <svg className='me-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="" />
                                </svg>
                                <span className="fs18">
                                    Dashboard
                                </span>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <span className="chip mb-4">Other More</span>

                        </div>
                    </div>
                </div>
                <div className="col-lg-7 main-content">

                </div>
                <div className="col-lg-2 right-bar">

                </div>
            </div>
        </div>
    )
}
export default Dashboard;