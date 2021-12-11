import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/system';
import React, { useState } from 'react'
const theme = createTheme();
const useStyles = makeStyles({
    root:{
        '& .MuiFormControl-root':{
            width: '80%',
            margin: theme.spacing(1),
            '& .MuiOutlinedInput-root':{
                borderRadius: '4px'
            }
        }
    }
})

export function useForm(intialFValues,validateOnChange=false,validate) {
    const [values, setValues] = useState(intialFValues)
    const [errors, setErrors] = useState({})
    const handleInputChange = e =>{
        const {name, value} = e.target
        setValues({
            ...values,
            [name] : value
            })
        if(validateOnChange)
            validate({[name]:value})
    }
    const resetForm = () =>{
        setValues(intialFValues)
        setErrors({})
    }
    return {
        values,
        setValues,
        errors,
        setErrors,
        resetForm,
        handleInputChange,
    }
} 

export  function Form(props) {
    const classes = useStyles() 
    const { children, ...others} =props
    return (
        <form className={classes.root} {...others}>
            {children}
        </form>
    )
}
