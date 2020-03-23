import React from 'react';
import { Router } from '@reach/router';

import ListPet from './components/ListPet';
import Create from './components/CreatePet';
import Edit from './components/EditPet';
import Details from './components/DetailPet'
import SignInView from './components/SignInView';

function App() {
  return (
    <div>
      <Router>
        <ListPet path = "/pets"/>
        <Create path = "/pets/create"/>
        <Edit path = "/pets/:_id/edit"/>
        <Details path = "pets/:_id"/>
        <SignInView path = "/"/>
      </Router>
    </div>
  );
}

export default App;
