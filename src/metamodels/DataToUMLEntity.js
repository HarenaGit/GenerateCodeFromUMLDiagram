import { Entity, Attribute, Operation, Parameter, DataType } from "./MetaClassDiagram";
import { MetaUMLElement } from "../utils/MetaElement";


const convertToUMLEntity = (data) => {

    let entity = Entity.create({name: data.name})
    data.properties.map((property, index) => {
        let attribute = Attribute.create({name: property.name})
        attribute.set(MetaUMLElement.ATTRIBUTE_DATATYPE, DataType.create({name: property.type}))
        entity.get(MetaUMLElement.ENTITY_ATTRIBUTES).add(attribute)
    })
    data.methods.map((method, index) => {
        let operation = Operation.create({name: method.name})
        operation.set(MetaUMLElement.OPERATION_DATATYPE, DataType.create({name: method.returnType}))
        method.parameters.map((parameter, idx) => {
            let param = Parameter.create({name: parameter.name })
            param.set(MetaUMLElement.PARAMETER_DATATYPE, DataType.create({name: parameter.type}))
            operation.get(MetaUMLElement.OPERATION_PARAMETERS).add(param)
        })
        entity.get(MetaUMLElement.ENTITY_OPERATIONS).add(operation)
    })
    return entity
}

export default convertToUMLEntity