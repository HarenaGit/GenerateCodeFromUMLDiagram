import { MetaJavaElement, MetaJavaType } from "../utils/MetaElement"
import {JavaVisibility, JavaType } from './MetaJavaClass'

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const loopJavaElement = (parent, element, litterals) => {
    let ltrs = ''
    parent.get(element).map((value, idx) => {
        ltrs = litterals(ltrs, value, idx)
    })
    return ltrs
}
const setType = (parent, element, type) => {
    switch(parent.get(element).get('name'))
    {
        case MetaJavaType.STRING : 
                if(!type.includes(MetaJavaType.STRING)) type.push(MetaJavaType.STRING);
                break;
        case MetaJavaType.DOUBLE : 
                if(!type.includes(MetaJavaType.DOUBLE)) type.push(MetaJavaType.DOUBLE);
                break;
        case MetaJavaType.INTEGER : 
                if(!type.includes(MetaJavaType.INTEGER)) type.push(MetaJavaType.INTEGER);
                break;
        case MetaJavaType.FLOAT : 
                if(!type.includes(MetaJavaType.FLOAT)) type.push(MetaJavaType.FLOAT);
                break;
        case MetaJavaType.DATE : 
                if(!type.includes(MetaJavaType.DATE)) type.push(MetaJavaType.DATE);
                break;

    }
}

const generateClassCode = (JClass) => {
    
    const importUsedType = (JClass) => {
        let type = []
        JClass.get(MetaJavaElement.CLASS_PROPERTIES).map((property) => {
            setType(property, MetaJavaElement.PROPERTY_TYPE, type)
        })
        JClass.get(MetaJavaElement.CLASS_METHODS).map((method) => {
            setType(method, MetaJavaElement.METHOD_TYPE, type)
            method.get(MetaJavaElement.METHOD_PARAMETERS).map((parameter) =>{
                setType(parameter, MetaJavaElement.PARAMETER_TYPE, type)
            })
        })
        let imported = ''
        for(let i=0;i<type.length;i++)
        {
            imported = `${imported}import java.lang.${type[i]};\n`
        }
    
        return imported;
    
    }
    const code = 
    `
// import 
${importUsedType(JClass)}

${JClass.get(MetaJavaElement.CLASS_VISIBILITY).get('name')} class ${JClass.get('name')}
{
    // Properties
    ${loopJavaElement(JClass, MetaJavaElement.CLASS_PROPERTIES, (attributes, property, index) => { return `${attributes}${property.get(MetaJavaElement.PROPERTY_VISIBILITY).get('name')} ${property.get(MetaJavaElement.PROPERTY_TYPE).get('name')} ${property.get('name')};\n\t` })}
    
    // Constructor
    ${JavaVisibility.public.get('name')} ${JClass.get('name')}(${loopJavaElement(JClass, MetaJavaElement.CLASS_PROPERTIES, (parameters, property, index) => { return `${parameters}${index === 0 ? '' : `, `}${property.get(MetaJavaElement.PROPERTY_TYPE).get('name')} ${property.get('name')}` })})
    {
        // properties definition
        ${loopJavaElement(JClass, MetaJavaElement.CLASS_PROPERTIES, (attributes, property, index) => { return `${attributes}this.${property.get('name')} = ${property.get('name')};\n\t\t` })}
    }

    // methods
    ${loopJavaElement(JClass, MetaJavaElement.CLASS_METHODS, (methodes, method, idx) => { return `${methodes}${method.get(MetaJavaElement.METHOD_VISIBILITY).get('name')} ${method.get(MetaJavaElement.METHOD_TYPE).get('name')} ${method.get('name')}(${loopJavaElement(method, MetaJavaElement.METHOD_PARAMETERS, (parameters, parameter, index) => { return `${parameters}${index === 0 ? '' : `, `}${parameter.get(MetaJavaElement.PARAMETER_TYPE).get('name')} ${parameter.get('name')}` })}){}\n\t` } )}

    // getter 
    ${loopJavaElement(JClass, MetaJavaElement.CLASS_PROPERTIES, (getters, property, index) => { return `${getters}${JavaVisibility.public.get('name')} ${property.get(MetaJavaElement.PROPERTY_TYPE).get('name')} get${capitalize(property.get('name'))}(){ return this.${property.get('name')}; }\n\t`} )}
    
    // setter 
    ${loopJavaElement(JClass, MetaJavaElement.CLASS_PROPERTIES, (setters, property, index) => { return `${setters}${JavaVisibility.public.get('name')} ${JavaType.voidType.get('name')} set${capitalize(property.get('name'))}(${property.get(MetaJavaElement.PROPERTY_TYPE).get('name')} ${property.get('name')}){ this.${property.get('name')} = ${property.get('name')}; }\n\t`} )}

}
    `
    return code;
}

export { generateClassCode };