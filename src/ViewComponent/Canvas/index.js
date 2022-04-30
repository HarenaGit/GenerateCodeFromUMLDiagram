import React, {useState} from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import CodeIcon from '@mui/icons-material/Code'
import SelectionIcon from '@mui/icons-material/TouchApp'
import Entity from '../../Components/Entity'
import DropDown from '../../Components/DropDown'
import { useTheme } from '@mui/styles';
import Konva from 'konva';
import Tools from '../../utils/Tools'
import { Stage } from 'react-konva';
import './style.css'
import {StageProvider} from '../../hooks/stageContext';

const SCALEBY = 1.02

const Canvas = ({stageWidth, stageHeight, entity=[], createEntity, tool, onGenerateCode, onEntitySelected}) => {
    const theme = useTheme()

    const [stageScale, setStageScale] = useState(0.9)
    let isEntityClick = false

    const onStageClick = (e) => {
        const stage = e.target.getStage();
        const pointerPosition = stage.getRelativePointerPosition();
     
        const x = pointerPosition.x 
        const y = pointerPosition.y
        
        if(!isEntityClick){
            switch(tool){
                case Tools.class:
                    createEntity(x, y)
                    console.log('test click stage')
                    break;
                case Tools.relation:
                    break;
            }
        }
        isEntityClick = false
    }

    const onEntityClick = (e, entityData) => {
       isEntityClick = true
       onEntitySelected(entityData)
    }

    return(
        <>
            <Stage 
                style={{cursor: "pointer"}}
                scaleX={stageScale}
                scaleY={stageScale} 
                onClick={onStageClick}
                width={stageWidth}
                height={stageHeight}
                perfectDrawEnabled={false}
                draggable>
                  <StageProvider data={{theme}}>
                        {(entity || []).map((item, index) => {
                            return <Entity x={item.x} y={item.y} data={item} onClick={onEntityClick} />
                            
                        })}
                  </StageProvider>
            </Stage>
            <div style={{display: 'flex', position: 'absolute', top: 50, left: 10}} >
                    
                    <DropDown />
                    <Button variant="contained" onClick={onGenerateCode} sx={{ marginRight: 2, marginLeft: 2  }} startIcon={<CodeIcon />} >
                        Générer le code
                    </Button>    
                
            </div>
            <Stack direction="row"  spacing={1} sx={{ position: 'absolute', top: 50, right: 10}}>
                    <Button variant="outlined" sx={{ borderColor: `${theme.palette.text.primary}`, color: `${theme.palette.text.primary}`, '&:hover' : {borderColor: `${theme.palette.text.primary}`} }} onClick={() => {setStageScale(stageScale*SCALEBY)}} ><ZoomInIcon /></Button>
                    <Button variant="outlined" sx={{ borderColor: `${theme.palette.text.primary}`, color: `${theme.palette.text.primary}`, '&:hover' : {borderColor: `${theme.palette.text.primary}`} }} onClick={() => {setStageScale(stageScale/SCALEBY)}} ><ZoomOutIcon /></Button>
        
            </Stack>
        </>
    )
}

export default Canvas;