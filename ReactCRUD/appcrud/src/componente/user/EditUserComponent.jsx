import React, {Component} from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class EditUserComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: '',
            nome: '',
            email: ''

        }

        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);

    }

    inputChanged = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount(){
        this.loadUser();
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {id: this.state.id , nome: this.state.nome , email: this.state.email}

        fetch('http://localhost:8080/user/salvar/', 
        {  method: 'POST', body: JSON.stringify(user), 
           headers: {'Content-Type' : 'application/json', 'Accept' : 'application/json'}  
        })
        .then((response) => response.json())
        .then((responseData) => {

            toast.success("Usuário atualizado com sucesso", {
                position: toast.POSITION.TOP_LEFT
            });
        })
        
        
    }

    
    loadUser(){
        fetch('http://localhost:8080/user/getUserById/' + window.localStorage.getItem("userId"))
        .then((response) => response.json())
        .then((responseData) => {
            
            this.setState({ id: responseData.id});
            this.setState({ nome: responseData.nome});
            this.setState({ email: responseData.email});

        })
    }
    

    render(){
        return (
            <div className="jumbotron my-4">
                <h2 className="font-weight-bold text-warning" >Editar Usuário</h2>
                <form>

                    <ToastContainer autoClose={4000} />

                    <div className="form-group col-md-2 text-left">
                        <label htmlFor="id">ID : </label>
                        <input type="text" name="id" value={this.state.id} readOnly className="form-control" />
                    </div>
                    
                    <div className="form-group col-md-6 text-left">
                        <label htmlFor="nome">Nome : </label>
                        <input type="text" name="nome" value={this.state.nome} onChange={this.inputChanged} className="form-control" />
                    </div>
                    
                    <div className="form-group col-md-6 text-left">
                        <label htmlFor="email">E-mail : </label>
                        <input type="text" name="email" value={this.state.email} onChange={this.inputChanged} className="form-control" />
                    </div>

                    <div className="form-group col-md-2 text-left">
                        <button className="btn btn-success" onClick={this.saveUser} >Save</button>
                    </div>

                </form>
            </div>
        );
    }

}

export default EditUserComponent;