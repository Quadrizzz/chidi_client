import React, {useState, useEffect} from "react";
import './analytics.css';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import Select from "react-dropdown-select";

const Analytics = ()=>{

    const [Lecturers, setLecturers] = useState([]);
    const [Academic, setAcademic] = useState([])
    const [NonAcademic, setNonAcademic] = useState([])
    const [Faculty, setFaculty] = useState([{name: "All", departments: ["All"]}]);
    const [Departments, setDepartments] = useState([{name : 'All', value: 'All'}]);
    const [currentFaculty, setCurrentFaculty] = useState("All");
    const [currentDepartment, setCurrentDepartment] = useState("All");
    const [genderData, setGenderData] = useState(null)
    const [category, setCategoryData] = useState(null)
    const [ageData, setAgeData] = useState(null)

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

            const Faculties = await Promise.resolve(fetch("http://localhost:3000/api/faculty/all"))
            const FacultyJson =  await Promise.resolve(Faculties.json());
            setFaculty([...Faculty, ...FacultyJson]);
        }
        fetchData();
    },[])

    useEffect(()=>{
        if(Faculty.length > 1){
            generateChartData()
        }
    }, [Faculty, Departments, currentDepartment, currentFaculty])

    const generateChartData = ()=>{
        if(currentFaculty === "All"){
            generateGenderData(Lecturers)
            generateCategoryData(Lecturers)
            generateAgeData(Lecturers)
        }
        else{
            if(currentDepartment === "All"){
                let newData = Lecturers.filter((lecturer)=>{ return lecturer.faculty === currentFaculty})
                generateGenderData(newData)
                generateCategoryData(newData)
                generateAgeData(newData)
            }
            else{
                let newData = Lecturers.filter((lecturer)=>{ return lecturer.faculty === currentFaculty && lecturer.department === currentDepartment})
                generateGenderData(newData)
                generateCategoryData(newData)
                generateAgeData(newData)
                console.log(newData)
            }
        }
    }

    const generateGenderData = (Data)=>{
        let maleCount = 0;
        let femaleCount = 0;

       let data =  Data.forEach((lecturer) => {
            if (lecturer.gender === "Male") {
                maleCount++;
            } else if (lecturer.gender === "Female") {
                femaleCount++;
            } else {
                // Randomly assign gender if not specified
                if (Math.random() < 0.5) {
                    maleCount++;
                } else {
                    femaleCount++;
                }
            }
        });
        setGenderData([
            { name: "Male", value: maleCount },
            { name: "Female", value: femaleCount }
          ]
        );
    }

    const generateCategoryData = (Data) =>{
        if(currentFaculty === "All"){
            setCategoryData([
                {name: "Academic", value : Academic.length},
                {name: "Non-Academic", value : NonAcademic.length}
            ])
        }
        else{
            let aca = Data.filter((el)=>{return el.category === "Academic"})
            let nonAca = Data.filter((el)=>{return el.category === "Non-Academic"})
            setCategoryData([
                {name: "Academic", value : aca.length},
                {name: "Non-Academic", value : nonAca.length}
            ])
        }
    }

    const generateAgeData = (Data) =>{

        const ageGroups = [
            { name: "20-29", min: 20, max: 29, value: 0 },
            { name: "30-39", min: 30, max: 39, value: 0 },
            { name: "40-49", min: 40, max: 49, value: 0 },
            { name: "50-59", min: 50, max: 59, value: 0 },
            { name: "60+", min: 60, max: Infinity, value: 0 }
        ];

        Data.forEach(lecturer => {
            const age = lecturer.present_age;
            ageGroups.forEach(group => {
              if (age >= group.min && age <= group.max) {
                group.value += 1;
              }
            });
        });

        setAgeData(ageGroups)
          
    }

    let renderLabel = function(entry) {
        return `( ${entry.name} ) ${entry.value}`;
    }

    const handleFacultyChange = (values)=>{
        setCurrentFaculty(values[0].name)
        setCurrentDepartment("All")
        let department = [{name : 'All', value: 'All'}]
        for(let i = 0; i < values[0].departments.length; i++){
            let data = {
                name: values[0].departments[i],
                value: values[0].departments[i]
            }
            department.push(data)
        }
        setDepartments(department)
    }

    const handleDepartmentChange = (values)=>{
        setCurrentDepartment(values[0].name)
    }

    return(
        <div className="analytics">
            <div className="analytics_top">
                <h1>Analytics</h1>
                <p>Total Number Of Staff: {Lecturers.length}</p>
            </div>
            <div className="dropdowns">
                <div className="dropdown">
                    <p>Faculties</p>
                    <Select
                        options={Faculty}
                        labelField="name"
                        valueField="name"
                        onChange={(values) => handleFacultyChange(values)}
                    />
                </div>
                <div className="dropdown">
                    <p>Departments</p>
                    <Select
                        options={Departments}
                        labelField="name"
                        valueField="value"
                        onChange={(values) => handleDepartmentChange(values)}
                    />
                </div>
            </div>
            <div className="analytics_container">
                <div className="analytics_charts">
                    <p>Gender Distribution</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={600} height={600}>
                            <Pie data={genderData} dataKey="value" cx="50%" cy="50%" outerRadius={150} fill="#344BFD"/>
                            <Pie data={genderData} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#F4A79D" label = {renderLabel} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="analytics_charts">
                    <p>Staff Category Distribution</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={600} height={600}>
                            <Pie data={category} dataKey="value" cx="50%" cy="50%" outerRadius={150} fill="#344BFD"/>
                            <Pie data={category} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#F4A79D" label = {renderLabel} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="analytics_charts">
                    <p>Age Distribution</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={600} height={600}>
                            <Pie data={ageData} dataKey="value" cx="50%" cy="50%" outerRadius={150} fill="#344BFD"/>
                            <Pie data={ageData} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#F4A79D" label = {renderLabel} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Analytics