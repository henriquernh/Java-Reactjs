
import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ListaUserComponent from '../componente/user/ListUserComponent';
import AddUserComponent from '../componente/user/AddUserComponent';
import AddUserComponentYup from '../componente/user/AddUserComponentYup';
import EditUserComponent from '../componente/user/EditUserComponent';


import 'bootstrap/dist/css/bootstrap.min.css';

const AppRouter = () => {

    return(
        <div className="container">
            <Router>
                <div className="col-md-12">
                    <h1 className="text-center">React User Application C.R.U.D</h1>
                    <div
                        className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-dark border-bottom box-shadow">
                        <a className="my-0 mr-md-auto font-weight-normal h3 text-white" href="/">Brasil</a>
                        <nav className="my-2 my-md-0 mr-md-3">
                            <a className="p-2 text-white" href="/add-user-yup/">Adicionar Usuário Yup</a>
                            <a className="p-2 text-white" href="/add-user/">Adicionar Usuário</a>
                            <a className="p-2 text-white" href="/">Listar Usuários</a>
                        </nav>
                    </div>
                    <Switch>
                        <Route path="/" exact component={ListaUserComponent} />
                        
                        <Route path="/add-user" exact component={AddUserComponent} />

                        <Route path="/add-user-yup" exact component={AddUserComponentYup} />

                        <Route path="/edit-user" exact component={EditUserComponent} />


                    </Switch>
                </div>

            </Router>

            <footer className="pt-4 my-md-5 pt-md-5 border-top">
                <div className="row">
                    <div className="container">
                        <p className="m-0 text-center">Copyright &copy; Brasil</p>
                    </div>
                </div>
            </footer>
            
        </div>
        
    )

}

export default AppRouter;