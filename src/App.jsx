import React, { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Main from './Views/Main'
import Switcher from './Components/Switcher'

const dark = {
    palette: {  
        mode: 'dark',
        primary: {
            main: purple[500],
          },
        background: {
            default: "#191919",
            layout: "#282828",
            title: "#303030",
            
        }  
    },
  }

const light = {
    palette: {  
        mode: 'light',
        primary: {
            main: purple[500],
          },
        background: {
            default: "#e4e5f1",
            layout: "#fafafa",
            title: "#9394a5",
            
        }  
    },
}

const App = () => {
    const [theme, setTheme] = useState('dark')
    const onSwitch = (e) => {
        const {checked} = e.target
        if(checked) setTheme('dark')
        else setTheme('light')
    }
    return( 
        <ThemeProvider theme={createTheme(theme === 'dark' ? dark : light)}>
           
            <div style={{width:"100%",height:"100%" }}>
                <Main switcher={<Switcher onChange={onSwitch} />} />
            </div>
        </ThemeProvider>
    )    
}


export default App;