import React, {useState} from "react";
import './sidebar.css';
import Logo from '../../assets/logo.png'
import Dashboard from '../../assets/Analytics Tool x DBMS/dashboard.png'
import Analytics from '../../assets/Analytics Tool x DBMS/analytics.png';
import Staff from '../../assets/Analytics Tool x DBMS/staff.png';
import Reports from '../../assets/Analytics Tool x DBMS/reports.png';
import Activity from '../../assets/Analytics Tool x DBMS/activity.png';
import { useNavigate } from "react-router-dom";
// import Dashboard from '../../assets/Analytics Tool x DBMS/logout.png';



const Sidebar = (props)=>{
    // const [selected, setSelected] =  useState("dashboard");
    const navigate =  useNavigate();

    const changePage = (x)=>{
        props.setPage(x)
        if(x === "dashboard"){
            navigate(`/`)
        }
        else{
            navigate(`/${x}`)
        }
    }

    return(
        <div className="sidebar">
            <div className="logo">
                <img src={Logo} alt=""  />
                <p>USMS</p>
            </div>
            <div className="menu">
                <div className={props.page === "dashboard" ? "item selected" :  "item"} onClick={()=>{changePage("dashboard")}}>
                    <img src={Dashboard} alt="" />
                    <p>Dashboard</p>
                </div>
                <div className={props.page === "analytics" ? "item selected" :  "item"} onClick={()=>{changePage("analytics")}}>
                    <img src={Analytics} alt="" />
                    <p>Analytics</p>
                </div>
                <div className={props.page === "staff" ? "item selected" :  "item"} onClick={()=>{changePage("staffs")}}>
                    <img src={Staff} alt="" />
                    <p>Staff Information</p>
                </div>
                <div className={props.page === "reports" ? "item selected" :  "item"} onClick={()=>{changePage("reports")}}>
                    <img src={Reports} alt=""/>
                    <p>Reports</p>
                </div>
                <div className={props.page === "activity" ? "item selected" :  "item"} onClick={()=>{changePage("activity")}}>
                    <img src={Activity} alt="" />
                    <p>Auto Reminder</p>
                </div>
            </div>
        </div>
    )    
}

export default Sidebar;