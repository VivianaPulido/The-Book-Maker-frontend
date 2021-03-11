import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Edición() {

     //Estado del libro que intento editar
     const [book, setBook] = useState({ //
        typeOfProd: "Book",
        size: "",
        words: "",
        pages: "",
        color: "",
        paper: "",
        binding: "",
        cover: "",
        soporte: "",
        price: "",
        title: "", 
        filePath: "",
        coverImgPath: "",
    
    })

    //traer los datos del libro especifico que quiero editar

    const service = axios.create({
        baseURL: "http://localhost:3001",
        withCredentials: true,
      });

      const { id } = useParams()


    useEffect(async() => {
        const token= localStorage.getItem("token")
        const respuesta= await service.get(`/detalles/${id}`, {headers:{'x-auth-token': token}})
        console.log(respuesta)
        console.log(respuesta.data)

        setBook({
            size: respuesta.data.libro.size,
            words: respuesta.data.libro.words,
            pages: respuesta.data.libro.pages,
            color: respuesta.data.libro.color,
            paper: respuesta.data.libro.paper,
            binding: respuesta.data.libro.binding,
            cover: respuesta.data.libro.cover,
            soporte: respuesta.data.libro.soporte,
            price: respuesta.data.libro.price,
            title: respuesta.data.libro.title, 
            filePath: respuesta.data.libro.filePath,
            coverImgPath: respuesta.data.libro.coverImg,
        })
    }, [])


     //Estado para manejar los archivos de cloudinary    
     const [coverImg, setCoverImg] = useState()
     const [file, setFile] = useState()

    function handleChange(event){
        setBook({
            ...book,
            [event.target.name]: event.target.value
        })
    }
    
    //funciones para manejar los inputs de cloudinary
    function handleCoverImg(event){
        console.log(event.target.files[0])
        setCoverImg(
            event.target.files[0]
        )    
    }

    function handleFile(event){
        console.log(event.target.files[0])
        setFile(
            event.target.files[0]
        )    
    }

    //funcion para subir los archivos a cloudinary y obtener urls y etear estado
    async function urlCloudinary (e){
        e.preventDefault()
        const data= new FormData()
        data.append("file", coverImg)
        data.append("upload_preset", "book-maker")
        data.append("cloud_name", "dd4wq0tnf")

        const dataFile= new FormData()
        dataFile.append("file", file)
        dataFile.append("upload_preset", "book-maker")
        dataFile.append("cloud_name", "dd4wq0tnf")
        const respuesta= await axios.post('https://api.cloudinary.com/v1_1/dd4wq0tnf/image/upload', data)
        const respuesta1= await axios.post('https://api.cloudinary.com/v1_1/dd4wq0tnf/image/upload', dataFile) 
        
        setBook({
            ...book,
            coverImgPath: respuesta.data.url,
            filePath: respuesta1.data.url
        })
    }


    //funcion para calcular el precio
    function calculatePrice(book, e){
        e.preventDefault()
        let wordsPerPage
        let pricePerPage
        let soportePrice
        let coverPrice = 15
        let bindingPrice   
        //el pricePerPage está ahorita basado en el precio de b/n... hay que hacer un switch o algo para incluir las variables de precio por color  
        book.size === "pocket" || book.size === "travel" ? wordsPerPage= 300 : book.size === "standard" ? wordsPerPage= 403 : wordsPerPage= 495
        book.size === "pocket" ? pricePerPage= 1.50 : book.size === "travel" ? pricePerPage= 2 : book.size === "standard" ? pricePerPage= 2 : pricePerPage= 2.50
        book.soporte === "rigido" ? soportePrice= 25 : soportePrice= 20 
        book.binding === "hotmelt" ? bindingPrice= 50 : book.binding === "engrapado" ? bindingPrice= 15 : book.binding === "engargoladoMetal" ? bindingPrice= 25 : bindingPrice= 25

        const pages= Math.round(book.words/ wordsPerPage)
        const price= (book.words / wordsPerPage * pricePerPage + coverPrice + soportePrice + bindingPrice).toFixed(2)

        setBook({
            ...book,
            pages: pages,
            price: price
        })

        return false
    }

//funcion para hacer la edicion del libro    
        const editBook = async (bookId) => {
            const token= localStorage.getItem("token")
            const res = await service.put(`http://localhost:3001/mis-obras/${bookId}`, book, {headers:{'x-auth-token': token}})
            const foundBook = await res.data.libros
        
            setBook({
                
            })
        }
       
    

    return (
        <>

<div className="mx-10">
                <h2 className="text-white text-xl my-5 bg-blue-600 p-2">Edita tu Libro</h2>

                <form onSubmit= {()=>(editBook(id))}>
                

                    <div className="items-center">
                        <label className="block m-2 text-base text-gray-600 dark:text-gray-400">Formato: </label>
                        <select name="size" onChange={(event)=> handleChange(event)} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500">
                            <option value="none" disabled hidden>Selecciona un formato</option>
                            <option value="Pocket" selected={book.size === "Pocket" ? "selected": null}>Pocket: 10.5x17 cm</option>
                            <option value="Travel">Travel: 14x21 cm</option>
                            <option value="Standard">Standard: 17x21 cm</option>
                            <option value="Workbook">Work-book: 19x23 cm</option>
                            <option value="Letter">Letter: 21.5x28 cm</option>
                        </select>
                    </div>

                    <lablel className="block m-2 text-base text-gray-600 dark:text-gray-400">Número de palabras en tu escrito:</lablel>
                    <input onChange={(event)=> handleChange(event)} type="number" min="0" value={book.words} name="words" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"></input>

                    <p className="block m-2 text-base text-gray-600 dark:text-gray-400">Color en  Interiores:</p>
                    <div className="flex">
                        <div className="flex items-center mx-2">
                            <input onChange={(event)=> handleChange(event)} checked={book.color==="Blanco y Negro" ? "checked": null} type="radio" name="color" value="Blanco y Negro"/>
                            <label className="block m-2 text-base dark:text-gray-400">Blanco y Negro</label>
                        </div>
                        <div className="flex items-center mx-2">
                            <input onChange={(event)=> handleChange(event)} type="radio" name="color" value="Fullcolor " checked={book.color==="Fullcolor" ? "checked": null}/>
                            <label className="block m-2 text-base dark:text-gray-400">Full Color</label>
                        </div>
                        <div className="flex items-center mx-2">
                            <input onChange={(event)=> handleChange(event)}type="radio" name="color" value="Mixto" checked={book.color==="Mixto" ? "checked": null}/>
                            <label className="block m-2 text-base dark:text-gray-400" >Mixto</label>
                        </div>
                    </div>

                    <p className="block m-2 text-base text-gray-600 dark:text-gray-400">Papel:</p>
                    <div className="flex">
                        <div className="flex items-center mx-2">
                            <input onChange={(event)=> handleChange(event)} type="radio" name="paper" value="Bond blanco 90 gr." checked={book.paper==="Bond blanco 90 gr." ? "checked": null}/>
                            <label className="block m-2 text-base dark:text-gray-400">Bond Blanco 90g</label>
                        </div>  
                        <div className="flex items-center mx-2"> 
                            <input onChange={(event)=> handleChange(event)} type="radio" name="paper" value="Bond color marfil 90 gr." checked={book.paper==="Bond color marfil 90 gr." ? "checked": null}/>
                            <label className="block m-2 text-base dark:text-gray-400">Bond Marfil 90gr</label>
                        </div> 
                    </div>

                    <p className="block m-2 text-base text-gray-600 dark:text-gray-400">Encuadernado</p>
                    <div className="flex">
                        <div className="flex items-center mx-2">
                            <input onChange={(event)=> handleChange(event)} type="radio" name="binding" value="Hotmelt" checked={book.binding==="Hotmelt" ? "checked": null}/>
                            <label className="block m-2 text-base dark:text-gray-400">Hotmelt (americano)</label>
                        </div>
                        <div className="flex items-center mx-2">
                            <input onChange={(event)=> handleChange(event)} type="radio" name="binding" value="Engrapado a lomo" checked={book.binding==="Engrapado a lomo" ? "checked": null}/>
                            <label className="block m-2 text-base dark:text-gray-400">Engrapado a lomo</label>
                        </div>
                        <div className="flex items-center mx-2">
                            <input onChange={(event)=> handleChange(event)} type="radio" name="binding" value="Engargolado metálico" checked={book.binding==="Engargolado metálico" ? "checked": null}/>
                            <label className="block m-2 text-base dark:text-gray-400">Engargolado Metálico</label>
                        </div>
                        <div className="flex items-center mx-2">
                            <input onChange={(event)=> handleChange(event)} type="radio" name="binding" value="Engargolado plástico" checked={book.binding==="Engargolado plástico" ? "checked": null}/>
                            <label className="block m-2 text-base dark:text-gray-400">Engargolado Plástico</label>
                        </div>
                    </div>

                    <p className="block m-2 text-base text-gray-600 dark:text-gray-400">Acabado de Portada</p>
                    <div className="flex">
                        <div className="flex items-center mx-2">
                            <input onChange={(event)=> handleChange(event)} type="radio" name="cover" value="Brillante" checked={book.cover==="Brillante" ? "checked": null}/>
                            <label className="block m-2 text-base dark:text-gray-400">Brillante</label>
                        </div>
                        <div className="flex items-center mx-2">
                            <input onChange={(event)=> handleChange(event)} type="radio" name="cover" value="Mate" checked={book.cover==="Mate" ? "checked": null}/>
                            <label className="block m-2 text-base dark:text-gray-400">Mate</label>
                        </div>
                        <div className="flex items-center mx-2">
                            <input onChange={(event)=> handleChange(event)} type="radio" name="soporte" value="Rigido" checked={book.soporte==="Rigido" ? "checked": null}/>
                            <label className="block m-2 text-base dark:text-gray-400">Portada rígida</label>
                        </div>
                        <div className="flex items-center mx-2">
                            <input onChange={(event)=> handleChange(event)} type="radio" name="soporte" value="Semirigido" checked={book.soporte==="Semirigido" ? "checked": null}/>
                            <label className="block m-2 text-base dark:text-gray-400">Portada semi-rígida</label>
                        </div>
                    </div>

                    <div className="flex items-center">   
                    <button onClick={(e)=>calculatePrice(book, e)} className=" mt-3 px-3 py-3 text-white bg-blue-600 rounded-md focus:bg-indigo-600 focus:outline-none">Calcular Precio</button>
                    <h3 className="mx-5 text-2xl">Precio por Ejemplar: ${book.price}</h3>
                    </div> 
                    
                    <p className="m-4">¿Necesitas cambiar tus archivos?</p>
                    <h2 className="text-white text-xl my-5 bg-blue-600 p-2">Paso 3: ¡Sube tus nuevos archivos y haz tu pedido ahora!</h2>

                    <label className="block m-2 text-base text-gray-600 dark:text-gray-400">Título de tu Libro:</label>
                    <input onChange={(event)=> handleChange(event)} type="text" name="title" value={book.title} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/>

                    <label>Sube el archivo de tu portada:</label>
                    <input  onChange={(event)=> handleCoverImg(event)} type="file" name="coverImgPath"/>

                    <label>Sube el archivo del texto original:</label>
                    <input onChange={(event)=> handleFile(event)} type="file" name="filePath"/>

                    <button type="submit">Editar</button>
                    
                </form>
                
            </div>
            
        </>
    )
}
