import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { navigate, Link } from "@reach/router";
import 'materialize-css/dist/css/materialize.min.css';
import './css/pets.css';

const PetList = props =>{
    const [pets, setPets] = useState([]);
    useEffect( () => {
        Axios.get("http://localhost:8000/api/pets", {
            withCredentials: true
          })
            .then(res => {
                setPets(res.data)})
            .catch(err => console.log(err));
    },[]);

    const Details = _id => {
        navigate(`/pets/${_id}`)
    }

    const Edit = _id => {
        navigate(`/pets/${_id}/edit`)
    }

    return(
        <div className ="all">
            <nav>
                <div className="nav-wrapper green">
                    <Link to = "/pets" className="brand-logo">Pet Shelter</Link>
                    <ul class="right hide-on-med-and-down">
                        <li className = "active"><Link to = "/pets" >Pets List</Link></li>
                        <li><Link to = "/pets/create" >Add Pet to Shelter</Link></li>
                    </ul>
                </div>
            </nav>
            <div className="container" id = "contain"> 
                <h5 className = "title">These pets are looking for a good home!</h5>
                <table className = "highlight centered player-list">
                    <thead>
                    <tr className = "color-row">
                        <th className = "rowss">Name</th>
                        <th className = "rowss">Type</th>
                        <th className = "rowss">Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        pets.map(pet =>
                            <tr>
                                <td className = "rowss">{pet.name}</td>
                                <td className = "rowss">{pet.type}</td>
                                <td className = "rowss">
                                    <button className = "btn green darken-2 action" onClick = {e => Details(pet._id) }>Details</button>
                                    <button className = "btn yellow darken-4 action" onClick = {e => Edit(pet._id) } >Edit</button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )




}

export default PetList;