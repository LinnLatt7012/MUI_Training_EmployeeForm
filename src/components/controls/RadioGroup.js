import React from 'react'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as MuiRadioGroup} from '@mui/material'
export default function RadioGroup(props) {
    const {name,label,value,items,onChange} =props;
    return (
        <FormControl component="fieldset">
                        <FormLabel component="legend">{label}</FormLabel>
                        <MuiRadioGroup row
                            aria-label={label}
                            value={value}
                            name={name}
                            onChange={onChange}
                        >
                            {items.map((item) => (
                                <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
                            ))
                            }
                        </MuiRadioGroup>
                    </FormControl>
    )
}

