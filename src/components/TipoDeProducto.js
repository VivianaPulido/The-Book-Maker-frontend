import React, {useState, useContext} from 'react'

import BookOptions from './BookOptions'
import MagazineOptions from './MagazineOptions'
import ComicOptions from './ComicOptions'
import bookImg from '../images/Captura de Pantalla 2021-03-07 a la(s) 14.39.26.png'
import magImg from '../images/Captura de Pantalla 2021-03-07 a la(s) 14.40.24.png'
import comicImg from '../images/Captura de Pantalla 2021-03-07 a la(s) 14.39.49.png'
import AuthContext from '../context/autenticacion/AuthContext'

//import uploadCloud from '../config/cloudinary'

export default function TipoDeProducto() {

    const authContext= useContext(AuthContext)
    const {usuario, usuarioAutenticado} = authContext

    const [typeOfProd, setTypeOfProd] = useState("book")
    

     function handleChange(event){
         setTypeOfProd(event.target.value)
     }

    //console.log(typeOfProd)

    function displayForm(form){
        if(form==="book"){
            return <div><BookOptions /></div>
        }else if(form==="magazine"){
            return <div><MagazineOptions /></div>
        }else{
            return <div><ComicOptions /></div>
        }
    }
    return (
        <>
        <div className="mx-10">
            <h2 className="text-white text-xl my-5 bg-blue-600 p-2">Paso 1: Selecciona el tipo de producto que quieres imprimir</h2>
            <form className= "flex">
            <div className="flex-auto contenerdorTipoProd">
                <img src={bookImg}/>
                <div className="flex items-center my-5" >  
                    <input onChange={(event)=> handleChange(event)} type="radio" name="typeOfProd" value="book"/> 
                    <p className="text-gray-600 mx-2 text-xl">Libro</p>  
                </div>
                <p className="text-gray-600">Con diferentes opciones para encuadernado, interiores y acabados. No importa si tu proyecto es una novela, un recetario, un manual o un libro de trabajo.</p> 
            </div>

            <div className="flex-auto contenerdorTipoProd">
                <img src={magImg}/>
                <div className="flex items-center my-5" >      
                    <input onChange={(event)=> handleChange(event)} type="radio" name="typeOfProd" value="magazine"/>
                    <p className="text-gray-600 mx-2 text-xl">Revista</p>   
                </div> 
                <p className="text-gray-600">Para publicaciones periódicas o esporádicas, es un formato muy versátil; puede ser una revista en forma, un panfleto de oración, una publicación informativa, en fin.</p>     
            </div>

            <div className="flex-auto contenerdorTipoProd">
                <img src={comicImg}/>
                <div className="flex items-center my-5" >
                    <input onChange={(event)=> handleChange(event)} type="radio" name="typeOfProd" value="comic"/>  
                    <p className="text-gray-600 mx-2 text-xl">Comic</p>
                </div> 
                <p className="text-gray-600">Para plasmar tus creaciones de comic, manga o novela visual, con gran calidad y variedad de formatos</p> 
            </div>
            </form>
        </div>
        {displayForm(typeOfProd)}
        </>
    )
}
