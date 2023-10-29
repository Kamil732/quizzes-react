import React from 'react'

function Request({ request }) {
    return (
        <>
            {
                request.error ? (
                    <code>{request.error}</code>
                ) : <></>
            }
            {
                request.loading ? (
                    <div className="loader"></div>
                ) : <></>
            }
        </>
    )
}

export default Request
