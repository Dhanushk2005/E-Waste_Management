
import './App.css';
import Login from "./login.jsx";
import Create_register from "./register.jsx";
import { Routes, Route} from 'react-router-dom';
import Home from './home.jsx';
import Layout from './layout.jsx';
import { RequestHistory ,Requests,NewRequest} from './Menus.jsx';

function App() {

    return (

        <div>
            <Routes >
                <Route element={<Layout />}>
                    <Route path='/' element={<Home />}> </Route>
                    <Route path='/login' element={<Login />}> </Route>
                    <Route path='/register' element={<Create_register />}> </Route>
                    <Route path='/home' element={<Home />}></Route>
                    <Route path='/newrequest' element={<NewRequest />}></Route>
                    <Route path='/requests' element={<Requests />}></Route>
                    <Route path='/requesthistory' element={<RequestHistory />}></Route>
                </Route>
            </Routes>
        </div>

    )
}

export default App;

