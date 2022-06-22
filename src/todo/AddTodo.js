import React from "react";
import PropTypes from "prop-types";

function useInputValue(defaultValue = ''){
    const [value, setValue] = React.useState(defaultValue)
    return{
        bind:{
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }
}

function AddTodo({ onCreate }){

    const input = useInputValue('')

    function submitHandler(event){
        event.preventDefault()
        if(input.bind.value.trim()){
            onCreate(input.value())
            input.clear()
        }
    }

    return(
        <form style={{marginBottom: '1rem'}} onSubmit={submitHandler}>
            <input {...input.bind} style={{borderRadius:'15px', marginRight:'10px', borderColor: 'black', padding:'10px'}} />

            <button type="submit" style={{borderRadius:'15px', borderColor: 'black', padding:'10px'}}>Добавить</button>
        </form>
    )
}

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo