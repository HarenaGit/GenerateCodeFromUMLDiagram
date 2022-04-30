import React, {useState} from 'react'
import { Layer, Rect, Text, Line } from "react-konva";
import { getSize } from '../../utils/EntitySize'
import { useContext } from 'react';
import StageContext from '../../hooks/stageContext';

const Entity = ({x, y, data, onClick}) => {
    const {theme} = useContext(StageContext)
    const [selected, setSelected] = useState(false)
    const textColor = `${theme.palette.text.primary}`
    const lineColor = `${theme.palette.text.primary}`
    const background = `${theme.palette.background.default}`
    const { stringWidth , stringHeight, element } = getSize(data)
    const entityNameFontSize = 16
    const entityElementFontSize = 14
    const width = element === 'entity' ? stringWidth*(entityNameFontSize-6) : stringWidth*(entityElementFontSize-4)
    const propertyHeight = 45 + (data.properties.length)*20
    const methodHeight = 45 + (data.properties.length+data.methods.length)*20
    const height = methodHeight+10
    
    const onSelection = (e) => {
        onClick(e, data)
    }
    return(
        <Layer draggable onClick={onSelection}  >
            
            <Rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={background}
                name={data.name}
                cornerRadius={2}
                shadowColor={'#000000'}
                shadowOffsetY={2}
                shadowOffsetX={0}
                shadowBlur={2}
                shadowOpacity={0.25}
                stroke={selected ? `${theme.palette.primary.main}` : `${theme.palette.background.default}`}
                strokeWidth={2}
                onMouseEnter={(e) =>
                    setSelected(true)
                  }
                  onMouseLeave={(e) =>
                    setSelected(false)
                  }
              />

            <Text  onMouseEnter={(e) =>
                    setSelected(true)
                  }
                  onMouseLeave={(e) =>
                    setSelected(false)
                  } text={data.name} x={x} y={y + 10} fill={textColor} width={width} align={"center"} fontSize={entityNameFontSize} fontStyle="bold"  />
            <Line  onMouseEnter={(e) =>
                    setSelected(true)
                  }
                  onMouseLeave={(e) =>
                    setSelected(false)
                  } points={[x+1, y+35, x+width-1, y+35]} tension={1} strokeWidth={1} lineCap="round" stroke={lineColor} />
            {
                (data.properties || []).map((property, index) => {
                    return <Text  onMouseEnter={(e) =>
                        setSelected(true)
                      }
                      onMouseLeave={(e) =>
                        setSelected(false)
                      } fill={textColor} text={`-${property.name} : ${property.type}`} x={x+3} y={y + 45 + index*20} width={width} fontSize={entityElementFontSize}  />
                })
            }
             <Line  onMouseEnter={(e) =>
                    setSelected(true)
                  }
                  onMouseLeave={(e) =>
                    setSelected(false)
                  } points={[x+1, y+propertyHeight, x+width-1, y+propertyHeight]} tension={1} strokeWidth={1} lineCap="round" stroke={lineColor} />
            {
                (data.methods || []).map((method, index) => {
                    let param = ''
                    method.parameters.map((parameter, idx) => {
                        param = `${param}${idx === 0 ? ``: `, `}${parameter.name} : ${parameter.type}`
                    })
                    return <Text  onMouseEnter={(e) =>
                        setSelected(true)
                      }
                      onMouseLeave={(e) =>
                        setSelected(false)
                      } fill={textColor} text={`-${method.name}( ${param} ) : ${method.returnType}`} x={x+3} y={y+ propertyHeight + 10 + index*20} width={width} fontSize={entityElementFontSize}  />
                })
            } 
        </Layer>
    )
}

export default Entity