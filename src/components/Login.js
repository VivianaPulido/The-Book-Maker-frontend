import React, { useState, useContext, useEffect } from 'react'
//import axios from 'axios'


import AlertaContext from '../context/alertas/AlertaContext'
import AuthContext from '../context/autenticacion/AuthContext'


export default function Login(props) {

     // Extraer los valores del context
     const alertaContext = useContext(AlertaContext)
     const { alerta, mostrarAlerta } = alertaContext
 
     const authContext = useContext(AuthContext)
     const { mensaje, autenticado, iniciarSesion } = authContext;
 
     useEffect(() => {
         if(autenticado){
             props.history.push('/calculadora')
         }
 
         if(mensaje){
             mostrarAlerta(mensaje.msg, mensaje.categoria)
         }
 
     }, [mensaje, autenticado, props.history])
 
 
     // State para iniciar sesión
     const [usuario, guardarUsuario] = useState({
         email: "",
         password: ""
     })
 
     // Extraer de usuario
     const { email, password } = usuario
 
     const onChange = (e) => {
         guardarUsuario({
             ...usuario,
             [e.target.name]: e.target.value
         })
     }
 
     // Cuando el usuario quiera iniciar sesión
 
     const onSubmit = e => {
         e.preventDefault()
         
         //validar que no haya campos vacios
         if(email.trim() === "" || password.trim() === ""){
             return mostrarAlerta("Todos los campos son obligatorios", "alerta-error")
         }
 
         // pasarlo al action
 
         iniciarSesion({email, password})
 
     }

    return (
        <>
            {alerta ?  
                (
                    <div className={`alerta ${alerta.categoria}`}>
                        {alerta.msg}
                    </div>
                )
            : null}

            <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">   
                <div className="container mx-auto">
                     <div className="max-w-md mx-auto my-10">
                         <div className="text-center">
                            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
                            <p className="text-gray-500 dark:text-gray-400">Accede a tu cuenta</p>
                         </div>
                         
                         <div className="m-7">            
                            <form onSubmit={onSubmit}>
                                <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email:</label>
                                <input onChange={onChange} type="email" id="email" name="email" value={email} placeholder="nombre@email.com" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/>
                                </div>

                                <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Contraseña:</label>
                                <input onChange={onChange} type="password" id="password" name="password" value={password} placeholder="****" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/> 
                                </div>

                                <div className="mb-6">
                                <button type="submit" className="w-full px-3 py-4 text-white bg-blue-600 rounded-md focus:bg-blue-500 focus:outline-none">Iniciar Sesión</button>
                                </div>
                            </form>
                        </div>    

                    </div>
                </div>
            </div>
            
        </>
    )
}
