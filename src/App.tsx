/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './App.css';
import { useForm } from "react-hook-form"
import "bootstrap/dist/css/bootstrap.min.css";
import ListItem from './list-item/list-item.component';

export interface IOrganization {
  name: string;
  domains: IDomain[];

}
interface IDomain {
  id: number;
  name: string;

}

function App() {
  const { register, control, formState, setValue, getValues, handleSubmit } = useForm<IOrganization>();

  const onSubmit = (data: any, e: any) => {
    console.log("Form submitted.", data);

  };
  const onError = (errors: any, e: any) => console.log("Errors occurred", errors, e);


  return (
    <div className="App">
      <div className="container">
        <div className="row">

          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="form-group">
              <label >Name</label>
              <input type="text" className="form-control"  {...register("name", { required: 'Value is required' })} />
            {formState.errors && formState.errors.name && formState.errors.name.type==="required" &&  <small id="emailHelp" className="form-text text-muted">Value is required</small>}
            </div>
            <div className="form-group">
              <label className="form-label">Domains</label>
              <ListItem control={control} register={register} formState={formState} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>



        </div>
      </div>
    </div>
  );
}

export default App;
