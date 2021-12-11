import React, { useState } from 'react'
import EmployeeForm from './EmployeeForm'
import PageHeader from '../../components/PageHeader'
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import { InputAdornment, Paper, TableBody, TableCell, TableRow, Toolbar} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/system';
import useTable from '../../components/useTable';
import * as EmployeeService from "../../Services/EmployeeService"
import Controls from '../../components/controls/Controls';
import SearchIcon from '@mui/icons-material/Search';
import Add  from '@mui/icons-material/Add';
import Popup from '../../components/Popup';
import { Close, EditOutlined } from '@mui/icons-material';
import Notification from '../../components/Notification';

const theme = createTheme()
const useStyles = makeStyles({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput:{
        width:'75%'
    },
    newButton:{
        position:'absolute',
        right:'10px'
    }
})
const headcells = [
    {id:"fullName",label:"Employee Name"},
    {id:"email",label:"Email"},
    {id:"mobile",label:"Phone No"},
    {id:"deparment",label:"Department"},
    {id:"actions",label:"Actions", disableSorting: true},
]

export default function Employees() {
    const classes = useStyles()
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [record, setRecord] = useState(EmployeeService.getallEmployees)
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({isOpen:false, message: '', type:''})

    const [filterFn, setFilterFn] = useState({
        fn:items => {
            return items
        }
    })
    const SearchHandle = e =>{
        let target = e.target;
        setFilterFn({
            fn: items => {
                if(target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }
    const {TblContainer,TblHead,Tblbody,TblPagination,recordsAfterPagingandSorting} = useTable(record,headcells,filterFn )

    const addOrEdit = (employee,resetForm) => {
        if(employee.id ==0){
            EmployeeService.insertEmployee(employee)
            setNotify({
                isOpen:true,
                message:'employee created successfully',
                type:'success'
            })
        }else{
            EmployeeService.updateEmployee(employee)
            setRecordForEdit(null)
            setNotify({
                isOpen:true,
                message:'employee updated successfully',
                type:'success'
            })
        }
        resetForm()
        setOpenPopup(false)
        setRecord(EmployeeService.getallEmployees)
    }
    const openInPopup = item =>{
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    const onDelete = (id) =>{
        if(window.confirm("Are you sure to delete this record?")){
            EmployeeService.deleteEmployee(id);
            setRecord(EmployeeService.getallEmployees)
            setNotify({
                isOpen:true,
                message:'employee deleted successfully',
                type:'error'
            })
        }
    }
    return (
        <>
            <PageHeader
            title="New Employee"
            subTitle="Form Design with validation"
            icon={<PeopleOutlineTwoToneIcon fontSize="large" color="primary"/>}
            />
            <Paper className={classes.pageContent} square>
            {/* <EmployeeForm /> */}
            <Toolbar >
                <Controls.Input 
                className={classes.searchInput}
                label ="Search Employeees"
                onChange ={SearchHandle}
                InputProps= {{
                    startAdornment:(<InputAdornment position="starts">
                        <SearchIcon /> 
                        </InputAdornment>)
                }}
                />
                <div className={classes.newButton}>
                    <Controls.Button 
                text ="Add new"
                variant="outlined"
                onClick={()=>{
                    setRecordForEdit(null)
                    setOpenPopup(true)
                }}
                startIcon={<Add/>}/>
                </div>
                
                
            </Toolbar>
            <TblContainer>
                <TblHead />
                <TableBody>
            {recordsAfterPagingandSorting().map(row =>(
                    <TableRow key={row.id}>
                        {headcells.map(headcell => (
                            headcell.id == "actions" ? <TableCell key={headcell.id}> 
                                <Controls.ActionButton color='primary' onClick={()=>{openInPopup(row)}}>
                                    <EditOutlined />
                                </Controls.ActionButton>
                                <Controls.ActionButton color='secondary' onClick={()=>{onDelete(row.id)}}>
                                    <Close/>
                                </Controls.ActionButton>
                            </TableCell>:
                        <TableCell key={headcell.id}> {row[headcell.id]}</TableCell>
                        ))} 
                    </TableRow>
                ))
                }
        </TableBody>
            </TblContainer>
            <TblPagination />
            </Paper>
            <Popup
            openPopup ={openPopup}
            title ="Employee Form"
            setOpenPopup={setOpenPopup}
            >
                <EmployeeForm 
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit}/>
            </Popup>
            <Notification notify={notify} setNotify={setNotify} />
        </>
    )
}
