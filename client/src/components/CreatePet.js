import React, {useState} from 'react';
import Axios from 'axios';
import {navigate, Link} from "@reach/router"
import 'materialize-css/dist/css/materialize.min.css'
import './css/pets.css'

const Create = props => {

    const [name,setName] = useState("");
    const [type,setType] = useState("");
    const [desc,setDesc] = useState("");
    const [skill_1,setSkill_1]= useState("");
    const [skill_2,setSkill_2]= useState("");
    const [skill_3,setSkill_3]= useState("");
    const [likes,setLikes] = useState(0);
    const [errors,setErrors] = useState({});

    const createPet = e => {
        e.preventDefault();
        Axios.post("http://localhost:8000/api/pets", {name, type, desc,skill_1,skill_2,skill_3,likes}, {
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
                        <li className = "active"><Link to = "/pets/create" >Add Pet to Shelter</Link></li>
                    </ul>
                </div>
            </nav>
            <div className="container" id = "contain">
                <h5 className = "title">Know a pet needing a home? (Skills are optional)</h5>
                <form onSubmit= { createPet }>
                    <div className="form-group">
                        
                        {
                            errors.name ?
                        <p className ="yellow darken-3">{errors.name.message}</p> : ""

                        }
                        <input placeholder = "Pet Name" onChange = {e =>setName(e.target.value)} className = "green"/>
                        
                        {
                            errors.type ?
                        <p className ="yellow darken-3">{errors.type.message}</p> : ""

                        }
                        <input placeholder = "Pet Type" onChange = {e =>setType(e.target.value)} className = "green"/>
                        {
                            errors.desc ?
                        <p className ="yellow darken-3">{errors.desc.message}</p> : ""

                        }
                         <input placeholder = "Pet Description" onChange = {e =>setDesc(e.target.value)} className = "green"/>
                         {
                            errors.skill_1 ?
                        <p className ="yellow darken-3">{errors.skill_1.message}</p> : ""

                        }
                         <input placeholder = "Skill 1" onChange = {e =>setSkill_1(e.target.value)} className = "green"/>
                        
                        {
                            errors.setSkill_2 ?
                        <p className ="yellow darken-3">{errors.setSkill_2.message}</p> : ""

                        }
                         <input placeholder = "Skill 2" onChange = {e =>setSkill_2(e.target.value)} className = "green"/>
                         {
                            errors.skill_3 ?
                        <p className ="yellow darken-3">{errors.skill_3.message}</p> : ""

                        }
                         <input placeholder = "Skill 3" onChange = {e =>setSkill_3(e.target.value)} className = "green"/>
                        

                    </div>
                    <input type = "submit" value = "Create" className = "btn blue create" />
             </form>
            </div>
        </div>
        
        </>
    )
}

export default Create;