import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Redirection(){
    const navigate = useNavigate();
    const loginCode=  new URL(dococument.location.toString()).searchParams.get('code');
    useEffect(()=>{
        axios.post().then((r)=>{
            console.log(r.data);
             // 토큰을 받아서 localStorage에 저장
            localStorage.setItem('name', r.data.user_name); 
      
            navigate('/');
        });
    },[]);
    return(
        <div>
            로그인중~ㄴ
        </div>
    );
}