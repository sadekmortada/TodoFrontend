import { useState } from "react";
import { useAuth } from './security/AuthContext';
import { createTodo } from "./api/TodoApiService";
import { updateTodo } from "./api/TodoApiService";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";

export default function TodoComponent(){
    const navigate = useNavigate();
    const location = useLocation();
    const authContext = useAuth();
    const [todo] = useState( location.state.todo );
    const [description,setDescription] = useState(todo.description? todo.description : '');
    const [targetDate,setTargetDate] = useState(todo.targetDate? todo.targetDate : '');
    const [done,setDone] = useState(todo.done? todo.done : false);
    
    function handleSubmit(values){
        const newTodo = {
            'username': authContext.username,
            'description': values.description,
            'targetDate': values.targetDate,
            'done': values.done
        };
        //adding new todo
        if(todo.empty){
            createTodo(newTodo.username, newTodo)
            .then((response)=>navigate('/todos',{state: {successMessage: `new todo with id: ${response.data.id} was created`}}))
            .catch((error)=>console.log(error));
        }
        //updating already existing todo 
        else{
            newTodo.id = todo.id;
            updateTodo(newTodo.username, newTodo)
            .then(()=>navigate('/todos',{state: {successMessage: `todo with id: ${todo.id} was updated`}}))
            .catch((error)=>console.log(error));
        }
    }
    function validate(values){
        let errors = {};
        if(values.description.length<5)
            errors.description = 'description can\'t be less than 5 characters';
        if(values.targetDate === '' || values.targetDate === null || !moment(values.targetDate).isValid())
            errors.targetDate = 'Enter a target date'
        return errors;
    }
    return(
        <div className="container">
            <Formik
            initialValues={{description,targetDate,done}}
            enableReinitialize = {true}
            onSubmit = {handleSubmit}
            validate = {validate}
            validateOnChange = {false}
            validateOnBlur = {false}>
                <Form>
                    <fieldset className="my-2 form-group">
                        <label htmlFor="description">Description</label>
                        <Field name="description" type="text" className='form-control'/>
                        <div className="row">
                            <div className="col-sm-3"/>
                            <ErrorMessage name="description" component='div' className="alert alert-danger text-danger my-1 col-sm-6" />
                        </div>
                    </fieldset>
                    <fieldset className="my-3 form-group">
                        <label htmlFor="targetDate">Target Date</label>
                        <Field name="targetDate" type="date" className='form-control'/>
                        <div className="row">
                            <div className="col-sm-3"/>
                            <ErrorMessage name="targetDate" component='div' className="alert alert-danger text-danger my-1 col-sm-6" />
                        </div>
                    </fieldset>
                    {/* <fieldset className="my-3 form-group">
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" className='form-control'/>
                        <div className="row">
                            <div className="col-sm-3"/>
                            <ErrorMessage name="email" component='div' className="alert alert-danger text-danger my-1 col-sm-6" />
                        </div>
                    </fieldset> */}
                    <fieldset className="my-2 form-group"> 
                        <label htmlFor="done">Is Done?</label>
                        <Field name="done" type="checkbox" className='form-check-input'/>
                    </fieldset>
                    <button type="submit" className="btn btn-success">Save</button>
                </Form>
            </Formik>
            {/* <form className='form'>
                    <div className='row my-2'> 
                        <div className='col-sm-3'/>
                        <label htmlFor="inputDescription" className='col-sm-2 col-form-label'>Description</label>
                        <div className='col-sm-5'>
                            <input type="text" name="description" className='form-control' placeholder="todo description here" id="inputDescription"
                            value={description}
                            onChange={(event)=>setDescription(event.target.value)}/>
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-sm-3'/>
                        <label htmlFor="inputDate" className='col-sm-2 col-form-label'>Target Date</label>
                        <div className='col-sm-5'>
                            <input type="date" name="targetDate" className='form-control' placeholder="target date here" id="inputDate"
                            value={targetDate}
                            onChange={(event)=>setTargetDate(event.target.value)}/>
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-sm-3'/>
                        <label htmlFor="inputDone" className='col-sm-2 col-form-label'>Is done?</label>
                        <div className='col-sm-1'>
                            <input type="checkbox" name="targetDate" className='form-check-input' id="inputDone"
                            checked={done}
                            onChange={()=>setDone(!done)}/>
                        </div>
                    </div>
                    <div className="col-auto my-2">
                        <button type="button" className="btn btn-success" name="submit" onClick={handleSubmit}>Save</button>
                    </div>
                </form> */}
        </div>
    )
}