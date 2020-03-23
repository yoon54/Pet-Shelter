import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {navigate, Link} from "@reach/router"
import 'materialize-css/dist/css/materialize.min.css'
import './css/pets.css'

const Edit = props => {

    const [name,setName] = useState("");
    const [type,setType] = useState("");
    const [desc,setDesc] = useState("");
    const [skill_1,setSkill_1]= useState("");
    const [skill_2,setSkill_2]= useState("");
    const [skill_3,setSkill_3]= useState("");
    const [likes,setLikes] = useState(0);
    const [errors,setErrors] = useState({});

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



    const editPet = e => {
        e.preventDefault();
        Axios.put(`http://localhost:8000/api/pets/edit/${props._id}`, {_id: props._id, name, type, desc,skill_1,skill_2,skill_3,likes}, {
            withCredentials: true
          })
            .then(res => {
                if(res.data.errors){
                    setErrors(res.data.errors);
                    }
                    else{
                        navigate(`/pets`);
                    }
            })
            .catch(err => console.log(err));
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
                <h5 className = "title">Know a pet needing a home?</h5>
                <form onSubmit= { editPet }>
                    <div className="form-group">
                        <p>Name</p>
                        {
                            errors.name ?
                        <p className ="yellow darken-3">{errors.name.message}</p> : ""

                        }
                        <input placeholder = {name} onChange = {e =>setName(e.target.value)} className = "green"/>
                        <p>Pet Type</p>
                        {
                            errors.type ?
                        <p className ="yellow darken-3">{errors.type.message}</p> : ""

                        }
                        <input placeholder = {type} onChange = {e =>setType(e.target.value)} className = "green"/>
                        <p>Description</p>
                        {
                            errors.desc ?
                        <p className ="yellow darken-3">{errors.desc.message}</p> : ""

                        }
                         <input placeholder = {desc} onChange = {e =>setDesc(e.target.value)} className = "green"/>
                         <p>Skill 1</p>
                         {
                            errors.skill_1 ?
                        <p className ="yellow darken-3">{errors.skill_1.message}</p> : ""

                        }
                         <input placeholder = {skill_1} onChange = {e =>setSkill_1(e.target.value)} className = "green"/>
                         <p>Skill 2</p>
                        {
                            errors.setSkill_2 ?
                        <p className ="yellow darken-3">{errors.setSkill_2.message}</p> : ""

                        }
                         <input placeholder = {skill_2} onChange = {e =>setSkill_2(e.target.value)} className = "green"/>
                         <p>Skill 3</p>
                         {
                            errors.skill_3 ?
                        <p className ="yellow darken-3">{errors.skill_3.message}</p> : ""

                        }
                         <input placeholder = {skill_3} onChange = {e =>setSkill_3(e.target.value)} className = "green"/>
                        

                    </div>
                    <input type = "submit" value = "Edit Pet" className = "btn blue  create" />
             </form>
            </div>
        </div>
        
        </>
    )
}

export default Edit;