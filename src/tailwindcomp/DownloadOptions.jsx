import React from 'react'

const DownloadOptions = ({ qualityLabel, quality, type, extension, handleClick, videoId }) => {
    return (
        <div className="flex justify-between my-2 py-3 px-4 border shadow rounded">
            <div className="">
                {/* <span> {quality} </span> */}
                <p>{(qualityLabel || type) + ' ' + extension}</p>
            </div>
            <form method="post" action="http://localhost:5000/youtube/download">
                <input type="hidden" name="videoid" value={videoId} />
                <input type="hidden" name="quality" value={quality} />
                {/* <div className="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center"> */}
                <button type="button" onClick={handleClick} className="animate-bounce outline-none">
                    <svg className="w-6 h-6 text-blue-500 font-bold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </button>
            </form>
        </div>
    )
}

export default DownloadOptions