import React, {useState, useEffect} from "react";
import './addStaff.css';
import Select from "react-dropdown-select";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import PublitioAPI from "publitio_js_sdk";
import Loading from "../../assets/loading.gif"
import { useNavigate } from "react-router-dom";



const AddStaff = (props)=>{
    const [Faculty, setFaculty] = useState([]);
    const [Department, setDepartments] = useState([])
    const [country, setCountry] = useState("");
    const [state, setState] = useState("")
    const [resumeFile, setResume] = useState("")
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        ippis_no: '',
        staff_no: '',
        title: '',
        name: ["", "", "", ""],
        surname: '',
        first_name: '',
        middle_name: '',
        maiden_name: '',
        date_of_birth: '',
        present_age: '',
        retirement_age: '',
        gender: '',
        retirement_date: '',
        marital_status: '',
        country: '',
        state_of_origin: '',
        lga: '',
        geo_politcal_zone: '',
        date_of_first_appointment: '',
        data_of_present_appointment: '',
        salary_structure: '',
        gl: '',
        step: '',
        confirmation_date: '',
        cadre: '',
        post_designation: '',
        faculty: '',
        department: '',
        nature: '',
        transfer_date: '',
        qualification: '',
        phd: false,
        phone: '',
        home_address: '',
        status: true,
        reason_for_inactive: '',
        date_of_inactive: '',
        pfa: '',
        pen_number: '',
        category: 'Academic',
        campus: '',
        leave_status: false,
        start_date: '',
        end_date: '',
        remarks: '',
        resume: ''
      });
    
    const navigate =  useNavigate();
    

    useEffect(()=>{
        props.setPage("staff")
        const fetchData = async ()=>{
            const Faculties = await Promise.resolve(fetch("http://localhost:3000/api/faculty/all"))
            const FacultyJson =  await Promise.resolve(Faculties.json());
            setFaculty([...Faculty, ...FacultyJson]);
        }
        fetchData();
    },[])

    useEffect(() => {
        // Call submit whenever the name field has been updated
        if (formData.name) {
            submit();
        }
    }, [formData.name]);

    useEffect(()=>{
        if(formData.resume){
            updateName()
        }
    },[formData.resume])

    const publito = new PublitioAPI(import.meta.env.VITE_PUBLITO_API, import.meta.env.VITE_PUBLITO_SECRET);

    const handleFacultyChange = (values)=>{
        let department = []
        for(let i = 0; i < values[0].departments.length; i++){
            let data = {
                name: values[0].departments[i],
                value: values[0].departments[i]
            }
            department.push(data)
        }
        setDepartments(department)
        setFormData({ ...formData, ["faculty"]: values[0].name})
    }

    const handleDepartmentChange = (values)=>{
        setFormData({ ...formData, ["department"]: values[0].name})
    }

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (values) =>{
        const {value, mainName} =  values[0];
        setFormData({...formData, [mainName]: value});
    }

    const handleCountry = (val)=>{
        setCountry(val)
        setFormData({ ...formData, ["country"]: val})
    }

    const handleState = (val)=>{
        setState(val)
        setFormData({ ...formData, ["state_of_origin"]: val})
    }

    const handleResume = (e)=>{
        setResume(e.target.files[0]);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true);
        const file_url = await publito.uploadFile(resumeFile, 'file');
        setFormData((prevFormData) => ({
            ...prevFormData,
            resume: file_url.url_download
        }));
    }

    const updateName = ()=>{
        setFormData({ ...formData, ["name"]: [{surname: formData.surname, first_name: formData.first_name, middle_name: formData.middle_name, maiden_name: formData.maiden_name}]});
    }

    const submit = async()=>{
        try {
            const response = await fetch('http://localhost:3000/api/new', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
            });
      
            const data = await response.json();
            if(data.message === "New Lecturer Created"){
                setLoading(false)
                navigate("/staffs")
            }
            else{
                setLoading(false)
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false)
        }
    }


    const titleOption = [
        {name: "Miss", value: "Miss", mainName: "title"},
        {name: "Dr", value: "Dr",  mainName: "title"},
        {name: "Prof", value: "Prof",  mainName: "title"},
        {name: "Mrs", value: "Mrs",  mainName: "title" },
        {name: "Mr", value: "Mr",  mainName: "title" }
    ]

    const salaryStructure = [
        {name: "CONUASS", value: "CONUASS", mainName: "salary_structure"},
        {name: "CONTISS", value: "CONTISS", mainName: "salary_structure"}
    ]

    const genderOption = [
        {name: "Male", value: "Male",  mainName: "gender"},
        {name: "Female", value: "Female",  mainName: "gender"},
        {name: "Others", value: "Others",  mainName: "gender"}
    ]

    const maritalOptions = [
        {name: "Single", value: "Single", mainName:"marital_status"},
        {name: "Married", value: "Married", mainName:"marital_status"},
        {name: "Complicated", value: "Complicated", mainName:"marital_status"}
    ]

    const natureOptions = [
        {name: "Permanent", value: "Permanent", mainName:"nature"},
        {name: "Temporary", value: "Permanent", mainName:"nature"}
    ]

    const qualitficationOptions = [
        {name: "BPHarma", value: "BPHarma", mainName: "qualification"},
        {name: "PHD", value: "PHD", mainName: "qualification"},
        {name: "BsC", value: "BsC", mainName: "qualification"}
    ]

    const phdOptions = [
        {name: "Yes", value: true, mainName: "phd"},
        {name: "No", value: false, mainName: "phd"}
    ]

    const categoryOption = [
        {name: "Academinc", value: "Academic", mainName: "category"},
        {name: "Non-Academic", value:"Non-Academic", mainName: "category"}
    ]

    const postDesignation_aca = [
        {name: "Lecturer 1", value: "Lecturer 1", mainName: "post_designation"},
        {name: "Lecturer 2", value: "Lecturer 2", mainName: "post_designation"},
        {name: "Professor", value: "Professor", mainName: "post_designation"},
        {name: "Graduate Assistant", value: "Graduate Assistant", mainName: "post_designation"},
        {name: "Librarian 1", value: "Librarian 1", mainName: "post_designation"},
        {name: "Librarian 2", value: "Librarian 2", mainName: "post_designation"},
        {name: "Assistant Lecturer", value: "Assistant Lecturer", mainName: "post_designation"},
        {name: "Associate Professor", value: "Associate Professor", mainName: "post_designation"},
        {name: "Senior Lecturer", value: "Senior Lecturer", mainName: "post_designation"}
    ]

    const postDesignation_nonaca = [
        {name: "Administrative Staff", value: "Administrative Staff", mainName: "post_designation"},
        {name: "Technical Staff", value: "Technical Staff", mainName: "post_designation"},
        {name: "Junior Staff", value: "Junior Staff", mainName: "post_designation"}
    ]

    const campusOptions = [
        {name: "Akoka", value: "Akoka", mainName: "campus"},
        {name: "Idi Araba", value: "Idi Araba", mainName: "campus"}
    ]

    return(
        <div className="new_staff">
            <div className="new_staff_top">
                <h1>Add New Staff</h1>
                <p>Fill in all of the details to add a new staff</p>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input">
                    <p>Title:</p>
                    <Select
                        options={titleOption}
                        labelField="name"
                        valueField="value"
                        onChange={(value) => handleSelectChange(value)}
                        isSearchable={true}
                    />
                </div>
                <div className="input">
                    <label htmlFor="first_name">First Name:</label>
                    <input required type="text" placeholder="Enter your name" name="first_name" onChange={handleChange}/>
                </div>
                <div className="input">
                    <label htmlFor="surname">Surname:</label>
                    <input required type="text" placeholder="Enter your surname" name="surname" onChange={handleChange}/>
                </div>
                <div className="input">
                    <label htmlFor="surname">Middle Name:</label>
                    <input required type="text" placeholder="Enter your middle name" name="middle_name" onChange={handleChange}/>
                </div>
                <div className="input">
                    <label htmlFor="surname">Maiden Name:</label>
                    <input required type="text" placeholder="Enter your maiden name" name="maiden_name" onChange={handleChange}/>
                </div>
                <div className="input">
                    <label htmlFor="ippis_no">IPPIS Number:</label>
                    <input required type="text" placeholder="Enter your ippis number" name="ippis_no" onChange={handleChange}/>
                </div>
                <div className="input">
                    <label htmlFor="staff_no">Staff Number:</label>
                    <input required type="text" placeholder="Enter your ippis number" name="staff_no" onChange={handleChange}/>
                </div>
                <div className="input">
                    <label htmlFor="date_of_birth">Date of Birth:</label>
                    <input required type="date" placeholder="Enter your date of birth" name="date_of_birth" onChange={handleChange}/>
                </div>
                <div className="input">
                    <label htmlFor="present_age">Present Age:</label>
                    <input required type="text" placeholder="Enter your present age" name="present_age" onChange={handleChange}/>
                </div>
                <div className="input">
                    <p>Gender</p>
                    <Select
                        options={genderOption}
                        labelField="name"
                        valueField="name"
                        name="gender"
                        onChange={(value) => handleSelectChange(value)}
                        isSearchable={true}
                    />
                </div>
                <div className="input">
                    <p>Marital Status</p>
                    <Select
                        options={maritalOptions}
                        labelField="name"
                        valueField="name"
                        onChange={(value) => handleSelectChange(value)}
                        isSearchable={true}
                    />
                </div>
                <div className="input">
                    <p>Country</p>
                    <CountryDropdown
                        value={country}
                        onChange={(val) => handleCountry(val)} 
                    />
                </div>
                <div className="input">
                    <p>State of Origin</p>
                    <RegionDropdown
                        country={country}
                        value={state}
                        onChange={(val) => handleState(val)}
                    />
                </div>
                <div className="input">
                    <label htmlFor="lga">LGA:</label>
                    <input required type="text" placeholder="Enter your LGA" name="lga" onChange={handleChange}/>
                </div>
                <div className="input">
                    <label htmlFor="geo_political_zone">Geo Political Zone:</label>
                    <input required type="text" placeholder="Enter your Geo Political Zone" name="geo_political_zone" onChange={handleChange}/>
                </div>
                <div className="input">
                    <p>Salary Structure</p>
                    <Select
                        options={salaryStructure}
                        labelField="name"
                        valueField="name"
                        onChange={(value) => handleSelectChange(value)}
                        isSearchable={true}
                    />
                </div>
                <div className="input">
                    <label htmlFor="surname">Confirmation Date:</label>
                    <input required type="date" placeholder="Enter confirmation date" name="confirmation_date" onChange={handleChange}/>
                </div>
                <div className="input">
                    <p>Faculty:</p>
                    <Select
                        options={Faculty}
                        labelField="name"
                        valueField="name"
                        onChange={(value) => handleFacultyChange(value)}
                        isSearchable={true}
                    />
                </div>
                <div className="input">
                    <p>Department:</p>
                    <Select
                        options={Department}
                        labelField="name"
                        valueField="name"
                        onChange={(value) => handleDepartmentChange(value)}
                        isSearchable={true}
                    />
                </div>
                <div className="input">
                    <p>Nature:</p>
                    <Select
                        options={natureOptions}
                        labelField="name"
                        valueField="name"
                        onChange={(value) => handleSelectChange(value)}
                        isSearchable={true}
                    />
                </div>
                <div className="input">
                    <p>Qualification:</p>
                    <Select
                        options={qualitficationOptions}
                        labelField="name"
                        valueField="name"
                        onChange={(value) => handleSelectChange(value)}
                        isSearchable={true}
                    />
                </div>
                <div className="input">
                    <p>PHD:</p>
                    <Select
                        options={phdOptions}
                        labelField="name"
                        valueField="value"
                        onChange={(value) => handleSelectChange(value)}
                        isSearchable={true}
                    />
                </div>
                <div className="input">
                    <label htmlFor="email">Email</label>
                    <input required type="email" placeholder="Enter email here" name="email" onChange={handleChange}/>
                </div>
                <div className="input">
                    <label htmlFor="phone">Phone:</label>
                    <input required type="number" placeholder="Enter your phone number" name="phone" onChange={handleChange}/>
                </div>
                <div className="input">
                    <label htmlFor="surname">Address:</label>
                    <input required type="address" placeholder="Enter your current address" name="home_address" onChange={handleChange}/>
                </div>
                <div className="input">
                    <p>Category:</p>
                    <Select
                        options={categoryOption}
                        labelField="name"
                        valueField="name"
                        onChange={(value) => handleSelectChange(value)}
                        isSearchable={true}
                    />
                </div>
                <div className="input">
                    <p>Post/Designation:</p>
                    <Select
                        options={formData.category === "Academic" ? postDesignation_aca : postDesignation_nonaca}
                        labelField="name"
                        valueField="name"
                        onChange={(value) => handleSelectChange(value)}
                        isSearchable={true}
                    />
                </div>
                <div className="input">
                    <p>Campus:</p>
                    <Select
                        options={campusOptions}
                        labelField="name"
                        valueField="name"
                        onChange={(value) => handleSelectChange(value)}
                        isSearchable={true}
                    />
                </div>
                <div className="input">
                    <label htmlFor="surname">Resume:</label>
                    <input required type="file" placeholder="Upload your resume" name="resume" accept=".pdf, .doc, .docx, .txt" onChange={handleResume} />
                </div>
                <div className="input submit">
                    <button type="submit">Submit</button>
                    <img className={loading ? "showLoading" : ""} src={Loading} alt="" srcset="" />
                </div>
            </form>
        </div>
    )
}

export default AddStaff;