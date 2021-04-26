/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useFieldArray, Control, FormState } from "react-hook-form"
import { IOrganization } from "../App";

interface IListItemProps {
    control: Control<IOrganization>;
    register: any;
    formState: FormState<IOrganization>;
}

const ListItem: React.FunctionComponent<IListItemProps> = (props) => {

    const { control, register, formState: { errors } } = props;
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "domains", // unique name for your Field Array
        // keyName: "id", default to "id", you can change the key name
    });

    return (<>
        {fields.map((field, index) => (
            <>  <input
                key={field.id} // important to include key with field's id
                {...register(`domains.${index}.name` as const,{required:"Value is required"})}
                defaultValue={field.name} // make sure to include defaultValue
            />
            {errors!==undefined && errors.domains!==undefined 
            && errors.domains[index]!==undefined 
            && errors.domains[index]!.name!==undefined 
            && errors.domains[index]!.name?.type==="required"
            && <small>Value is required</small> }
                <button type="button" onClick={() => { remove(index) }} >x</button>
            </>
        ))}
        <button type="button" onClick={() => { append({}) }} >Add</button>

    </>);
}

export default ListItem;