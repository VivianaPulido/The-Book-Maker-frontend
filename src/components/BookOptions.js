import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function BookOptions() {

    const [coverImg, setCoverImg] = useState()
    const [file, setFile] = useState()


    const [book, setBook] = useState({
        typeOfProd: "Book",
        size:"",
        words:"",
        pages:"",
        color:"",
        paper:"",
        binding:"",
        cover:"",
        soporte:"",
        price:"",
        title:"", 
        filePath:"",
        coverImgPath:"",
        author:""
    })

    function handleChange(event){
        setBook({
            ...book,
            [event.target.name]: event.target.value
        })
    }
    console.log(book)

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

    const service = axios.create({
        baseURL: "http://localhost:3001",
        withCredentials: true,
      });

    const sendNewBook= async(e) => {
        e.preventDefault()
        const token= localStorage.getItem("token")
        const uploadBook= await service.post("http://localhost:3001/crear-libro", book, {headers:{'x-auth-token': token}})
        //como los mando desde aqui a su perfil?? era con history no se que
        console.log(uploadBook)
    }


    return (
        <>
     
            <div className="mx-10">
                <h2 className="text-white text-xl my-5 bg-blue-500 p-2">Paso 2: Selecciona Opciones de Impresión para tu Libro</h2>

                <form onSubmit= {(event) => sendNewBook(event)}>

                    <div className="items-center contenerdorOpcionesA">
                        <label className="block mb-2 text-base text-gray-600 dark:text-gray-400">Formato: </label>
                        <select name="size" onChange={(event)=> handleChange(event)} className="w-full px-3 py-2 mb-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500">
                            <option value="Pocket">Selecciona un formato</option>
                            <option value="Pocket">Pocket: 10.5x17 cm</option>
                            <option value="Travel">Travel: 14x21 cm</option>
                            <option value="Standard">Standard: 17x21 cm</option>
                            <option value="Workbook">Work-book: 19x23 cm</option>
                            <option value="Letter">Letter: 21.5x28 cm</option>
                        </select>
                    </div>

                    <div className="contenerdorOpcionesB">
                        <lablel className="block mb-2 text-base text-gray-600 dark:text-gray-400 ">Número de palabras en tu escrito:</lablel>
                        <input onChange={(event)=> handleChange(event)} type="number" name="words" className="w-full px-3 py-2 mb-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"></input>
                    </div>

                    <div className="contenerdorOpcionesA">
                        <p className="block  text-base text-gray-600 dark:text-gray-400">Color en  Interiores:</p>
                        <div className="flex">
                            <div className="flex items-center mx-2">
                                <input onChange={(event)=> handleChange(event)} type="radio" name="color" value="Blanco y Negro"/>
                                <label className="block m-2 text-base dark:text-gray-400">Blanco y Negro</label>
                            </div>
                            <div className="flex items-center mx-2">
                                <input onChange={(event)=> handleChange(event)} type="radio" name="color" value="Fullcolor"/>
                                <label className="block m-2 text-base dark:text-gray-400">Full Color</label>
                            </div>
                            <div className="flex items-center mx-2">
                                <input onChange={(event)=> handleChange(event)}type="radio" name="color" value="Mixto"/>
                                <label className="block m-2 text-base dark:text-gray-400" >Mixto</label>
                            </div>
                        </div>
                    </div>

                    <div className="contenerdorOpcionesB">
                        <p className="block m-2 text-base text-gray-600 dark:text-gray-400">Papel:</p>
                        <div className="flex">
                            <div className="flex items-center mx-2">
                                <input onChange={(event)=> handleChange(event)} type="radio" name="paper" value="Bond blanco 90 gr."/>
                                <label className="block m-2 text-base dark:text-gray-400">Bond Blanco 90g</label>
                            </div>  
                            <div className="flex items-center mx-2"> 
                                <input onChange={(event)=> handleChange(event)} type="radio" name="paper" value="Bond color marfil 90 gr."/>
                                <label className="block m-2 text-base dark:text-gray-400">Bond Marfil 90gr</label>
                            </div> 
                        </div>
                    </div>

                    <div className="contenerdorOpcionesA">
                        <p className="block m-2 text-base text-gray-600 dark:text-gray-400">Encuadernado</p>
                        <div className="flex">
                            <div className="flex items-center mx-2">
                                <input onChange={(event)=> handleChange(event)} type="radio" name="binding" value="Hotmelt"/>
                                <label className="block m-2 text-base dark:text-gray-400">Hotmelt (americano)</label>
                            </div>
                            <div className="flex items-center mx-2">
                                <input onChange={(event)=> handleChange(event)} type="radio" name="binding" value="Engrapado a lomo"/>
                                <label className="block m-2 text-base dark:text-gray-400">Engrapado a lomo</label>
                            </div>
                            <div className="flex items-center mx-2">
                                <input onChange={(event)=> handleChange(event)} type="radio" name="binding" value="Engargolado metálico"/>
                                <label className="block m-2 text-base dark:text-gray-400">Engargolado Metálico</label>
                            </div>
                            <div className="flex items-center mx-2">
                                <input onChange={(event)=> handleChange(event)} type="radio" name="binding" value="Engargolado plástico"/>
                                <label className="block m-2 text-base dark:text-gray-400">Engargolado Plástico</label>
                            </div>
                        </div>
                    </div>

                    <div className="contenerdorOpcionesB">
                        <p className="block m-2 text-base text-gray-600 dark:text-gray-400">Acabado de Portada</p>
                        <div className="flex">
                            <div className="flex items-center mx-2">
                                <input onChange={(event)=> handleChange(event)} type="radio" name="cover" value="Brillante"/>
                                <label className="block m-2 text-base dark:text-gray-400">Brillante</label>
                            </div>
                            <div className="flex items-center mx-2">
                                <input onChange={(event)=> handleChange(event)} type="radio" name="cover" value="Mate"/>
                                <label className="block m-2 text-base dark:text-gray-400">Mate</label>
                            </div>
                            <div className="flex items-center mx-2">
                                <input onChange={(event)=> handleChange(event)} type="radio" name="soporte" value="Rigido"/>
                                <label className="block m-2 text-base dark:text-gray-400">Portada rígida</label>
                            </div>
                            <div className="flex items-center mx-2">
                                <input onChange={(event)=> handleChange(event)} type="radio" name="soporte" value="Semirigido"/>
                                <label className="block m-2 text-base dark:text-gray-400">Portada semi-rígida</label>
                            </div>
                        </div>
                    </div>

                    <div className="items-center">   
                    <button onClick={(e)=>calculatePrice(book, e)} className=" mt-3 mb-2 px-3 py-3 text-white bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none">Calcular Precio</button>
                    <h3 className="mt-2 text-2xl text-white bg-green-400 py-3 px-2">Precio por Ejemplar: ${book.price}</h3>
                    </div> 
                    
                    <h2 className="text-white text-xl my-5 bg-blue-500 p-2">Paso 3: ¿Te convence? ¡Sube tus archivos y haz tu pedido ahora!</h2>

                    <div className="contenerdorOpcionesB">
                        <label className="block mb-2 text-base text-gray-600 dark:text-gray-400">Título de tu Libro:</label>
                        <input onChange={(event)=> handleChange(event)} type="text" name="title" className="w-full px-3 py-2 mb-4 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/>

                        <label className="block text-base text-gray-600 dark:text-gray-400">Sube el archivo de tu portada:</label>
                        <input  onChange={(event)=> handleCoverImg(event)} type="file" name="coverImgPath" className="custom-file-input mb-4 mt-2"/><br/>

                        <label className="block text-base text-gray-600 dark:text-gray-400">Sube el archivo del texto original:</label>
                        <input onChange={(event)=> handleFile(event)} type="file" name="filePath" className="custom-file-input mb-4 mt-2"/><br/>
                    </div>
                    {/* <button type="submit" onClick={ (e)=> urlCloudinary(e)}>Crear Libro</button> */}
                    <button type="submit" className=" mt-3 mb-5 px-3 py-3 text-white bg-green-400 rounded-md focus:bg-green-500 focus:outline-none">Crear Libro</button>
                    
                </form>
                
                {/* <p className="block mb-2 mt-4 text-base text-gray-600 dark:text-gray-400">Si crees que tu proyecto se sale de los estándares, contáctanos! Nuestro equipo multidisciplinario cuenta con profesionales que te pueden ayudar con corrección de estilo, retoque fotográfico, ilustración, diseño editorial, registro de propiedad intelectual y más. ¡Déjanos ayudarte a traer a la vida tu creación!</p>
                <button>Agenda una cita</button> */}
            </div>
           
        </>
    )
}
