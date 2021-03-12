import React, {useContext, useEffect} from 'react'
import AuthContext from '../context/autenticacion/AuthContext'
import {
    BrowserRouter as Router,
    Link
  } from 'react-router-dom'

export default function NavBar() {

    //Extraer info de autenticación
    const authContext= useContext(AuthContext)
    const {usuario, usuarioAutenticado, cerrarSesion} = authContext
    //esta desestructuración de abajo viene de los como props del AuthState (se pueden ver en el return del AuthStae )

    //la función dentro de useEffect (definida en el AuthState, importada con context) me regresa el usuario autenticado, el token 
    useEffect(() => {
        usuarioAutenticado()
    }, [])

    return (
        <>
        <header className="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4 bg-blue-600">
        
        {/* ------Inicia Logo o Texto Book Maker del nav----- */}
        <div className="flex items-center justify-between mb-4 md:mb-0 mx-2">
            <h1 className="leading-none text-2xl text-white">
            <Link to="/" className="no-underline text-grey-darkest hover:text-black">The Book Maker</Link>
            </h1>
        </div>

         {/* -------Termina Logo, empiezan botones de navegacion------- */}
            <div>
            {usuario ?
            <ul className="list-reset md:flex md:items-center mx-2">
                
                <li className="md:ml-4">
                <Link to="/calculadora" className="border-t block no-underline hover:underline py-2 text-white hover:text-black md:border-none md:p-0">Calculadora</Link>
                </li>
               
                <li className="md:ml-4">
                <Link to="/mis-obras" className="border-t block no-underline hover:underline py-2 text-white hover:text-black md:border-none md:p-0">Mi Perfil</Link>
                </li>

                <li className="md:ml-4">
                <button onClick={() => {cerrarSesion()}} className="border-t block no-underline hover:underline py-2 text-white hover:text-black md:border-none md:p-0">Logout</button>
                </li>              
            </ul>
            :
            <ul className="list-reset md:flex md:items-center mx-2">
                <li className="md:ml-4">
                <Link to="/calculadora" className="border-t block no-underline hover:underline py-2 text-white hover:text-black md:border-none md:p-0">Calculadora</Link>
                </li>
                
                <li className="md:ml-4">
                <Link to="/signup" className="border-t block no-underline hover:underline py-2 text-white hover:text-black md:border-none md:p-0">Signup</Link>
                </li>

                <li className="md:ml-4">
                <Link to="/login" className="border-t block no-underline hover:underline py-2 text-white hover:text-black md:border-none md:p-0">Login</Link>
                </li>                        
            </ul>
            }
            </div>

        </header>
        </>
    )
}
