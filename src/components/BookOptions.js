import React, {useState} from 'react'
import axios from 'axios'

export default function BookOptions() {

    const [book, setBook] = useState({
        size:"",
        words:"",
        color:"",
        paper:"",
        binding:"",
        cover:"",
        soporte:"",
        price:"",
        title:"",
        // fileName:"", //creo que se setea en el back
        filePath:"",
        //coverImgName:"", //creo que se setea en el back
        coverImgPath:"",
        synopsis:""
    })

    function handleChange(event){
        setBook({
            ...book,
            [event.target.name]: event.target.value
        })
    }
    console.log(book)

   
    function calculatePrice(book){
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

        const price= book.words / wordsPerPage * pricePerPage + coverPrice + soportePrice + bindingPrice

        // setBook({
        //     ...book,
        //     price: price
        // })

        return price
    }

    const sendNewBook= async() => {
        const uploadBook= await axios.post("http://localhost:3001/crear-libro", book)
        //desde aqui los mando a su perfil o desde el back?
        
        
    }

    return (
        <>
            <div class="mx-10">
                <h2 class="text-white text-xl my-5 bg-blue-600 p-2">Paso 2: Selecciona Opciones de Impresión para tu Libro</h2>

                <form onSubmit= {() => sendNewBook()}>

                    <div class="flex p-2">
                        <label>Tamaño: </label>
                        <select name="size" onChange={(event)=> handleChange(event)}>
                            <option value="pocket">Pocket: 10.5x17 cm</option>
                            <option value="travel">Travel: 14x21 cm</option>
                            <option value="standard">Standard: 17x21 cm</option>
                            <option value="workbook">Work-book: 19x23 cm</option>
                            <option value="letter">Letter: 21.5x28 cm</option>
                        </select>
                    </div>

                    <lablel>Número de palabras en tu escrito</lablel>
                    <input onChange={(event)=> handleChange(event)} type="number" name="words"></input>

                    <p>Color en  Interiores</p>
                    <label>Blanco y Negro</label>
                    <input onChange={(event)=> handleChange(event)} type="radio" name="color" value="byn"/>
                    <label>Full Color</label>
                    <input onChange={(event)=> handleChange(event)} type="radio" name="color" value="fullcolor"/>
                    <label>Mixto</label>
                    <input onChange={(event)=> handleChange(event)}type="radio" name="color" value="mixto"/>

                    <p>Papel</p>
                    <label>Bond Blanco 90g</label>
                    <input onChange={(event)=> handleChange(event)} type="radio" name="paper" value="bondblanco"/>
                    <label>Bond Marfil 90gr</label>
                    <input onChange={(event)=> handleChange(event)} type="radio" name="paper" value="bondmarfil"/>

                    <p>Encuadernado</p>
                    <label>Hotmelt (americano)</label>
                    <input onChange={(event)=> handleChange(event)} type="radio" name="binding" value="hotmelt"/>
                    <label>Engrapado a lomo</label>
                    <input onChange={(event)=> handleChange(event)} type="radio" name="binding" value="engrapado"/>
                    <label>Engargolado Metálico</label>
                    <input onChange={(event)=> handleChange(event)} type="radio" name="binding" value="engargoladoMetal"/>
                    <label>Engargolado Plástico</label>
                    <input onChange={(event)=> handleChange(event)} type="radio" name="binding" value="engargoladoPlastico"/>

                    <p>Acabado de Portada</p>
                    <label>Brillante</label>
                    <input onChange={(event)=> handleChange(event)} type="radio" name="cover" value="brillante"/>
                    <label>Mate</label>
                    <input onChange={(event)=> handleChange(event)} type="radio" name="cover" value="mate"/>
                    <label>Portada rígida</label>
                    <input onChange={(event)=> handleChange(event)} type="radio" name="soporte" value="rigida"/>
                    <label>Portada semi-rígida</label>
                    <input onChange={(event)=> handleChange(event)} type="radio" name="soporte" value="semirigida"/>

                    <h3>Costo por ejemplar: ${calculatePrice(book)}.00</h3>
                    {/* <button onClick={calculatePrice(book)}>Calcular</button>
                    <h3>Costo por ejemplar: ${book.price}.00</h3> */}
                    
                    <p>¿Te convence? ¡Sube tus archivos y haz tu pedido ahora!</p>

                    <label>Título de tu Libro:</label>
                    <input onChange={(event)=> handleChange(event)} type="text" name="title"/>

                    <label>Sube el archivo de tu portada:</label>
                    <input onChange={(event)=> handleChange(event)} type="file" name="coverImgPath"/>

                    <label>Sube el archivo del texto original:</label>
                    <input onChange={(event)=> handleChange(event)} type="file" name="filePath"/>

                    <label>Sinopsis:</label>
                    <textarea onChange={(event)=> handleChange(event)} type="text" name="synopsis"></textarea>

                    <button type="submit">Crear Libro</button>
                    
                </form>

                <p>Si crees que tu proyecto se sale de los estándares, contáctanos! Nuestro equipo multidisciplinario cuenta con profesionales que te pueden ayudar con corrección de estilo, retoque fotográfico, ilustración, diseño editorial, registro de propiedad intelectual y más. ¡Déjanos ayudarte a traer a la vida tu creación!</p>
                <button>Agenda una cita</button>
            </div>
        </>
    )
}
