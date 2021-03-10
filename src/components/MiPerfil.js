import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import { data } from 'autoprefixer';
import {
    BrowserRouter as Router,
    Link
  } from 'react-router-dom'


export default function MiPerfil() {

    const [libros, setlibros] = useState([])

    const service = axios.create({
        baseURL: "http://localhost:3001",
        withCredentials: true,
      });

    useEffect(async() => {
        const token= localStorage.getItem("token")
        const respuesta= await service.get("/mis-obras", {headers:{'x-auth-token': token}})
        console.log(respuesta)
        console.log(respuesta.data)
        setlibros(respuesta.data.libros)
    }, [deleteBook])

   
    async function deleteBook(id) {
       console.log(id)
        const token= localStorage.getItem("token")
        const deleted= await service.delete(`/eliminar/${id}`, {headers:{'x-auth-token': token}})
    }
  

    // const [price, setPrice] = useState(
    //     libros.data.price
    // )

    function calcPrecioFinal(e, event){
        
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
                    <h2 className="text-lg">Título: {e.title}</h2>
                    <p>Formato: {e.size}</p>
                    <p>Palabras: {e.words}</p>
                    <p>Páginas: {e.pages}</p>
                    <p>Color en Interiores: {e.color}</p>
                    <p>Papel: {e.paper}</p>
                    <p>Encuadernado: {e.binding}</p>
                    <p>Acabado de Portada: {e.cover}</p>
                    <p>Archivo para portada: {e.coverImgPath}</p>
                    <p>Archivo de texto: {e.filePath}</p>

                    <h2>Precio por ejemplar: {e.price}</h2>
                    <p>Id: {e._id}</p>
                    <Link to={`/mis-obras/${e._id}`}>Editar</Link>
                    <button onClick={(evento) => deleteBook(e._id, evento)}>Eliminar</button> 
                    <form>
                
                        <label>Ejemplares</label>
                        {/* <input onChange={(event) => calcPrecioFinal(e, event)} type="number" value="ejemplares"/> */}
                    </form>
                </div> 
               )
            })

            )   
      
          }
 
        </div>
            
        
        
        </>
    )
}

