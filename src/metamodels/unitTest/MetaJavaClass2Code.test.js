import { JClass, JMethod, JProperty, JParameter, JavaType, JavaVisibility } from '../MetaJavaClass'
import { MetaJavaElement } from '../../utils/MetaElement'
import { generateClassCode } from '../MetaJavaClass2Code'

let javaTestClass = JClass.create({name: "Personne"})
javaTestClass.set(MetaJavaElement.CLASS_VISIBILITY, JavaVisibility.public)
let prt1 = JProperty.create({name: 'taille'})
prt1.set(MetaJavaElement.PROPERTY_TYPE, JavaType.intType)
prt1.set(MetaJavaElement.PROPERTY_VISIBILITY, JavaVisibility.private)
let prt2 = JProperty.create({name: 'poids'})
prt2.set(MetaJavaElement.PROPERTY_TYPE, JavaType.doubleType)
prt2.set(MetaJavaElement.PROPERTY_VISIBILITY, JavaVisibility.private)
javaTestClass.get(MetaJavaElement.CLASS_PROPERTIES).add(prt1)
javaTestClass.get(MetaJavaElement.CLASS_PROPERTIES).add(prt2)
let method1 = JMethod.create({name: 'parler'})
method1.set(MetaJavaElement.METHOD_TYPE, JavaType.stringType)
method1.set(MetaJavaElement.METHOD_VISIBILITY, JavaVisibility.public)
let param1 = JParameter.create({name: 'vitesse'})
param1.set(MetaJavaElement.PARAMETER_TYPE, JavaType.doubleType)
method1.get(MetaJavaElement.METHOD_PARAMETERS).add(param1)
javaTestClass.get(MetaJavaElement.CLASS_METHODS).add(method1)



const code = generateClassCode(javaTestClass)

export default code