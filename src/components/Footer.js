import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
  } from 'react-router-dom'

export default function Footer() {
    return (
        <>
            <footer class="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4 bg-blue-600">
                <ul class="list-reset md:flex md:items-center">
                    
                    <li class="md:ml-4">
                    <a href="https://www.facebook.com/" class="border-t block no-underline hover:underline py-2 text-white hover:text-black md:border-none md:p-0">Facebook</a>
                    </li>

                    <li class="md:ml-4">
                    <a href="https://www.instagram.com/" class="border-t block no-underline hover:underline py-2 text-white hover:text-black md:border-none md:p-0">Instagram</a>
                    </li>

                    <li class="md:ml-4">
                    <Link to="/aviso-de-privacidad" class="border-t block no-underline hover:underline py-2 text-white hover:text-black md:border-none md:p-0">Aviso de Privacidad</Link>
                    </li>
 
                </ul>
            </footer>
        </>
    )
}
