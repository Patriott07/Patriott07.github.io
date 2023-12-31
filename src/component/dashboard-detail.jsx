import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Lottie from 'lottie-react';
import { Navigate, useNavigate } from 'react-router-dom';
import 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../component/css/dashboardDetail.css';
import myLoad from '../asset/Load.json';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';


const url = "http://127.0.0.1/API_laravel/public/api";


function DashboardDetail() {
    const { id } = useParams();
    const token = Cookies.get('token');
    const navigate = useNavigate();
    const [detailData, setDetailData] = useState(null);
    const [modalPostPengeluaran, setModalPostPengeluaran] = useState(false);
    const [dataCategory, setDataCategory] = useState([]);

    // form

    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [category, setCategory] = useState(null);
    const [date, setDate] = useState(null);
    const [deskripsi, setDeskripsi] = useState(null);


    async function getCategory(token) {
        console.log(token)
        if (token) {
            // switchLoad();
            axios.get(`${url}/category`, {
                headers: {
                    'Authorization': `${token}`,

                }
            }).then(response => {
                setDataCategory(response.data.data);
                // return response.data.data;
                // console.log('Category : ', response);

            }).catch(error => {
                console.log(error);
                // throw error;
            })
        }
    }

    async function getDetail(token, id) {
        axios.get(`${url}/pengeluaran/${id}`, {
            headers: {
                'Authorization': token
            }
        }).then(response => {
            // console.log(response);
            setDetailData(response.data.data);
            // return response.data.data;
        }).catch(error => {
            console.log(error)
            // throw error;
        });
    }

    const handleEdit = (e) => {
        e.preventDefault();
        // console.dir(e.target);
        axios.patch(`${url}/pengeluaran/edit/${detailData.id}`, {
            title: e.target[0].value,
            pengeluaran_uang: e.target[1].value,
            id_category: e.target[2].value,
            tanggal: e.target[3].value,
            deskripsi: e.target[4].value,
        }, {
            headers: {
                'Authorization': token
            }
        }).then(response => {
            Swal.fire({
                title: "Congratss!",
                text: response.data.data.message,
                icon: "success"
            }).then(() => {
                e.target[0].value = '';
                e.target[1].value = '';
                e.target[2].value = '';
                e.target[3].value = '';
                e.target[4].value = '';
                // navigate(`/dashboard/detail/${id}`);
                window.location.reload();
            })
            console.log(response)
        }).catch(error => {
            console.log(error)
        })


    }
    const prepareEdit = (e) => {
        setTitle(detailData.title)
        setPrice(detailData.pengeluaran_uang)
        setCategory(detailData.category.id)
        setDate(detailData.tanggal)
        setDeskripsi(detailData.deskripsi)
    }
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will delete this. it can't be reverse!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                //axios
                axios.delete(`${url}/pengeluaran/delete/${detailData.id}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "pengeluaran anda telah di delete.",
                        icon: "success"
                    }).then(() => {
                        navigate('/dashboard');
                    })
                })
            }
        });
    }

    useEffect(() => {

        async function start(){
            try{
                const fetch1 = await getDetail(token, id);
                const fetch2 = await getCategory(token);
            }catch(error){
                console.log(error)
                console.log(detailData)
            }
        }

        start();
    }, [])

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            {detailData === null ? (
                <Lottie
                    animationData={myLoad} // Animasi JSON
                    speed='2'
                    loop={true}
                    autoplay={true}
                    style={{ width: '50%', height: '50%' }}
                />
            ) : (
                <div>
                    <div className="row justify-content-center gap-3 align-items-center">
                        <div className="col-lg-6 left">
                            <div className="fs20">
                                {detailData.tanggal}
                            </div>
                            <div className="my-2 fs40">
                                {detailData.title}
                            </div>
                            <div className="fs24">
                                {detailData.deskripsi}
                            </div>
                        </div>
                        <div className="col-lg-6 row px-5 justify-content-start">
                            <span className="fs20 mx-3 category">{detailData.category.name}</span>
                            <div className="my-2">
                                <span className='fs14'>Rp. </span>
                                <span className="fs80">{detailData.pengeluaran_uang}</span>
                            </div>
                        </div>
                        <div className="col-lg-12 text-center mt-5 py-3">
                            <span className="btn mx-1 myButton" onClick={() => navigate('/dashboard')}>Back</span>
                            <span className="btn mx-1 btn-warning" onClick={() => { prepareEdit(); setModalPostPengeluaran(true) }}>Edit Pengeluaran</span>
                            <span className="btn mx-1 btn-danger" onClick={handleDelete}>Delete Pengeluaran</span>
                        </div>
                    </div>

                    {/* modal */}
                    <Modal
                        size="lg"
                        show={modalPostPengeluaran}
                        onHide={() => setModalPostPengeluaran(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <div className="fs40 logo">inMoney</div>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="container">
                                <div className="myModal container">
                                    <form action="" className="modal-form" onSubmit={handleEdit}>
                                        <div className="fs27">Form Store Pengeluaran</div>
                                        <div className="mt-3 row">
                                            <div className="col-lg-5">
                                                <div className="form-text">Write the title</div>
                                                <Form.Control type="text" placeholder="Write the title here.." size='lg' className='form-dark' value={title} onChange={(e) => setTitle(e.target.value)} required />
                                            </div>
                                            <div className="col-lg-5">
                                                <div className="form-text">Rp. </div>
                                                <Form.Control type="number" placeholder="Pengeluaran uang" size='lg' className='form-light' value={price} onChange={(e) => setPrice(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="row mt-3 gap-lg-0 gap-3 align-items-end">
                                            <div className="col-lg-6">
                                                <FloatingLabel controlId="" label="Choose one category">
                                                    <Form.Select className='' aria-label="Floating label select example" value={category} onChange={(e) => setCategory(e.target.value)} required>
                                                        {dataCategory.length > 0 ? (
                                                            dataCategory.map(function (response, index) {
                                                                // console.log('Key' + index, response)
                                                                return (
                                                                    <option key={index} value={response.id}>{response.name}</option>
                                                                );
                                                            })
                                                        ) : (
                                                            <></>
                                                        )}

                                                    </Form.Select>
                                                </FloatingLabel>
                                            </div>
                                            <div className="col-lg-5">
                                                <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="row mt-3 align-items-end">
                                            <div className="col-lg-9">
                                                <FloatingLabel controlId="floatingTextarea2" label="Write Descriptive">
                                                    <Form.Control
                                                        as="textarea"
                                                        placeholder="Leave a comment here"
                                                        style={{ height: '100px' }}
                                                        value={deskripsi}
                                                        onChange={(e) => setDeskripsi(e.target.value)}
                                                        required
                                                    />
                                                </FloatingLabel>
                                            </div>
                                        </div>
                                        <div className="row mt-3 gap-3">
                                            <span className='col-4 col-lg-2'>
                                                <input type="submit" value="Save it" className='mySubmitForm' />

                                            </span>
                                            <span className='col-4 col-lg-2'>

                                                <input type="reset" value="Reset form" className='myResetForm' />
                                            </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>

                </div>


            )}


        </div>
    );
}

export default DashboardDetail;