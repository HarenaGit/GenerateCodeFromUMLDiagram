import { JClass, JMethod, JParameter, JProperty, JavaType, JavaVisibility } from './MetaJavaClass'
import { MetaJavaElement, MetaUMLElement, MetaUMLDataType } from '../utils/MetaElement'

const typeConverter = (UMLDataType) => {
    switch(UMLDataType)
    {
        case MetaUMLDataType.voidType :
            return JavaType.voidType
        case MetaUMLDataType.stringType: 
            return JavaType.stringType
        case MetaUMLDataType.intType:
            return JavaType.intType
        case MetaUMLDataType.doubleType:
            return JavaType.doubleType
        case MetaUMLDataType.floatType:
            return JavaType.floatType
        case MetaUMLDataType.dateType:
            return JavaType.dateType
    }
}

const converter = (Entity) => {
    let JavaClass = JClass.create({name: Entity.get('name')})
    JavaClass.set(MetaJavaElement.CLASS_VISIBILITY, JavaVisibility.public)
    Entity.get(MetaUMLElement.ENTITY_ATTRIBUTES).map((attribute) => {
        let JavaProperty = JProperty.create({name: attribute.get('name')})
        JavaProperty.set(MetaJavaElement.PROPERTY_VISIBILITY, JavaVisibility.private)
        JavaProperty.set(MetaJavaElement.PROPERTY_TYPE, typeConverter(attribute.get(MetaUMLElement.ATTRIBUTE_DATATYPE).get('name')))
        JavaClass.get(MetaJavaElement.CLASS_PROPERTIES).add(JavaProperty)
    })
    Entity.get(MetaUMLElement.ENTITY_OPERATIONS).map((operation) => {
        let JavaMethod = JMethod.create({name: operation.get('name')})
        JavaMethod.set(MetaJavaElement.METHOD_VISIBILITY, JavaVisibility.public)
        JavaMethod.set(MetaJavaElement.METHOD_TYPE, typeConverter(operation.get(MetaUMLElement.OPERATION_DATATYPE).get('name')))
        operation.get(MetaUMLElement.OPERATION_PARAMETERS).map((param) => {
            let parameter = JParameter.create({name: param.get('name')})
            parameter.set(MetaJavaElement.PARAMETER_TYPE, typeConverter(param.get(MetaUMLElement.PARAMETER_DATATYPE).get('name')))
            JavaMethod.get(MetaJavaElement.METHOD_PARAMETERS).add(parameter)
        })
        JavaClass.get(MetaJavaElement.CLASS_METHODS).add(JavaMethod)
    })
    return JavaClass
}

export { converter }