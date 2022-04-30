import {useRef, useState, useEffect} from 'react'

const useStage = () => {
    const stageRef = useRef(null)
    const [stageWidth, setStageWidth] = useState(10)
    const [stageHeight, setStageHeight] = useState(10)

    const checkSize = () => {
        if(stageRef != null){
            setStageWidth(stageRef.current.offsetWidth)
            setStageHeight(stageRef.current.offsetHeight)
        }
    }

    const setFullSize = () => {
        if(stageRef != null)
        {
            setStageWidth(window.innerWidth)
            setStageHeight(window.innerHeight)
        }
    }

    useEffect(() => {

        window.addEventListener('resize', checkSize)

        return () => {
            window.removeEventListener('resize', checkSize)
        }

    }, [])

    useEffect(() => {
        checkSize()
    }, [stageRef])

    return [stageRef, stageWidth, stageHeight, checkSize, setFullSize]
}

export default useStage;