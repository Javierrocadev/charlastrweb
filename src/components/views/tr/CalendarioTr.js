import { useEffect, useState } from "react"
import CalendarComponent from "../../ui/CalendarComponent"
import axiosApi from "../../../api/axiosApi";


const CalendarioTr = ()=>{

    const [charlasTrResponse, setCharlasTrResponse] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            try {

        const perfilResponse = await axiosApi.usuarios.getPerfilUsuario();
                console.log("perfil usuario response:", perfilResponse);
        
                const charlasTrResponse = await axiosApi.techriders.getcharlastechrider(perfilResponse.idUsuario);
                console.log("Charlas response:", charlasTrResponse);
                setCharlasTrResponse(charlasTrResponse);
            }
            catch(error){
                console.log(error)
            }
        } 
        fetchData()
    },[])

    return(
        <div>
          <CalendarComponent charlas={charlasTrResponse} />

        </div>
    )

} 
export default CalendarioTr