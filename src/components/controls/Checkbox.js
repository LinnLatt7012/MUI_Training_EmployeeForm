import { FormControl, FormControlLabel, Checkbox as MuiCheckbox} from '@mui/material'
import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function Checkbox(props) {
    const {name,vlaue,label,onChange} =props
    const convertToDefEventPara =(name,value) =>({
        target:{
            name,value
        }
    })
    return (
        <FormControl>
            <FormControlLabel 
            control={<MuiCheckbox  
                name={name}
                color='primary'
                checkedIcon={<AccountBoxIcon />}
                checked={vlaue}
                onChange={e=>onChange(convertToDefEventPara(name,e.target.checked))}
            />}
            label={label}
            />
        </FormControl>
    )
}
