
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import AlertaContext from '../context/alertas/AlertaContext'
import AuthContext from '../context/autenticacion/AuthContext'

export default function Signup(props) {
    //ASI ESTABA ANTES
    // const [infoSignup, setInfoSignup] = useState({
    //     username:"",
    //     email:"",
    //     password:""
    // })

    // const handleChange= (e) =>{
    //     e.preventDefault()
    //     setInfoSignup({
    //         ...infoSignup,
    //         [e.target.name]: e.target.value
    //     })
    //     console.log(infoSignup)
        
    // }

    // const sendNewUser= async() => {
    //     console.log(infoSignup)
    //     const uploadUser= await axios.post("http://localhost:3001/signup", infoSignup)

    //     setInfoSignup({
    //         ...infoSignup,
    //         username:"",
    //         email:"",
    //         password:""
    //     })
    // }

     // Extraer los valores del context
     const alertaContext = useContext(AlertaContext)
     const { alerta, mostrarAlerta } = alertaContext
 
     // State para iniciar sesión
     const [usuario, guardarUsuario] = useState({
         username: "",
         email: "",
         password: "",
         confirmar: ""
     })
 
     const authContext = useContext(AuthContext)
     const { mensaje, autenticado, registrarUsuario } = authContext;
 
     // En caso de que el usuario se haya autenticado o registrado. Un registro duplicado.
 
     useEffect(() => {
         if(autenticado){
             props.history.push('/calculadora')
         }
 
         if(mensaje){
             mostrarAlerta(mensaje.msg, mensaje.categoria)
         }
 
     }, [mensaje, autenticado, props.history])
 
 
 
     // Extraer de usuario
     const { username, email, password, confirmar } = usuario
 
     const onChange = (e) => {
         guardarUsuario({
             ...usuario,
             [e.target.name]: e.target.value
         })
     }
 
     // Cuando el usuario quiera iniciar sesión
 
     const onSubmit = e => {
         e.preventDefault()
         
         // Validar que no haya campos vacios
 
         if (
             username.trim() === "" || 
             email.trim() === "" ||
             password.trim() === "" || 
             confirmar.trim() === "" 
         ){
             mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
             return
         }
 
         // Password mínimo de 6 caracteres
         if(password.length < 6) {
             mostrarAlerta("El password debe ser de al menos 6 caracteres", "alerta-error")
             return
         }
 
         // Los dos passwords son iguales
         if(password !== confirmar){
             mostrarAlerta('Los passwords no coinciden')
             return
         }
 
         // pasarlo al action
         registrarUsuario({
             username,
             email, 
             password
         })
   }     


    return (
        <>
            {/* <div class="flex items-center min-h-screen bg-white dark:bg-gray-900">   
                <div class="container mx-auto">
                     <div class="max-w-md mx-auto my-10">
                         <div class="text-center">
                            <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Signup</h1>
                            <p class="text-gray-500 dark:text-gray-400">Crea una cuenta</p>
                         </div>

                         <div className="m-7">
                            <form onSubmit= {() => sendNewUser()}>
                                <div class="mb-6">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Nombre:</label>
                                <input type="text" name="username" placeholder="tu Nombre" onChange={(e)=> handleChange(e)} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/>
                                </div>

                                <div class="mb-6">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email:</label>
                                <input type="email" name="email" placeholder="nombre@email.com" onChange={(e)=> handleChange(e)} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/>
                                </div>

                                <div class="mb-6">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Contraseña:</label>
                                <input type="password" name="password" placeholder="****" onChange={(e)=> handleChange(e)} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/>
                                </div>

                                <div className="mb-6">  
                                <button type="submit" className="w-full px-3 py-4 text-white bg-blue-600 rounded-md focus:bg-indigo-600 focus:outline-none">Registrarse</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div> 
            </div>              */}


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
                            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Signup</h1>
                            <p className="text-gray-500 dark:text-gray-400">Crea una cuenta</p>
                         </div>

                         <div className="m-7">
                            <form onSubmit={onSubmit}>
                                <div className="mb-6">
                                <label htmlFor="username" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Nombre:</label>
                                <input type="text" id="username" name="username" placeholder="tu Nombre" value={username} onChange={onChange} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/>
                                </div>

                                <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email:</label>
                                <input type="email" id="email" name="email" placeholder="nombre@email.com" value={email} onChange={onChange} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/>
                                </div>

                                <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Contraseña:</label>
                                <input type="password" id="password" name="password" placeholder="****" onChange={onChange} value={password} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/>
                                </div>

                                <div className="mb-6">
                                <label htmlFor="confirmar" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Confirmación contraseña:</label>
                                <input type="password" id="confirmar" name="confirmar" placeholder="Repite tu contraseña" onChange={onChange} value={confirmar} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/>
                                </div>

                                <div className="mb-6">  
                                <button type="submit" className="w-full px-3 py-4 text-white bg-blue-600 rounded-md focus:bg-indigo-600 focus:outline-none">Registrarse</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div> 
            </div>             
        </>
    )
}
