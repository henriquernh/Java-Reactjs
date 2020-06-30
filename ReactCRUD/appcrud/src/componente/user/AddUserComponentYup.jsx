import React, {Component} from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Formik, ErrorMessage, Form, Field  } from 'formik';
import * as yup from 'yup';

const values = { nome: '', email: '' };

class AddUserComponentYup extends Component{

    inputChanged = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    saveUser (fildes)  {
        
        let user = { nome: fildes.nome, 
                     email: fildes.email
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

            document.getElementById("formUser").reset();
          
        })
        .catch(e => console.log('ERRO = ' + e));
    
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    render(){
        return (
            <div className="jumbotron my-4">
                <h2 className="font-weight-bold text-warning">Add Usuário - Formik e Yup</h2>

                <Formik

                    initialValues={values}

                    validationSchema={yup.object({
                        nome: yup.string().required('Informe o nome').min(4, 'Nome precisa ser maior que 4 caracteres'),
                        email: yup.string().required('Informe o E-mail').min(8, 'E-mail precisa ser maior que 8 caracteres').email('E-mail invalido')
                    })}
                    
                    onSubmit={fildes => {
                        this.saveUser(fildes)
                        
                    } }

                    render={({ errors, touched, handleReset}) => (
                        <Form id="formUser">
                            
                            <ToastContainer autoClose={4000} />

                            <div className="form-group col-md-6 text-left">
                                <label htmlFor="nome">User Name:</label>
                                <Field type="text" name="nome" placeholder="Nome Usuário"
                                       className={'form-control' + (errors.nome && touched.nome ? ' is-invalid' : '')} />
                                <ErrorMessage name="nome" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group col-md-6 text-left">
                                <label htmlFor="email">E-mail:</label>
                                <Field type="text" name="email" placeholder="E-mail Usuário" 
                                       className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group col-md-2 text-left">
                                <button type="submit" className="btn btn-success" >Salvar</button>                                
                            </div>
                        </Form>
                    )}
                />
            </div>
        );
    }
    
}

export default AddUserComponentYup;