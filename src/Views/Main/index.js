import React, { useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField';
import AppBar from '../../Components/AppBar'
import SplitPane, {Pane} from 'react-split-pane'
import Layout from '../../Components/layout'
import Collapse from '../../Components/Collapse'
import { useTheme } from '@mui/styles';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-eclipse";
import useStage from '../../hooks/useStage'
import Canvas from '../../ViewComponent/Canvas'
import './style.css'
import ClassTools from '../../ViewComponent/Tools/ClassTools';
import Tools from '../../utils/Tools'
import convertToUMLEntity from '../../metamodels/DataToUMLEntity'
import { converter } from '../../metamodels/MetaUML2MetaJava';
import { generateClassCode } from '../../metamodels/MetaJavaClass2Code';

const Main = ({switcher=(<></>)}) => {

    const editorRef = useRef(null)
    const [stageRef, stageWidth, stageHeight, checkSize, setFullSize] = useStage()
    const [editorSize, setEditorSize] = useState({width: "100%", height:"100%"})
    const [currentTool, setCurrentTool] = useState(Tools.class)
    const [entities, setEntities] = useState([])
    const [code, setCode] = useState('')
    const [currentClass, setCurrentClass] = useState({
        key: 1,
        name: `Class1`,
        properties: [],
        methods: []
    })
    const theme = useTheme()

    useEffect(() => {
        document.body.style.backgroundColor = `${theme.palette.background.default}`
    })

    const onClickClass = (isOpen) => {
        setCurrentTool(Tools.class)
    }

    const onChangeInClassTool = (data) => {
       
        const newEntity = entities.map((entity, idx) => {
            if(entity.key === data.key) return data
            return entity
        })
        setEntities(newEntity)
        onGenerateCode(newEntity)
        setCurrentClass(data)

    }

    const onCreateEntity = (x, y) => {
        const idx = entities.length + 1
        const newEntity = {
            key: idx,
            name:  `Class${idx}`,
            properties: [],
            methods: [],
            x: x,
            y: y
          }
        setCurrentClass(newEntity)
        const newData = [
            ...entities,
            newEntity
          ]
        setEntities(newData)
        onGenerateCode(newData)
       
    }

    const onDeleteEntity = (data) => {
        const newEntities = entities.filter((entity, idx) => {return entity.key !== data.key})
        const idx = newEntities.length + 1
        const newEntity = {
            key: idx,
            name:  `Class${idx}`,
            properties: [],
            methods: [],
            x: 0,
            y: 0
          }
        setEntities(newEntities)
        onGenerateCode(newEntities)
        setCurrentClass(newEntity)
       
    }

    const onEntitySelected = (data) => {
        onChangeInClassTool(data)
    }

    const onGenerateCode = (ent) => {
         let umlEntities = []
         ent.map((entity, index) => {
            umlEntities.push(convertToUMLEntity(entity))
         })
         let javaClasses = []
         umlEntities.map((umlEntity, idx) => {
            javaClasses.push(converter(umlEntity))
         })
         setCode(generateClassCode(javaClasses[0]))
    }
   
    return( 
        <div style={{width:"100%",height:"100%", backgroundColor: `${theme.palette.background.default}` }}>
                
                <SplitPane split='horizontal' minSize={68} maxSize={68} >
                    <div style={{width:"100%", height: 68}}>
                        <AppBar switcher={switcher} />
                    </div>
                    <SplitPane split="vertical" defaultSize={350}>
                        <Pane className="" style = {{width: '100%', height: "100%"}}>
                            <Layout titles={['Elément']} expandable={false} >
                            <div style={{paddingBottom: 10}} >
                                <Stack direction="row" spacing={3} sx={{display: 'flex', marginTop: 1, marginLeft: 1, marginRight: 2 }} >
                                        <Avatar  variant="square">
                                            P
                                        </Avatar>
                                        <Stack direction="column" spacing={1}  >
                                            <TextField size="small"  fullWidth label="Projet..." variant="outlined" />
                                            <TextField size="small" fullWidth multiline rows={2}  label="Déscription..." variant="outlined" />
                                        </Stack>
                                    </Stack>  
                            </div>
                             <Layout titles={['Outils']} expandable={false}  >
                                 <div style={{height: "calc(100vh - 273px)", overflow: "auto"}}>
                                    <div style={{marginTop: 15,  marginLeft: 5, marginRight: 10}}>
                                        <Collapse title="CLASS" onClick={onClickClass} >
                                            <ClassTools onChange={onChangeInClassTool} onDeleteClass={onDeleteEntity} data={currentClass}  setData={setCurrentClass} />
                                        </Collapse>
                                        <Collapse title="RELATION" onClick = {(isOpen) => {}}>

                                        </Collapse>
                                    </div>
                                 </div>
                                
                             </Layout>
                            </Layout>
                        </Pane>
                        <SplitPane split="horizontal" defaultSize={"calc(100% - 52px)"} onChange={()=>{setEditorSize({width:"100%", height: editorRef.current.offsetHeight})}} >
                            <Layout titles={['Graph']} onExpand={setFullSize} onReduce={checkSize} >
                                <div ref = {stageRef} className="container-canvas" style={{height: "100%", with:"100%", overflow:"hidden"}}>
                                    <Canvas stageWidth={stageWidth} 
                                    stageHeight={stageHeight}
                                    tool = {currentTool} 
                                    entity={entities} 
                                    createEntity = {onCreateEntity} 
                                    onGenerateCode = {() => {onGenerateCode(entities)}}
                                    onEntitySelected = {onEntitySelected}
                                    />
                                </div>
                            </Layout>
                            <Layout titles={['Code']}>
                               <div ref={editorRef} style={{height:"100%", width:"100%"}}>
                                    <AceEditor
                                            mode="java"
                                            theme={theme.palette.mode === 'dark' ? "clouds_midnight" : "eclipse" }
                                            name="UNIQUE_ID_OF_DIV"
                                            editorProps={{ $blockScrolling: true }}
                                            value={code}
                                            fontSize={14}
                                            width={editorSize.width}
                                            height={editorSize.height}
                                        />
                               </div>
                            </Layout>
                        </SplitPane>
                    </SplitPane>
                </SplitPane>
        </div>
      
    )    
}


export default Main;