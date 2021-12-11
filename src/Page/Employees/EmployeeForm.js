import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Controls from '../../components/controls/Controls';
import { Form, useForm } from '../../components/useForm';
import * as Employeeservice from '../../Services/EmployeeService'

const intialFValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    isPermenant: false
}
const genderItems = [
    {id:'male',title:'Male'},
    {id:'female',title:'Female'},
    {id:'others',title:'Others'}

]


function EmployeeForm(props) {

    const {addOrEdit, recordForEdit} = props

    const validate = (fieldValues = values)=>{
        let temp ={}
        if ('fullName' in fieldValues)
            temp.fullName = values.fullName? "":"This field is required"
        if('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(values.email)? "":"Email is invalid"
        if('mobile' in fieldValues)
            temp.mobile = values.mobile.length>9? "":"Minimum 10 numbers required"
        if('deparmentId' in fieldValues)
            temp.departmentId = values.departmentId.length != 0 ? "":"this field is required"
        setErrors({
            ...temp
        })
        if(fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
     const handleSubmit = e =>{
         e.preventDefault()
        if(validate()){
            addOrEdit(values,resetForm)
        }
    }
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(intialFValues,true,validate)
    useEffect(() => {
     if(recordForEdit != null){
         setValues({
             ...recordForEdit
         })
     }
    }, [recordForEdit])
    return (
        <Form onSubmit={handleSubmit} >
            <Grid container>
                <Grid item xs={6} >
                    <Controls.Input
                        label="Full Name"
                        name="fullName"
                        onChange={handleInputChange}
                        value={values.fullName} 
                        error={errors.fullName}/>
                    <Controls.Input
                        label="Email"
                        name="email"
                        onChange={handleInputChange}
                        value={values.email} 
                        error={errors.email}/>
                    <Controls.Input
                        label="Mobile"
                        name="mobile"
                        onChange={handleInputChange}
                        value={values.mobile} 
                        error={errors.mobile}/>
                    <Controls.Input
                        label="City"
                        name="city"
                        onChange={handleInputChange}
                        value={values.city} />
                </Grid>
                <Grid item xs={6}>
                        <Controls.RadioGroup
                            label="Gender"
                            name="gender"
                            value={values.gender}
                            onChange={handleInputChange}
                            items = {genderItems}
                        />
                        <Controls.Select 
                            name="departmentId"
                            label="Department"
                            value={values.departmentId}
                            onChange={handleInputChange}
                            options={Employeeservice.getDepartmentCollection()}
                            error={errors.departmentId}
                        />
                        <Controls.Datepicker 
                            name="hireDate"
                            label="Hire Date"
                            value={values.hireDate}
                            onChange={handleInputChange}
                        />
                        <Controls.Checkbox 
                            name="isPermenant"
                            label="Permenant Employee"
                            value={values.isPermenant}
                            onChange={handleInputChange}
                            options={Employeeservice.getDepartmentCollection()}
                        />
                        <div>
                            <Controls.Button 
                             text="Submit"
                             onClick={handleSubmit}
                            />
                            <Controls.Button 
                             text="Reset"
                             color="error"
                             onClick={resetForm}
                            />
                        </div>
                </Grid>
                

            </Grid>
        </Form>
    )
}

export default EmployeeForm
