import { Close, EditOutlined } from '@mui/icons-material'
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material'
import { styled } from '@mui/system'
import React, { useState } from 'react'
import Controls from './controls/Controls'

const Tbl = styled(Table)(({ theme }) => ({
    marginTop: theme.spacing(3),
    '& thead th':{
        fontWeight:'600',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
    },
    '& tbody td':{
        fontWeight:'300',
    },
    '& tbody tr:hover':{
        backgroundColor: '#fffbf2',
        cursor: 'pointer',
    }
}))

export default function useTable(records,HeadCells,filterFn) {
    const pages = [5,10,25]
    const [page, setPage] = useState(0)
    const [rowsperPage, setRowsperPage] = useState(pages[page])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()
    function getComparator(order, orderBy) {
            return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
        }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
        }

    const TblContainer = props =>(
        <Tbl>
            {props.children}
        </Tbl>
    )
    const TblHead = props =>{
        const handleSortRequest = cellId =>{
            const isAsc = orderBy === cellId && order ==='asc'
            setOrder(isAsc? 'desc':'asc')
            setOrderBy(cellId)
        }
        return(
        <TableHead>
            <TableRow>
                {HeadCells.map(headcell => (
                    <TableCell key={headcell.id}
                    sortDirection ={orderBy === headcell.id? order:false } >
                        {headcell.disableSorting? headcell.label :<TableSortLabel 
                        active ={orderBy === headcell.id}
                        direction={orderBy === headcell.id ? order : 'asc'}
                        onClick={()=>{handleSortRequest(headcell.id)}}>
                         {headcell.label}
                         </TableSortLabel>}
                         </TableCell>
                ))}  
            </TableRow>
        </TableHead>
        )
    }
    const Tblbody = props =>(
        <TableBody>
            {recordsAfterPagingandSorting().map(row =>(
                    <TableRow key={row.id}>
                        {HeadCells.map(headcell => (
                            headcell.id == "actions" ? <TableCell key={headcell.id}> 
                                <Controls.ActionButton color='primary'>
                                    <EditOutlined />
                                </Controls.ActionButton>
                                <Controls.ActionButton color='secondary'>
                                    <Close/>
                                </Controls.ActionButton>
                            </TableCell>:
                        <TableCell key={headcell.id}> {row[headcell.id]}</TableCell>
                        ))} 
                    </TableRow>
                ))
                }
        </TableBody>
    )
    const handleChangePage = (event, newPage) =>{
        setPage(newPage);
    }
    const handleChangeRowsPerPage = event =>{
        setRowsperPage(parseInt(event.target.value,10))
        setPage(0)
    }

    const TblPagination = props => (
        <TablePagination
        component="div"
        page={page}
        rowsPerPage={rowsperPage}
        rowsPerPageOptions ={pages}
        count = {records.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )
   
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) {
            return order;
          }
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
      }
      
    const recordsAfterPagingandSorting = () =>{
        return stableSort(filterFn.fn(records),getComparator(order,orderBy)).slice(page*rowsperPage,(page+1)*rowsperPage)
    }
    return {
        TblContainer,
        TblHead,
        Tblbody,
        recordsAfterPagingandSorting,
        TblPagination
    }
}
