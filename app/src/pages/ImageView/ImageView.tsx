import React, { useCallback, useState } from "react";
import { useErrorHandler } from 'react-error-boundary'
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from '../../components/ErrorFallback'
import { useDropzone } from 'react-dropzone'
import './ImageView.css'

function ImageView() {
    const [src, setSrc] = useState('')
    const [hasError, setError] = useState(false)
    const handleError = useErrorHandler()

    /*
    const applyError = () => {
        try {
            throw new Error("apply error")
        }
        catch (e) {
            setError(true)
            handleError(e)
        }
    }
    */

    // ファイルを開く対応
    window.viewImage.viewImage((ev, dataUrl) => {
        if (!dataUrl) { return }
        setSrc(dataUrl)
    })

    // ドロップされたファイルの受け入れチェックしてipcに投げる
    const onDrop = useCallback((acceptedFiles) => {
        const target = acceptedFiles[0]
        if ( !target.type.match( /^image\/.*/ ) ) { return }
        window.dropFile.dropFile(target.path.replace('\\', '/'))
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

    return (
        <ErrorBoundary fallbackRender={ErrorFallback}>
            <div className="image-box" {...getRootProps()}>
                <input {...getInputProps()} />
                <figure className="figure">
                    <img className="img" src={src}></img>
                </figure>
            </div>
        </ErrorBoundary>
    )
}

export default ImageView
