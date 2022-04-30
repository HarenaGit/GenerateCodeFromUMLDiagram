import React, {createContext} from 'react'

const StageContext  = createContext()

const StageProvider = ({data, children}) => {
    return(
        <StageContext.Provider value={data}>
            {children}
        </StageContext.Provider>
    )
}

const StageConsumer = ({children}) => {
    return(
        <StageContext.Consumer>
            {children}
        </StageContext.Consumer>
    )
}

export {StageConsumer, StageProvider}

export default StageContext