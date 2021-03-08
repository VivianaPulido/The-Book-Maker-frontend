import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
  } from 'react-router-dom'

export default function NavBar() {
    return (
        <>
        <header class="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4 bg-blue-600">

        {/* ------Inicia Logo o Texto Book Maker del nav----- */}
        <div class="flex items-center justify-between mb-4 md:mb-0 mx-2">
            <h1 class="leading-none text-2xl text-white">
            <Link to="/" class="no-underline text-grey-darkest hover:text-black">The Book Maker</Link>
            </h1>
        
        {/* -------Termina Logo, empiezan botones de navegacion------- */}
        </div>
            <ul class="list-reset md:flex md:items-center mx-2">
                <li class="md:ml-4">
                <Link to="/servicios" class="border-t block no-underline hover:underline py-2 text-white hover:text-black md:border-none md:p-0">Servicios</Link>
                </li>

                <li class="md:ml-4">
                <Link to="/calculadora" class="border-t block no-underline hover:underline py-2 text-white hover:text-black md:border-none md:p-0">Calculadora</Link>
                </li>

                <li class="md:ml-4">
                <Link to="/signup" class="border-t block no-underline hover:underline py-2 text-white hover:text-black md:border-none md:p-0">Signup</Link>
                </li>

                <li class="md:ml-4">
                <Link to="/login" class="border-t block no-underline hover:underline py-2 text-white hover:text-black md:border-none md:p-0">Login</Link>
                </li>

                <li class="md:ml-4">
                <Link to="/tienda" class="border-t block no-underline hover:underline py-2 text-white hover:text-black md:border-none md:p-0">Tienda</Link>
                </li>
                
            </ul>
        </header>
        </>
    )
}
