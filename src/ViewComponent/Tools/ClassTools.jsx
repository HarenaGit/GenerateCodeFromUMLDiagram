import React, {useState, useEffect} from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MetaUMLDataType } from '../../utils/MetaElement'

const Property = ({label, data, onDelete, onChangeName, onChangeType}) => {

    const menuItem = () => {
        let menu = []
        for(let key of Object.keys(MetaUMLDataType))
        {
            menu.push(<MenuItem value={MetaUMLDataType[key]}>{MetaUMLDataType[key]}</MenuItem>)
        }
        return menu
    }
    return(
        <div style={{marignBottom: 5}}>
            <Stack direction="row" spacing={1} >
            <TextField label={label.name} value={data.name} onChange={onChangeName} fullWidth size="small"  sx={{ height: 10}} />
             <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.type ? data.type : data.returnType}
                label={label.type}
                onChange={onChangeType}
                size="small"
                
                >
                {(menuItem() || []).map((menu) => {
                    return menu;
                })}
               
            </Select>
            <IconButton onClick={onDelete} size="small" >
                <DeleteIcon />
            </IconButton>
        </Stack>
        </div>
    )
}

const ClassTools = ({data, onChange, onDeleteClass }) => {

    const onAddProperty = async () => {
        const newData = {
            ...data,
            properties: [
                ...data.properties,
                {name: `property${data.properties.length + 1}`, type: MetaUMLDataType.stringType }
            ]
        }
        onChange(newData)
    }

    const onAddMethod = () => {
        const newData = {
            ...data,
            methods: [
                ...data.methods,
                {name: `method${data.methods.length + 1}`, returnType: MetaUMLDataType.stringType, parameters: [] }
            ]
        }
        onChange(newData)
    }

    const onAddParameter = (idMethod) => {
        const newData = {
            ...data,
            methods: data.methods.map((mth, idx) => { 
                if(idMethod === idx)
                {
                    return { ...mth , parameters : [...mth.parameters, {name: `parametre${mth.parameters.length + 1}`, type: MetaUMLDataType.stringType}] }
                }
                return mth
             })
        }
        onChange(newData)
    }

    const onDeleteProperty = (idx) => {
        const newData = {
            ...data,
            properties: data.properties.filter((prt, index) =>  {return index !== idx})
        }
        onChange(newData)
    }

    const onDeleteMethod = (idx) => {
        const newData = {
            ...data,
            methods: data.methods.filter((mth, index) =>  {return index !== idx})
        }
        onChange(newData)
    }

    const onDeleteParam = (idMethod, idParameter) => {
        const newData = {
            ...data,
            methods: data.methods.map((mth, idx) => { 
                if(idMethod === idx)
                {
                    return { ...mth , parameters : mth.parameters.filter((param, id) => {return id !== idParameter}) }
                }
                return mth
             })
        }
        onChange(newData)
    }

    const onChangeNom = (e) => {
        const newData = {
            ...data,
            name: e.target.value
        }
        onChange(newData)
    } 

    const onPropertyName = (e, idx) => {
        const newData = {
            ...data,
            properties: data.properties.map((property, index) => {
                if(index === idx){
                    property.name = e.target.value
                }
                return property
            })
        }
        onChange(newData)
    }

    const onPropertyType = (e, idx) => {
        const newData = {
            ...data,
            properties: data.properties.map((property, index) => {
                if(index === idx){
                    property.type = e.target.value
                }
                return property
            })
        }
        onChange(newData)
    }

    const onMethodName = (e, idx) => {
        const newData = {
            ...data,
            methods:  data.methods.map((method, index) => {
                if(index === idx){
                    method.name = e.target.value
                }
                return method
            })
        }
        onChange(newData)
    }

    const onMethodType = (e, idx) => {
        const newData = {
            ...data,
            methods:  data.methods.map((method, index) => {
                if(index === idx){
                    method.returnType = e.target.value
                }
                return method
            })
        }
        onChange(newData)
    }

    const onParameterName = (e, idMethod, idParameter) => {
        const newData = {
            ...data,
            methods:  data.methods.map((method, index) => {
                if(index === idMethod){
                    return {...method, parameters: method.parameters.map((param, idx) => { 
                        if(idx === idParameter)
                        {
                            param.name = e.target.value
                        }
                        return param
                     }) }
                }
                return method
            })
        }
        onChange(newData)
    }

    const onParameterType = (e, idMethod, idParameter) => {
        const newData = {
            ...data,
            methods:  data.methods.map((method, index) => {
                if(index === idMethod){
                    return {...method, parameters: method.parameters.map((param, idx) => { 
                        if(idx === idParameter)
                        {
                            param.type = e.target.value
                        }
                        return param
                     }) }
                }
                return method
            })
        }
        onChange(newData)
    }

    const onChangeX = (e) => {
        const newData = {
            ...data,
            x: parseFloat(e.target.value),
        }
        onChange(newData)
    }

    const onChangeY = (e) => {
        const newData = {
            ...data,
            y: parseFloat(e.target.value)
        }
        onChange(newData)
    }

    const onDelete = () => {
        onDeleteClass(data)
    }

    return(
        <>
            <IconButton onClick={onDelete} >
                <DeleteIcon />
            </IconButton>
            <Stack direction="row" spacing={1} sx={{marginBottom: 4}}>
                <TextField label="x"  value={data.x} onChange={onChangeX} fullWidth size="small" />
                <TextField label="y" value={data.y} onChange={onChangeY} fullWidth size="small" />
            </Stack>
            <TextField label="Nom : " value={data.name} onChange={onChangeNom} fullWidth size="small" />
            <Typography  color="GrayText" variant="subtitle2" sx ={{marginTop: 3, marginLeft: 1}} >Propriétées :  <IconButton onClick={onAddProperty} ><AddIcon /></IconButton></Typography>
            <Stack direction="column" spacing={1} sx={{marginTop: 2, marginLeft: 2}} >
              {(data.properties || []).map((property, idx) => {
                  return <Property label={{name: "nom", type: "Type"}} onChangeName={(e)=>{onPropertyName(e, idx)}} onChangeType={(e) => {onPropertyType(e, idx)}} data={property} onDelete={() => {onDeleteProperty(idx)}} />
              })}
            </Stack>
            <Typography  color="GrayText" variant="subtitle2" sx ={{marginTop: 3, marginLeft: 1}} >Méthodes :  <IconButton onClick={onAddMethod} ><AddIcon /></IconButton></Typography>
            <Stack direction="column" spacing={1} sx={{marginTop: 2, marginLeft: 2}} >
                {(data.methods || []).map((method, idx) => {
                    return(
                        <div style={{marginBottom: 20}}>
                         <Property label={{name: "nom", type: "Type de retour"}} onChangeName={(e) => {onMethodName(e, idx)}} onChangeType={(e) => {onMethodType(e, idx)}} data={method} onDelete={() => {onDeleteMethod(idx)}} />
                          <Stack direction="column" spacing={1}>
                               <div style={{marginLeft: 10, marginRight: 10}}>
                                    <Typography  color="GrayText" variant="subtitle2"  >Paramètres :  <IconButton onClick={() => {onAddParameter(idx)}} size="small" ><AddIcon /></IconButton></Typography>
                                    
                                    {(method.parameters || []).map((parameter, id) => {
                                        return <Property label={{name: 'nom', type: "Type"}} onChangeName={(e) => {onParameterName(e, idx, id)}} onChangeType={(e) => {onParameterType(e, idx, id)}} data={parameter} onDelete={() => {onDeleteParam(idx, id)}} />
                                    })}
                               </div>
        
                            </Stack>
                        </div>
                    )
                })}
            </Stack>
        </>
    )
}

export default ClassTools;