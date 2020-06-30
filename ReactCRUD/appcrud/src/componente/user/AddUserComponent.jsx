import React, {Component} from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class AddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            nome: '',
            email: ''
        }
    }
    
    inputChanged = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = { nome: this.state.nome, 
                     email: this.state.email
                   };

        fetch('http://localhost:8080/user/salvar', 
        {  method: 'POST', body: JSON.stringify(user), 
           headers: {'Content-Type' : 'application/json', 'Accept' : 'application/json'}  
        })
        .then((response) => response.json())
        .then((responseData) => {

            toast.success("Usuário adicionado", {
                position: toast.POSITION.TOP_LEFT
            });

            this.setState({
                ...this.state,
                nome: '',
                email: ''
            })
            
        });
    
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});


    render(){
        return (
            <div className="jumbotron my-4">
                <h2 className="font-weight-bold text-warning">Add Usuário</h2>
                <form>
                    
                    <ToastContainer autoClose={4000} />

                    <div className="form-group col-md-6 text-left">
                        <label htmlFor="nome">User Name:</label>
                        <input type="text" name="nome" placeholder="Nome Usuário" className="form-control"
                            value={this.state.nome} onChange={this.inputChanged} />
                    </div>

                    <div className="form-group col-md-6 text-left">
                        <label htmlFor="email">E-mail:</label>
                        <input type="text" name="email" placeholder="E-mail Usuário" className="form-control"
                            value={this.state.email} onChange={this.inputChanged} />
                    </div>

                    <div className="form-group col-md-2 text-left">
                        <input type="button" className="btn btn-success" onClick={this.saveUser} value="Salvar" />
                        
                    </div>
                </form>              
            </div>
        );
    }
    
}

export default AddUserComponent;