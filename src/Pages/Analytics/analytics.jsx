import React, {useState, useEffect} from "react";
import './analytics.css';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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
    const [campusData, setCampusData] = useState(null)
    const [natureData, setNatureData] = useState(null)
    const [maritalData, setMaritalData] = useState(null)
    const [salaryData, setSalaryData] = useState(null)
    const [qualificationData, setQualificationData] = useState(null)
    const [post_designation, setPostDesignation] = useState(null)
    const [other, setOthers] = useState("Gender")
    const [phdData, setPhdData] = useState(null)

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

    const others = [
        {name: "Campus", value: ["Akoka", "Idi araba", "Main Campus"]},
        {name: "Qualification", value: ['BPharma', 'BSc', 'PHD']},
        {name: "PHD", value: [true, false]},
        {name: "Nature", value: ['Permanent', 'Temporary', 'Full-Time', 'Part-Time']},
        {name: "Marital Status", value: ['Single', 'Married', 'Complicated']},
        {name: 'Age', value: 'age'},
        {name: "Gender", value: "gender"},
        {name: "Category", value: "category"},
        {name: "Salary Structure", value: ["CONUASS", "CONTISS"]},
        {name: "Post/Designation", value: ["Lecturer 1", "Lecturer 2", "Professor", "Graduate Assistant", "Librarian 1", "Librarian 2", "Assistant Lecturer", "Associate Professor", "Senior Lecturer", "Administrative Staff", "Technical Staff", "Junior Staff"]}
    ]

    const generateChartData = ()=>{
        if(currentFaculty === "All"){
            generateGenderData(Lecturers)
            generateCategoryData(Lecturers)
            generateAgeData(Lecturers)
            generateCampusData(Lecturers)
            generateNatureData(Lecturers)
            generateMaritalData(Lecturers)
            geneerateSalarayData(Lecturers)
            generateQualificationData(Lecturers)
            generatePhdData(Lecturers)
            generateDesignationData(Lecturers)
        }
        else{
            if(currentDepartment === "All"){
                let newData = Lecturers.filter((lecturer)=>{ return lecturer.faculty === currentFaculty})
                generateGenderData(newData)
                generateCategoryData(newData)
                generateAgeData(newData)
                generateCampusData(newData)
                generateNatureData(newData)
                generateMaritalData(newData)
                geneerateSalarayData(newData)
                generateQualificationData(newData)
                generatePhdData(newData)
                generateDesignationData(newData)
            }
            else{
                let newData = Lecturers.filter((lecturer)=>{ return lecturer.faculty === currentFaculty && lecturer.department === currentDepartment})
                generateGenderData(newData)
                generateCategoryData(newData)
                generateAgeData(newData)
                generateCampusData(newData)
                generateNatureData(newData)
                generateMaritalData(newData)
                geneerateSalarayData(newData)
                generateQualificationData(newData)
                generatePhdData(newData)
                generateDesignationData(newData)
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

    const generateCampusData = (Data) =>{
        let akoks = Data.filter((el)=>{return el.campus.toLowerCase() === "akoka" });
        let idibs = Data.filter((el)=>{return el.campus.toLowerCase() === "idi araba" });
        let mains = Data.filter((el)=>{return el.campus.toLowerCase() === "main campus" });
        setCampusData([
            {
                name: "Akoka", value : akoks.length,
                name: "Idi Araba", value : idibs.length,
                name: "Main Campus", value: mains.length
            }
        ])
    }

    const generateNatureData = (Data)=>{
        const natureValues = others[3].value;
        let data = []
        for(let i = 0; i < natureValues.length; i++){
            let placeholder = Data.filter((el)=>{return el.nature.toLowerCase() === natureValues[i].toLocaleLowerCase()});
            let placeholderData = {
                name: natureValues[i], value: placeholder.length
            }
            data.push(placeholderData)
        }
        setNatureData(data)
    }

    const generateMaritalData = (Data)=>{
        const dataValues = others[4].value;
        let data = []
        for(let i = 0; i < dataValues.length; i++){
            let placeholder = Data.filter((el)=>{return el.marital_status.toLowerCase() === dataValues[i].toLocaleLowerCase()});
            let placeholderData = {
                name: dataValues[i], value: placeholder.length
            }
            data.push(placeholderData)
        }
        setMaritalData(data)
    }

    const geneerateSalarayData = (Data)=>{
        const dataValues = others[8].value;
        let data = []
        for(let i = 0; i < dataValues.length; i++){
            let placeholder = Data.filter((el)=>{return el.salary_structure.toLowerCase() === dataValues[i].toLocaleLowerCase()});
            let placeholderData = {
                name: dataValues[i], value: placeholder.length
            }
            data.push(placeholderData)
        }
        setSalaryData(data)
    }

    const generateQualificationData = (Data) =>{
        const dataValues = others[1].value;
        let data = []
        for(let i = 0; i < dataValues.length; i++){
            let placeholder = Data.filter((el)=>{return el.qualification.toLowerCase() === dataValues[i].toLocaleLowerCase()});
            let placeholderData = {
                name: dataValues[i], value: placeholder.length
            }
            data.push(placeholderData)
        }
        setQualificationData(data)
    }

    const generateDesignationData = (Data) =>{
        const dataValues = others[9].value;
        let data = []
        for(let i = 0; i < dataValues.length; i++){
            let placeholder = Data.filter((el)=>{return el.post_designation.toLowerCase() === dataValues[i].toLocaleLowerCase()});
            let placeholderData = {
                name: dataValues[i], value: placeholder.length
            }
            data.push(placeholderData)
        }
        setPostDesignation(data)
    }

    const generatePhdData = (Data) =>{
        const dataValues = others[2].value;
        let data = []
        for(let i = 0; i < dataValues.length; i++){
            let placeholder = Data.filter((el)=>{return el.phd === dataValues[i]});
            let placeholderData = {
                name: dataValues[i].toString(), value: placeholder.length
            }
            data.push(placeholderData)
        }
        setPhdData(data)
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

    const handleOthersChange = (values)=>{
        setOthers(values[0].name)
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
                <div className="dropdown">
                    <p>Categories</p>
                    <Select
                        options={others}
                        labelField="name"
                        valueField="value"
                        onChange={(values) => handleOthersChange(values)}
                        defaultInputValue={others[6]}
                    />
                </div>
            </div>
            <div className="analytics_container">
                <div className={other === "Gender" ? "show_analytics analytics_charts" : "analytics_charts"}>
                    <p>Gender Distribution</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={600} height={600}>
                            <Pie data={genderData} dataKey="value" cx="50%" cy="50%" outerRadius={150} fill="#344BFD"/>
                            <Pie data={genderData} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#F4A79D" label = {renderLabel} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className={other === "Category" ? "show_analytics analytics_charts" : "analytics_charts"}>
                    <p>Staff Category Distribution</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={600} height={600}>
                            <Pie data={category} dataKey="value" cx="50%" cy="50%" outerRadius={150} fill="#344BFD"/>
                            <Pie data={category} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#F4A79D" label = {renderLabel} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className={other === "Age" ? "show_analytics analytics_charts" : "analytics_charts"}>
                    <p>Age Distribution</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                        width={500}
                        height={300}
                        data={ageData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20}
                        >
                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className={other === "Marital Status" ? "show_analytics analytics_charts" : "analytics_charts"}>
                    <p>Marital Distribution</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                        width={500}
                        height={300}
                        data={maritalData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20}
                        >
                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className={other === "Qualification" ? "show_analytics analytics_charts" : "analytics_charts"}>
                    <p>Qualification Distribution</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                        width={500}
                        height={300}
                        data={qualificationData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20}
                        >
                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className={other === "Nature" ? "show_analytics analytics_charts" : "analytics_charts"}>
                    <p>Job Nature Distribution</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={600} height={600}>
                            <Pie data={natureData} dataKey="value" cx="50%" cy="50%" outerRadius={150} fill="#344BFD"/>
                            <Pie data={natureData} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#F4A79D" label = {renderLabel} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className={other === "Campus" ? "show_analytics analytics_charts" : "analytics_charts"}>
                    <p>Campus Distribution</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={600} height={600}>
                            <Pie data={campusData} dataKey="value" cx="50%" cy="50%" outerRadius={150} fill="#344BFD"/>
                            <Pie data={campusData} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#F4A79D" label = {renderLabel} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className={other === "PHD" ? "show_analytics analytics_charts" : "analytics_charts"}>
                    <p>PHD Distribution</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                        width={500}
                        height={300}
                        data={phdData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20}
                        >
                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className={other === "Post/Designation" ? "show_analytics post_analytics" : "post_analytics"}>
                    <p>Designation Distribution</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                        width={800}
                        height={300}
                        data={post_designation}
                        margin={{
                            top: 5,
                            right: 20,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={10}
                        >
                        <XAxis dataKey="name" scale="point" padding={{ left: 5, right: 5 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className={other === "Salary Structure" ? "show_analytics analytics_charts" : "analytics_charts"}>
                    <p>Salary Structure Distribution</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={600} height={600}>
                            <Pie data={salaryData} dataKey="value" cx="50%" cy="50%" outerRadius={150} fill="#344BFD"/>
                            <Pie data={salaryData} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#F4A79D" label = {renderLabel} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Analytics