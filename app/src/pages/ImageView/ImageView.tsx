import React, { useCallback, useEffect, useState } from "react";
import { useErrorHandler } from 'react-error-boundary'
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from '../../components/ErrorFallback'
import { useDropzone } from 'react-dropzone'
import './ImageView.css'
import ImageControl from './ImageControl'

function ImageView() {
    const [src, setSrc] = useState('')

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

    // ファイルドロップの有効化
    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

    // 各イベントのため要素への参照を取得
    const divRef = React.useRef<HTMLDivElement>(null)

    // スクロールイベント発行
    useEffect(() => {
        const target = document.getElementsByClassName('image-box')[0]

        const wheelEventHandl = (ev) => {
            ImageControl.onWheel(ev)
        }

        target.addEventListener('wheel', wheelEventHandl, { passive: false })

        return () => {
            target.addEventListener('wheel', wheelEventHandl, { passive: false })
        }
    })

    return (
        <ErrorBoundary fallbackRender={ErrorFallback}>
            <div className="image-box"
                ref={divRef}
                {...getRootProps()}
                onMouseDown={() => {}}
                onMouseUp={() => {}}
                onMouseMove={() => {}}
            >
                <input {...getInputProps()} />
                <figure className="figure">
                    <img className="img" src={src}></img>
                </figure>
            </div>
        </ErrorBoundary>
    )
}

export default ImageView
