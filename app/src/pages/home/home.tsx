import React, { MouseEventHandler } from "react";
import { useErrorHandler } from 'react-error-boundary'

function Home() {
    const handleError = useErrorHandler()

    const applyError = () => {
        try {
            throw new Error("apply error")
        }
        catch (e) {
            handleError(e)
        }
    }

    return (
        <React.Fragment>
            <p>Home</p>
            <span onClick={applyError}>Apply Error!</span>
        </React.Fragment>
    )
}

export default Home
