import React, {useState} from 'react'
import Stack from '@mui/material/Stack'
import ExpandIcon from '@mui/icons-material/AspectRatio'
import ReduceIcon from '@mui/icons-material/Remove'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import { useTheme } from '@mui/styles'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({open, onClose, children, title }) =>  {
  
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={onClose}
          TransitionComponent={Transition}
        >
          
              {children}
         
        </Dialog>
      </div>
    );
  }

const Layout = ({titles, children, expandable=true, onExpand=() => {}, onReduce=() => {}}, scroll=false) => {
    const [open, setOpen] = useState(false)
    const onClose = () => {
        setOpen(false)
    }
    const theme = useTheme()

    const expandButton = () => {
        if(expandable){
            return(
                <Stack direction="row">
                    <IconButton onClick={() => {setOpen(true);onExpand()}} size="small" color="default">
                        <ExpandIcon  fontSize="inherit" />
                    </IconButton>
                    <IconButton  onClick={() => {setOpen(false);onReduce()}} size="small" color="default">
                        <ReduceIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
            )
        }
    }

    const content = ( 
                <div style={{backgroundColor: `${theme.palette.background.layout}`, borderTop: `2px solid ${theme.palette.background.default}`, height: "calc(100% - 3px)", width: "calc(100% - 1px)", marginRight: 0, marginTop: 3, marginLeft: 0, borderRadius: 0, overflow: "hidden" }}>
                    <div style={{height: 30, display: "flex", justifyContent:"space-between", borderBottom: `1px solid ${theme.palette.background.default}`,}}>
                            {(titles || []).map((title, idx) => {
                                return(
                                        <div key={title} style={{width: 100, height: 30, borderTopLeftRadius: 2, borderTopRightRadius: 2, borderStyle: "solid", borderLeftWidth: 0, borderRightWidth: 1, borderTopWidth: 0, borderBottomWidth: 1, borderColor: `${theme.palette.background.layout}`, color: `${theme.palette.text.primary}`, display:'flex', justifyContent:"center", alignItems: 'center', backgroundColor: `${theme.palette.background.title}` }}>
                                            <Typography variant="button" component="div" gutterBottom>
                                                {title}
                                            </Typography>
                                        </div>  
                                )
                            })}

                            {expandButton()}
                       
                    </div>
                    <div style={{width: "100%", height: "calc(100% - 30px)", overflow: "hidden" }} >
                        {children}
                    </div>
            
                </div>)
    if(open){
        return(
            <FullScreenDialog open={open} title={titles} onClose={onClose}>
                {content}
            </FullScreenDialog>
        )
    }
    else{
        return content;
    }
}



export default Layout;