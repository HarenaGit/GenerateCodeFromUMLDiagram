const getSize = (jsonData) => {
    let size = {stringWidth: 0, stringHeight : 0, element: ''}
    const entityName = jsonData.name
    size.stringWidth = entityName.length
    size.stringHeight = 1
    size.element = 'entity'
    for(let i=0;i<jsonData.properties.length;i++)
    {
        const propertyLength = jsonData.properties[i].name.length + jsonData.properties[i].type.length
        if(size.stringWidth < propertyLength) {size.stringWidth = propertyLength; size.element='property'}
        size.stringHeight += 1
    }
    for(let i = 0; i<jsonData.methods.length; i++)
    {
        let methodLength = jsonData.methods[i].name.length + jsonData.methods[i].returnType.length
        for(let j=0;j<jsonData.methods[i].parameters.length; j++)
        {
            methodLength = methodLength + jsonData.methods[i].parameters[j].name.length + jsonData.methods[i].parameters[j].type.length
        }
        if(size.stringWidth<methodLength) {size.stringWidth = methodLength; size.element="method"}
        size.stringHeight += 1
    }
    return size
}

export {getSize}