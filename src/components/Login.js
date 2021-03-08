import React, {useState} from 'react'
import axios from 'axios'

export default function Login() {

    const [newLogin, setNewLogin] = useState({
        email:"",
        password:""
    })

    const handleChange= (e) =>{
        e.preventDefault()
        setNewLogin({
            ...newLogin,
            [e.target.name]: e.target.value
        })
        console.log(newLogin)
        
    }

    const sendLogin= async() => {  
        const postLogin= await axios.post("http://localhost:3001/login", newLogin)
        setNewLogin({
            ...newLogin,
            email:"",
            password:""
        })
    }

    return (
        <>
            <div class="flex items-center min-h-screen bg-white dark:bg-gray-900">   
                <div class="container mx-auto">
                     <div class="max-w-md mx-auto my-10">
                         <div class="text-center">
                            <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
                            <p class="text-gray-500 dark:text-gray-400">Accede a tu cuenta</p>
                         </div>
                         
                         <div className="m-7">            
                            <form onSubmit= {() => sendLogin()}>
                                <div class="mb-6">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email:</label>
                                <input type="email" name="email" placeholder="nombre@email.com" onChange={(e)=> handleChange(e)} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/>
                                </div>

                                <div class="mb-6">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Contraseña:</label>
                                <input type="password" name="password" placeholder="****" onChange={(e)=> handleChange(e)} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/> 
                                </div>

                                <div class="mb-6">
                                <button type="submit" className="w-full px-3 py-4 text-white bg-blue-600 rounded-md focus:bg-indigo-600 focus:outline-none">Iniciar Sesión</button>
                                </div>
                            </form>
                        </div>    

                    </div>
                </div>
            </div>
            
        </>
    )
}
