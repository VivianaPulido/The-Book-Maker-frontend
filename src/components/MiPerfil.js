import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Link
  } from 'react-router-dom'


export default function MiPerfil() {

    const [libros, setlibros] = useState([])

    const service = axios.create({
        baseURL: "https://the-book-maker.herokuapp.com",
        withCredentials: true,
      });

    useEffect(async() => {
        const token= localStorage.getItem("token")
        const respuesta= await service.get("/mis-obras", {headers:{'x-auth-token': token}})
        // console.log(respuesta)
        // console.log(respuesta.data)
        setlibros(respuesta.data.libros)
    }, [deleteBook])

   
    async function deleteBook(id) {
       const confirm= prompt('¿Seguro que quieres elimianr este proyecto?', 'default answer')
        const token= localStorage.getItem("token")
        const deleted= await service.delete(`/eliminar/${id}`, {headers:{'x-auth-token': token}})
        setlibros([])
    }
  
    

    return(
        <> 
            <div>
            <h2 className="m-10">Tus proyectos creados:</h2>

           {
            !libros ? (<p>Cargando</p>):(
                libros.map((e, id) => {
              return (
                <div key={id} className="contenerdorTipoProd m-10">
                    <h2 className="text-lg font-bold text-gray-600 mx-3.5">Título: {e.title}</h2>
                    <p className="text-base text-gray-600 mx-3.5">Formato: {e.size}</p>
                    <p className="text-base text-gray-600 mx-3.5">Palabras: {e.words}</p>
                    <p className="text-base text-gray-600 mx-3.5">Páginas: {e.pages}</p>
                    <p className="text-base text-gray-600 mx-3.5">Color en Interiores: {e.color}</p>
                    <p className="text-base text-gray-600 mx-3.5">Papel: {e.paper}</p>
                    <p className="text-base text-gray-600 mx-3.5">Encuadernado: {e.binding}</p>
                    <p className="text-base text-gray-600 mx-3.5">Acabado de Portada: {e.cover}</p>
                    <p className="text-base text-gray-600 mx-3.5">Archivo para portada: {e.coverImgPath}</p>
                    <p className="text-base text-gray-600 mx-3.5">Archivo de texto: {e.filePath}</p>
                    <p className="text-base text-gray-600 mx-3.5">Id: {e._id}</p>

                    <h2 className="text-base text-gray-600 font-bold mx-3.5">Precio por ejemplar: ${e.price}</h2>
                    
                    <div className="btns-mi-perfil mx-3.5">
                      <Link to={`/editar/${e._id}`} className="w-28 text-center mt-3 mb-2 px-4 py-4 text-white bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none">Editar</Link>
                      <button onClick={(evento) => deleteBook(e._id, evento)} className="w-28 text-center mt-3 mb-2 px-3 py-3 text-white bg-red-500 rounded-md focus:bg-red-600 focus:outline-none">Eliminar</button> 
                    </div>
                </div> 
               )
            })

            )   
      
          }
 
        </div>
            
        
        
        </>
    )
}

