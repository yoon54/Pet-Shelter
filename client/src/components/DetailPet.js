import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {navigate, Link} from "@reach/router"
import 'materialize-css/dist/css/materialize.min.css'
import './css/pets.css'

const Details = props => {

    const [name,setName] = useState("");
    const [type,setType] = useState("");
    const [desc,setDesc] = useState("");
    const [skill_1,setSkill_1]= useState("nothing");
    const [skill_2,setSkill_2]= useState("nothing");
    const [skill_3,setSkill_3]= useState("nothing");
    const [likes,setLikes] = useState(0);
    const [errors,setErrors] = useState({});
    const [ but, setBut ] = useState(false);

    useEffect( () => {
        Axios.get(`http://localhost:8000/api/pets/${props._id}`, {
            withCredentials: true
          })
            .then (res => {
                setName(res.data.name);
                setType(res.data.type);
                setDesc(res.data.desc);
                setSkill_1(res.data.skill_1);
                setSkill_2(res.data.skill_2);
                setSkill_3(res.data.skill_3);
                setLikes(res.data.likes);
            })
            .catch(err => console.log(err));
    },[]
    );



    const Delete = _id => {
        Axios.delete(`http://localhost:8000/api/pets/${_id}`, {
            withCredentials: true
          })
        navigate("/pets")
    }
    const likePet = (likes) => {
        likes +=1;
        setLikes(likes);
        setBut(true);
        Axios.put(`http://localhost:8000/api/pets/likes/${props._id}`, {likes}, {
            withCredentials: true
          })
            .then(res => {
                console.log(res)
            })
            .catch(err=>console.log(err));
    }

    return(
        <>
        <div className ="all">
            <nav>
                <div className="nav-wrapper green">
                    <Link to = "/pets" className="brand-logo">Pet Shelter</Link>
                    <ul className="right hide-on-med-and-down">
                        <li><Link to = "/pets" >Pets List</Link></li>
                        <li><Link to = "/pets/create">Add Pet to Shelter</Link></li>
                    </ul>
                </div>
            </nav>
            <div className="container" id = "contain">
                <h4 className= "title"><span className= "detail">Details about:</span> {name}</h4>
                <button className = "btn red darken-2 adopt" onClick = {e => Delete(props._id) }>Adopt {name}</button>
                <p className= "detail1"><span className= "detail">Pet type:</span>{type}</p>
                <p className= "detail1"><span className= "detail">Description:</span>{desc}</p>
                <p className= "detail1"><span className= "detail">Skills:</span>{skill_1} {skill_2} {skill_3}</p>
                {
                        but 
                        ?
                        <button className="btn btn-primary ml-3 butt" disabled>Like this pet</button>
                        : 
                        <button className="btn btn-primary ml-3 butt" onClick={e => likePet(likes)}>Like this pet</button>
                    }
                <p className="likes">{likes} like(s)</p> 
            </div>
        </div>
        
        </>
    )
}

export default Details;