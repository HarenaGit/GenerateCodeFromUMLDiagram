import Ecore from 'ecore'
import { MetaJavaElement, MetaJavaType, MetaJavaVisibility } from '../utils/MetaElement'



const JType = Ecore.EClass.create({
    name: MetaJavaElement.TYPE,
    eStructuralFeatures: [
        Ecore.EAttribute.create({
            name: 'name',
            upperBound: 1,
            eType: Ecore.Estring
        }),
    ]
})

const JVisibility = Ecore.EClass.create({
    name: MetaJavaElement.VISIBILITY,
    eStructuralFeatures: [
        Ecore.EAttribute.create({
            name: 'name',
            upperBound: 1,
            eType: Ecore.Estring
        })
    ]
})

const JClass = Ecore.EClass.create({
    name: MetaJavaElement.CLASS,
    eStructuralFeatures: [
        Ecore.EAttribute.create({
            name: 'name',
            upperBound: 1,
            eType: Ecore.Estring
        }),
        Ecore.EReference.create({
            name: MetaJavaElement.CLASS_VISIBILITY,
            upperBound: 1,
            containement: false,
            eType:  JVisibility
        })
    ]
})


const JProperty = Ecore.EClass.create({
    name: MetaJavaElement.PROPERTY,
    eStructuralFeatures: [
        Ecore.EAttribute.create({
            name: 'name',
            upperBound: 1,
            eType: Ecore.Estring
        }),
        Ecore.EReference.create({
            name: MetaJavaElement.PROPERTY_TYPE,
            upperBound: 1,
            containement: false,
            eType:  JType
        }),
        Ecore.EReference.create({
            name: MetaJavaElement.PROPERTY_VISIBILITY,
            upperBound: 1,
            containement: false,
            eType:  JVisibility
        })
    ]
})

const JMethod = Ecore.EClass.create({
    name: MetaJavaElement.METHOD,
    eStructuralFeatures: [
        Ecore.EAttribute.create({
            name: 'name',
            upperBound: 1,
            eType: Ecore.Estring
        }),
        Ecore.EReference.create({
            name: MetaJavaElement.METHOD_TYPE,
            upperBound: 1,
            containement: false,
            eType: JType
        }),
        Ecore.EReference.create({
            name: MetaJavaElement.METHOD_VISIBILITY,
            upperBound: 1,
            containement: false,
            eType: JVisibility
        })
    ]
})

const JParameter = Ecore.EClass.create({
    name: MetaJavaElement.PARAMETER,
    eStructuralFeatures: [
        Ecore.EAttribute.create({
            name: 'name',
            upperBound: 1,
            eType: Ecore.Estring
        }),
        Ecore.EReference.create({
            name: MetaJavaElement.PARAMETER_TYPE,
            upperBound: 1,
            containement: false,
            eType: JType
        })
    ]
})

const JClassMethods = Ecore.EReference.create({
    name: MetaJavaElement.CLASS_METHODS,
    upperBound: -1,
    containement: true,
    eType: JMethod
})

const JMethodParameters = Ecore.EReference.create({
    name: MetaJavaElement.METHOD_PARAMETERS,
    upperBound: -1,
    containement: true,
    eType: JParameter
})

const JClassProperties = Ecore.EReference.create({
    name: MetaJavaElement.CLASS_PROPERTIES,
    upperBound: -1,
    containement: true,
    eType: JProperty
})

JMethod.get('eStructuralFeatures')
          .add(JMethodParameters)

JClass.get('eStructuralFeatures')
        .add(JClassProperties)
        .add(JClassMethods)




const JavaType = {
    voidType : JType.create({name: MetaJavaType.VOID}),
    stringType: JType.create({name: MetaJavaType.STRING}),
    intType: JType.create({name: MetaJavaType.INTEGER}),
    doubleType: JType.create({name: MetaJavaType.DOUBLE}),
    floatType: JType.create({name: MetaJavaType.FLOAT}),
    dateType: JType.create({name: MetaJavaType.DATE})
}

const JavaVisibility = {
    public: JVisibility.create({name: MetaJavaVisibility.PUBLIC}),
    private: JVisibility.create({name: MetaJavaVisibility.PRIVATE}),
    protected: JVisibility.create({name: MetaJavaVisibility.PROTECTED})
}

export { JClass, JProperty, JMethod, JParameter, JavaType, JavaVisibility }