import { Navbar, VideoFunction, Note, GetQuote } from "../../components";
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import "./DashboardPage.css"

const { Footer } = Layout;

function DashboardPage(){
    
    return(
        <>
        <Navbar/>
        <div className="Quote">
            <p>{<GetQuote/>}</p> 
        </div>

        <div className="Container-Dashboard">
            <VideoFunction/>
            <Note/>
        </div>

        <Footer style={{ textAlign: 'center' }}>Break It Up ©2023 | Created by Mar Molina</Footer>
        </>
    )
}

export default DashboardPage;