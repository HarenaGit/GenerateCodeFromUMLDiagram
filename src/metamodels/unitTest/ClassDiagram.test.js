import { Entity, Attribute, Operation, Parameter, DataTypeUML } from "../MetaClassDiagram";
import {MetaUMLElement} from "../../utils/MetaElement";
import { generateClassCode } from "../MetaJavaClass2Code";
import { converter } from "../MetaUML2MetaJava";

const show = (entityTest) => {

    console.log('Entites : ', entityTest.get('name'))
    console.log('..... Attributes .....')
    entityTest.get(MetaUMLElement.ENTITY_ATTRIBUTES).map((attribute) => {
        console.log(`${attribute.get('name')} : ${attribute.get(MetaUMLElement.ATTRIBUTE_DATATYPE).get('name')}`)
    })
    console.log('..... Operations .....')
    entityTest.get(MetaUMLElement.ENTITY_OPERATIONS).map((operation) => {
        let params = '('
        operation.get(MetaUMLElement.OPERATION_PARAMETERS).map((parameter, idx) => {
            var concat = idx !== 0 ? ' , ' : ''
            params = `${params}${concat}${parameter.get('name')} : ${parameter.get(MetaUMLElement.PARAMETER_DATATYPE).get('name')}`
        })
        params = `${params})`
        console.log(`${operation.get('name')}${params} : ${operation.get(MetaUMLElement.OPERATION_DATATYPE).get('name')}`)
    })
}

let entityTest = Entity.create({name: 'Personne'})

let attribute1 = Attribute.create({name: 'nom'})
attribute1.set(MetaUMLElement.ATTRIBUTE_DATATYPE, DataTypeUML.stringType)
let attribute2 = Attribute.create({name: 'taille'})
attribute2.set(MetaUMLElement.ATTRIBUTE_DATATYPE, DataTypeUML.doubleType)
let attribute3 = Attribute.create({name: 'poids'})
attribute3.set(MetaUMLElement.ATTRIBUTE_DATATYPE, DataTypeUML.doubleType)

entityTest.get(MetaUMLElement.ENTITY_ATTRIBUTES).add(attribute1)
entityTest.get(MetaUMLElement.ENTITY_ATTRIBUTES).add(attribute2)
entityTest.get(MetaUMLElement.ENTITY_ATTRIBUTES).add(attribute3)

let operation1 = Operation.create({name: 'marcher'})
operation1.set(MetaUMLElement.OPERATION_DATATYPE, DataTypeUML.voidType)
let param1 = Parameter.create({name: 'vitesse'})
param1.set(MetaUMLElement.PARAMETER_DATATYPE, DataTypeUML.doubleType)
operation1.get(MetaUMLElement.OPERATION_PARAMETERS).add(param1)
entityTest.get(MetaUMLElement.ENTITY_OPERATIONS).add(operation1)
let operation2 = Operation.create({name: 'dormir'})
let param2 = Parameter.create({name: 'durre'})
param2.set(MetaUMLElement.PARAMETER_DATATYPE, DataTypeUML.dateType)
let param3 = Parameter.create({name: 'debut'})
param3.set(MetaUMLElement.PARAMETER_DATATYPE, DataTypeUML.dateType)
operation2.get(MetaUMLElement.OPERATION_PARAMETERS).add(param2)
operation2.get(MetaUMLElement.OPERATION_PARAMETERS).add(param3)
operation2.set(MetaUMLElement.OPERATION_DATATYPE, DataTypeUML.voidType)
entityTest.get(MetaUMLElement.ENTITY_OPERATIONS).add(operation2)



show(entityTest)

const javaTestClass = converter(entityTest)

const code = generateClassCode(javaTestClass)

export default code;





