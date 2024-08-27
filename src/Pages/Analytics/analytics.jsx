import React, {useState, useEffect} from "react";
import './analytics.css'

const Analytics = ()=>{

    const [Lecturers, setLecturers] = useState([]);
    const [Academic, setAcademic] = useState([])
    const [NonAcademic, setNonAcademic] = useState([])

    useEffect(()=>{
        const fetchData = async ()=>{
            const Lectuers = await Promise.resolve(fetch("http://localhost:3000/api/staff"));
            const LecturersJson = await Promise.resolve(Lectuers.json());
            setLecturers(LecturersJson);
            const Academic = LecturersJson.filter((el)=>{
                return el.category === "Academic"
            })
            const NonAcademic = LecturersJson.filter((el)=>{
                return el.category === "Non-Academic"
            })
            setNonAcademic(NonAcademic)
            setAcademic(Academic)
        }
        fetchData();
    },[])


    return(
        <div className="analytics">
            <div className="analytics_top">
                <h1>Analytics</h1>
                <p>Total Number Of Staff: {Lecturers.length}</p>
            </div>
        </div>
    )
}

export default Analytics