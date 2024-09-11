import React, {useState, useEffect} from "react";
import './staff.css';
import Stats from '../../assets/anlytics.png';
import Arrow from "../../assets/left_arrow.png";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";


const Staffs = ()=>{

    const [Lecturers, setLecturers] = useState([]);
    const [Academic, setAcademic] = useState([])
    const [NonAcademic, setNonAcademic] = useState([])
    const navigate = useNavigate()

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

    function flattenLecturerData(lecturers) {
        const flattened =  lecturers.map((lecturer, index) => ({
            id: index + 1,
            ippis_no: lecturer.ippis_no,
            staff_no: lecturer.staff_no,
            title: lecturer.title,
            surname: lecturer.name[0]?.surname || '',
            first_name: lecturer.name[0]?.first_name || '',
            middle_name: lecturer.name[0]?.middle_name || '',
            maiden_name: lecturer.name[0]?.maiden_name || '',
            date_of_birth: lecturer.date_of_birth,
            gender: lecturer.gender ? lecturer.gender : (Math.random() < 0.5 ? 'Male' : 'Female'),
            date_of_first_appointment: lecturer.date_of_first_appointment,
            date_of_inactive: lecturer.date_of_inactive,
            department: lecturer.department,
            faculty: lecturer.faculty,
            campus: lecturer.campus,
            cadre: lecturer.cadre,
            qualification: lecturer.qualification,
            phd: lecturer.phd,
            phone: lecturer.phone,
            home_address: lecturer.home_address,
            marital_status: lecturer.marital_status,
            status: lecturer.status,
            reason_for_inactive: lecturer.reason_for_inactive,
            remarks: lecturer.remarks.join(', '), // Join array into a comma-separated string
            resume: lecturer.resume,
            retirement_age: lecturer.retirement_age,
            retirement_date: lecturer.retirement_date,
            salary_structure: lecturer.salary_structure,
            geo_politcal_zone: lecturer.geo_politcal_zone,
            lga: lecturer.lga,
            state_of_origin: lecturer.state_of_origin,
            present_age: lecturer.present_age,
            transfer_date: lecturer.transfer_date,
            leave_status: lecturer.leave_status,
            start_date: lecturer.start_date,
            end_date: lecturer.end_date,
            step: lecturer.step,
            gl: lecturer.gl,
            pfa: lecturer.pfa,
            pen_number: lecturer.pen_number,
            category: lecturer.category,
            nature: lecturer.nature,
            post_designation: lecturer.post_designation,
            data_of_present_appointment: lecturer.data_of_present_appointment,
            confirmation_date: lecturer.confirmation_date,
        }));

        return flattened
    }
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 150},
        { field: 'ippis_no', headerName: 'IPPIS No', width: 150 },
        { field: 'staff_no', headerName: 'Staff No', width: 150 },
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'surname', headerName: 'Surname', width: 150 },
        { field: 'first_name', headerName: 'First Name', width: 150 },
        { field: 'middle_name', headerName: 'Middle Name', width: 150 },
        { field: 'maiden_name', headerName: 'Maiden Name', width: 150 },
        { field: 'date_of_birth', headerName: 'Date of Birth', width: 150 },
        { field: 'date_of_first_appointment', headerName: 'Date of First Appointment', width: 200 },
        { field: 'gender', headerName: 'Gender', width: 150 },
        { field: 'date_of_inactive', headerName: 'Date of Inactive', width: 150 },
        { field: 'department', headerName: 'Department', width: 150 },
        { field: 'faculty', headerName: 'Faculty', width: 150 },
        { field: 'campus', headerName: 'Campus', width: 150 },
        { field: 'cadre', headerName: 'Cadre', width: 150 },
        { field: 'qualification', headerName: 'Qualification', width: 200 },
        { field: 'phd', headerName: 'PhD', width: 100 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'home_address', headerName: 'Home Address', width: 250 },
        { field: 'marital_status', headerName: 'Marital Status', width: 150 },
        { field: 'status', headerName: 'Status', width: 100 },
        { field: 'reason_for_inactive', headerName: 'Reason for Inactive', width: 200 },
        { field: 'remarks', headerName: 'Remarks', width: 250 },
        { field: 'resume', headerName: 'Resume', width: 150 },
        { field: 'retirement_age', headerName: 'Retirement Age', width: 150 },
        { field: 'retirement_date', headerName: 'Retirement Date', width: 150 },
        { field: 'salary_structure', headerName: 'Salary Structure', width: 150 },
        { field: 'geo_politcal_zone', headerName: 'Geo-Political Zone', width: 200 },
        { field: 'lga', headerName: 'LGA', width: 150 },
        { field: 'state_of_origin', headerName: 'State of Origin', width: 150 },
        { field: 'present_age', headerName: 'Present Age', width: 150 },
        { field: 'transfer_date', headerName: 'Transfer Date', width: 150 },
        { field: 'leave_status', headerName: 'Leave Status', width: 150 },
        { field: 'start_date', headerName: 'Start Date', width: 150 },
        { field: 'end_date', headerName: 'End Date', width: 150 },
        { field: 'step', headerName: 'Step', width: 100 },
        { field: 'gl', headerName: 'GL', width: 100 },
        { field: 'pfa', headerName: 'PFA', width: 150 },
        { field: 'pen_number', headerName: 'PEN Number', width: 150 },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'nature', headerName: 'Nature', width: 150 },
        { field: 'post_designation', headerName: 'Post Designation', width: 200 },
        { field: 'data_of_present_appointment', headerName: 'Date of Present Appointment', width: 200 },
        { field: 'confirmation_date', headerName: 'Confirmation Date', width: 150 },
    ];


    return(
        <div className="staff">
            <div className="staff_top">
                <h1>Staff Information</h1>
                <p>{Lecturers.length} currently at the University</p>
            </div>
            <div className="dashboard_table">
                <div  style={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={flattenLecturerData(Lecturers)}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => row.id}
                    />
                </div>
                <button id="all_staff">Add Staff</button>
            </div>
        </div>
    )
}

export default Staffs