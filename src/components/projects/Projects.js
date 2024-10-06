import React, { useEffect, useState } from 'react';
import './Projects.css';
import * as dummy from './../../assets/dummy-data';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import history from '../../router/history';
import { Link, NavLink } from 'react-router-dom';



const Projects = () => {

    // const navigate = useHistory()

    const [projectsData, setProjectsData] = useState([])
    const [autoCardMovingStatus, setAutoCardMovingStatus] = useState(true)

    useEffect(()=>{
        setProjectsData(dummy.projectsData)
        if(autoCardMovingStatus){
        const intervalId = setInterval(() => {
            nextCard();
        }, 5000);
    
        
          return () => clearInterval(intervalId);
        }
       
    },)

 
    const nextCard = ()=> {
        let lists = document.querySelectorAll('.item');
        document.getElementById('slide').appendChild(lists[0]);
    }

    const prevCard = ()=> {
        let lists = document.querySelectorAll('.item');
        document.getElementById('slide').prepend(lists[lists.length - 1]);
    }

    const route = () => {
      history.push('file');
      // window.location.reload()
    }
   

  return (
    <div className="container">
    <div id="slide">
      {projectsData.map((data,i)=>(
        <div className="item" key={i}  style={{ backgroundImage: "url("+data.img+")" }}>
        <div className="content">
          <div className="name">{data.title}</div>
          <div className="des">
             {data.description}
          </div>
          <button style={{padding:'1rem', width:'50%', fontSize:'15px'}}><b>View Project </b> </button>
          {/* <button style={{background:'red'}} onClick={route}>click</button> */}
        </div>
      </div>
      ))}
      
      
    </div>

    <div className="buttons" >
      <button id="prev" onClick={()=>(prevCard(),setAutoCardMovingStatus(false))}>
        <p><b>Prev</b></p>
      </button>
      <button id="" onClick={()=>setAutoCardMovingStatus(!autoCardMovingStatus)}>
        <p><b>{autoCardMovingStatus? 'Stop' : 'Move'}</b></p>
      </button>
      <button id="next" onClick={()=>(nextCard(),setAutoCardMovingStatus(false))}>
        <p><b>Next</b></p>
      </button>
    </div>
  </div>
  
      
  );
};

export default Projects;
