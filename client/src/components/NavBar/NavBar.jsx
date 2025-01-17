import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import Categories from '../Categories/Categories';
import style from './NavBar.module.css';
import iconHome from '../../Iconos/icon-Home.png';
import { BsCart2 } from "react-icons/bs";
import { checkout } from '../../redux/actions/actions';
import Modal from 'react-bootstrap/Modal';
import AdminButton from '../Admin/AdminButton/AdminButton';


const NavBar = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const history = useHistory();
    const dispatch = useDispatch();
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('profile'))) //busco el usuario que guarde en la localstorage EN EL REDUCER
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        localStorage.setItem("profile", JSON.stringify(user));
    }, [usuario])

    console.log("usuario nav", user)
    const logout = () => {
        dispatch({ type: "LOGOUT" });
        dispatch(checkout());
        history.push("/");
    }

    const handleClick = () => {
        if (user) {
            history.push("/carrito")
        } else {
            handleShow();
            setTimeout(handleClose, 3000);
        }
    }

    return (
        <div className={style.NavBar}>
            <Link to='/'>
                <img className={style.imgIcono} src={iconHome} alt="icono de home" />
            </Link>
            <div >
                <SearchBar />   
                <Categories />
            </div>
            <div className={style.ctnRegis}>
                
                <BsCart2 onClick={handleClick} className={style.linkCart} />

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <h1 className={style.titleModal} >ACCESO DENEGADO</h1>
                    </Modal.Header>
                    <p className={style.textoModal}> Debes iniciar sessión o registarte para ingresar al carrito !</p>
                </Modal>

                {
                    user !== null ? (
                        <>
                            <Link className={style.link} to='/profile'>  <p className={style.nameUser}>Hola, {
                                user?.nombre ? user?.nombre : user?.user?.nombre
                                
                            } </p>
                            <AdminButton />
                            </Link>
                            
                            <button onClick={logout} className={style.logout}>Salir</button>
                        </>
                    ) : (
                        <>
                            <Link className={style.login} to='/login'>
                                <button className={style.btns}>Iniciar sesión</button>
                            </Link>
                            <Link className={style.register} to='/register'>
                                <button className={style.btns}>Registrarte</button>
                            </Link>
                        </>
                    )}
                       
            </div>
        </div>
    );
};

export default NavBar;