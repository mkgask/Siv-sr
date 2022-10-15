import React from 'react'
import { styled } from '@stitches/react';
import * as Dialog from '@radix-ui/react-dialog';


/*
const Overlay = styled(Dialog.Overlay, {
    background: 'rgba(0 0 0 / 0.5)',
    position: 'fixed',
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'grid',
    placeItems: 'center',
    overflowY: 'auto',
});

const Content = styled(Dialog.Content, {
    minWidth: 300,
    background: 'white',
    padding: 30,
    borderRadius: 4,
});
*/


function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger />
                <Dialog.Portal>
                    <Dialog.Overlay>
                        <Dialog.Content>
                            <p>Error: </p>
                            <pre>{error.message}</pre>
                            <button onClick={resetErrorBoundary}>Try again</button>
                        </Dialog.Content>
                    </Dialog.Overlay>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}

export default ErrorFallback
