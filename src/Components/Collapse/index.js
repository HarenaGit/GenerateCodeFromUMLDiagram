import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button'
import ChevronDown from '@mui/icons-material/ArrowDropDown'
import ChevronUp from '@mui/icons-material/ArrowDropUp'
import { useTheme } from '@mui/styles';

export default function CollapseComponent({title, children, onClick}) {
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
   
  return (
    <Box sx={{ width: "100%",  }}>
      <Button onClick={() => {setOpen(!open); onClick(open)}} variant="outlined" sx={{  borderColor: `${theme.palette.text.primary}`, color: `${theme.palette.text.primary}`, '&:hover' : { borderColor: `${theme.palette.text.primary}`, color: `${theme.palette.text.primary}` } }} fullWidth endIcon={open ?<ChevronUp />  : <ChevronDown />} >
        {title}
      </Button>
      <Collapse in={open} sx={{marginTop: 3, marginLeft: 2, marginRight: 2, marginBottom: 3}} >
        {children}
      </Collapse>
    </Box>
  );
}
