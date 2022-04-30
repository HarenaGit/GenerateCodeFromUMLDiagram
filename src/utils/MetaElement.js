const MetaUMLElement = {
    DATATYPE: "DataType",
    ENTITY: "Entity",
    ATTRIBUTE: "Attribute",
    OPERATION: "Operation",
    PARAMETER: "parameter",
    ENTITY_ATTRIBUTES: "attributes",
    ENTITY_OPERATIONS: "operations",
    OPERATION_PARAMETERS: "parameters",
    ATTRIBUTE_DATATYPE: "type",
    OPERATION_DATATYPE: "returnType",
    PARAMETER_DATATYPE: "type"
}


const MetaUMLDataType = {
    voidType: "UMLVoid",
    stringType: "UMLString",
    intType: "UMLInteger",
    doubleType: "UMLDouble",
    floatType: "UMLFloat",
    dateType: "UMLDate"
}

const MetaJavaElement = {
    TYPE: "Type",
    CLASS: "class",
    PROPERTY: "Property",
    METHOD: "Method",
    PARAMETER: "Parameter",
    VISIBILITY: "Visibility",
    CLASS_VISIBILITY: "visibility",
    CLASS_PROPERTIES: "properties",
    CLASS_METHODS: "method",
    METHOD_PARAMETERS: "parameters",
    PROPERTY_TYPE: "propertyType",
    PROPERTY_VISIBILITY: "visibility",
    METHOD_TYPE: "returnType",
    METHOD_VISIBILITY: "visibility",
    PARAMETER_TYPE: "parameterType"
}

const MetaJavaType = {
    VOID: "void",
    STRING: "String",
    INTEGER: "Integer",
    DOUBLE: "Double",
    FLOAT: "Float",
    DATE: "Date"
}

const MetaJavaVisibility = {
    PUBLIC: "public",
    PRIVATE: "private",
    PROTECTED: "protected"
}

export { MetaUMLElement, MetaUMLDataType, MetaJavaElement, MetaJavaType, MetaJavaVisibility }