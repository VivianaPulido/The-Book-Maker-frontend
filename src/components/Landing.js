import React from 'react'
// import {
//     type,
//     type as loop
// } from '@camwiegert/typical'
import ilust from '../images/Recurso 3.png'
import iconoLibro from '../images/Recurso 2-8.png'
import iconoDiseño from '../images/Recurso 1-8.png'
import iconoMaletin from '../images/Recurso 3-8.png'




export default function Landing() {
   
    

    return (
        <>
            <div className="landingHero">
                <div className="mt-20 mb-20 mx-10">
                    <h2 className="text-white text-4xl font-bold landingText">Imprime obras de tu autoría</h2>
                    <h1 className="text-yellow-300 text-7xl font-extrabold landingText">ON-DEMAND</h1>
                    <h2 className="text-white text-7xl font-bold landingText">Libros</h2>
                    <h2 className="text-white text-2xl font-bold landingText">Desde 1 ejemplar | Fácil | Rápido | A tu manera</h2>
                </div>
                <div>
                    <img src={ilust} className="mt-10 mb-10 mx-10"/>
                </div> 
            </div>

           <div className="landingFeatures">
               <div className="contenedorAmarillo">
                   <img src={iconoLibro} className="mb-5" alt="icono libro"/>
                   <p className="font-bold text-gray-600">Imprime tus obras <span>bajo demanda</span>.<br/>Desde un solo ejemplar.</p>
               </div>
               <div className="contenedorAmarillo">
                   <img src={iconoDiseño} className="mb-5" alt="icono diseño"/>
                   <p className="font-bold text-gray-600">Nuestro equipo puede aydarte con el diseño editorial, retoque fotográfico, ilustración, correción de estilo y más.</p>
               </div>
               <div className="contenedorAmarillo">
                   <img src={iconoMaletin} className="mb-5" alt="icono maletin"/>
                   <p className="font-bold text-gray-600">Tú concéntrate en crear, déjanos tramitar el ISR y la propiedad intelectual por ti.</p>
               </div>
           </div>

            
            
   
        </>
    )
}
