
import 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/home.css';
import NavbarCom from './child/navbar';


function Home(){
    return (
        <div>
            <NavbarCom/>
            <h1 className="text-center">Halaman Home</h1>
        </div>
    )
}


export default Home;