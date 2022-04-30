import Ecore from 'ecore'
import { MetaUMLElement, MetaUMLDataType } from '../utils/MetaElement'


const Entity = Ecore.EClass.create({
    name: MetaUMLElement.ENTITY,
    eStructuralFeatures: [
        Ecore.EAttribute.create({
            name: 'name',
            upperBound: 1,
            eType: Ecore.Estring
        })
    ]
})

const DataType = Ecore.EClass.create({
    name: MetaUMLElement.DATATYPE,
    eStructuralFeatures: [
        Ecore.EAttribute.create({
            name: 'name',
            upperBound: 1,
            eType: Ecore.Estring
        }),
    ]
})

const Attribute = Ecore.EClass.create({
    name: MetaUMLElement.ATTRIBUTE,
    eStructuralFeatures: [
        Ecore.EAttribute.create({
            name: 'name',
            upperBound: 1,
            eType: Ecore.Estring
        }),
        Ecore.EReference.create({
            name: MetaUMLElement.ATTRIBUTE_DATATYPE,
            upperBound: 1,
            containement: false,
            eType:  DataType
        })
    ]
})

const Operation = Ecore.EClass.create({
    name: MetaUMLElement.OPERATION,
    eStructuralFeatures: [
        Ecore.EAttribute.create({
            name: 'name',
            upperBound: 1,
            eType: Ecore.Estring
        }),
        Ecore.EReference.create({
            name: MetaUMLElement.OPERATION_DATATYPE,
            upperBound: 1,
            containement: false,
            eType: DataType
        })
    ]
})

const Parameter = Ecore.EClass.create({
    name: MetaUMLElement.PARAMETER,
    eStructuralFeatures: [
        Ecore.EAttribute.create({
            name: 'name',
            upperBound: 1,
            eType: Ecore.Estring
        }),
        Ecore.EReference.create({
            name: MetaUMLElement.PARAMETER_DATATYPE,
            upperBound: 1,
            containement: false,
            eType: DataType
        })
    ]
})

const EntityOperations = Ecore.EReference.create({
    name: MetaUMLElement.ENTITY_OPERATIONS,
    upperBound: -1,
    containement: true,
    eType: Operation
})

const OperationParams = Ecore.EReference.create({
    name: MetaUMLElement.OPERATION_PARAMETERS,
    upperBound: -1,
    containement: true,
    eType: Parameter
})

const EntityAttributes = Ecore.EReference.create({
    name: MetaUMLElement.ENTITY_ATTRIBUTES,
    upperBound: -1,
    containement: true,
    eType: Attribute
})

Entity.get('eStructuralFeatures')
        .add(EntityAttributes)
        .add(EntityOperations)

Operation.get('eStructuralFeatures')
          .add(OperationParams)


const DataTypeUML = {
    voidType : DataType.create({name: MetaUMLDataType.voidType}),
    stringType: DataType.create({name: MetaUMLDataType.stringType}),
    intType: DataType.create({name: MetaUMLDataType.intType}),
    doubleType: DataType.create({name: MetaUMLDataType.doubleType}),
    floatType: DataType.create({name: MetaUMLDataType.floatType}),
    dateType: DataType.create({name: MetaUMLDataType.dateType})
}

export { Entity, Attribute, Operation, Parameter, DataTypeUML, DataType }