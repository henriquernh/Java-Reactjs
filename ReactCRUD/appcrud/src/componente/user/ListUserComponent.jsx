import React, {Component} from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import 'bootstrap/dist/css/bootstrap.min.css';


class ListaUserComponent extends Component{
  
    constructor(props){
      super(props)
      this.state = { 
          users: []
      }
    }
  
    componentDidMount(){

        fetch('http://localhost:8080/user/listaUsers')
        .then((response) => response.json())
        .then((responseData) => {           
            this.setState({ users: responseData});
            
        })
        .catch(e => console.log('ERRO = ' + e))
       
    }

    addUser(){
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-user');
    }

    editUser(userId){
        window.localStorage.setItem("userId", userId);
        this.props.history.push('/edit-user');
    }

    deleteUser(userId){

        fetch('http://localhost:8080/user/delete/'+ userId , {  
            method: 'DELETE',
        })
        .then((responseData) => {

            console.log("Usuário removido com sucesso");

            this.setState({users : this.state.users.filter(user => user.id !== userId)})

            toast.success("Usuário removido", {
                position: toast.POSITION.TOP_LEFT
            });

        })
        .catch(e => console.log('ERRO = ' + e))
        
    }

    deleteConfirm = (id) => {
        confirmAlert({
            message:'Tem certeza que deseja remover o usuário?',
            buttons:[
                {
                    label: 'Sim',
                    onClick: () => this.deleteUser(id)
                },
                {
                    label: 'Não',
                    
                }
            ]
        })

    }


    render(){

        return(
            <div className="jumbotron my-4">
                
                <h2 className="font-weight-bold text-warning">Lista Usuário</h2>
                
                <div className="text-left">
                    <button className="btn btn-primary" onClick={() => this.addUser()}>Add User</button>
                </div>
                <ToastContainer autoClose={4000} />

                <div className="row">
					<div className="col-12">
						<div className="table-responsive-sm">
                            <table className="table table-sm my-2">
                                <thead className="card-header">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col" className="text-center">Nome</th>
                                        <th scope="col" className="text-center" >Email</th>
                                        <th scope="col" className="text-center">Ação</th>
                                        <th scope="col" className="text-center">Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {}
                                    {this.state.users.map(user => <tr key={user.id}>
                                                                    <td>{user.id}</td>
                                                                    <td className="text-left">{user.nome}</td>
                                                                    <td>{user.email}</td>
                                                                    <td className="text-right">
            <button className="btn btn-danger" onClick={() => this.deleteConfirm(user.id)} >Delete</button>
                                                                    </td>
                                                                    <td  className="text-right">                                                                        
            <button className="btn btn-success" onClick={() => this.editUser(user.id)} >Editar</button>
                                                                    </td>
                                                                </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>          
            </div>
        );
    }
  
}

export default ListaUserComponent;