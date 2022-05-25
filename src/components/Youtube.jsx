import { useState } from 'react'
import SearchButton from "../tailwindcomp/SearchButton"
import ProcessingButton from "../tailwindcomp/ProcessingButton"
import ProcessingOptions from "../tailwindcomp/ProcessingOptions"
import DownloadOptions from "../tailwindcomp/DownloadOptions"
import RelatedVideos from './RelatedVideos'
import Alert from '../tailwindcomp/Alert'
const Youtube = () => {
    const [search, setSearch] = useState(
        {
            flag: false,
            infoData: [],
            dataFetched: false,
            url: '',
            failedMsg: '',
        }
    )
    const getInfo = (e) => {
        e.preventDefault()
        let searchUrl = search.url
        // let re = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/watch\?v=([^&]+)/m
        if (!searchUrl || matchYoutubeUrl(searchUrl) === false) {
            setSearch({ ...search, flag: false, failedMsg: '!Invalid url, Please give currect one' })
        } else {
            setSearch({ ...search, flag: true, failedMsg: '' })
            let urlArr = searchUrl.split('/')
            let videoId = urlArr[urlArr.length - 1]
            let apiUrl = `https://json-base.herokuapp.com/youtube/getinfo?videoid=${videoId}&url=${searchUrl}`
            console.log(apiUrl)
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    setSearch({ ...search, flag: false, infoData: data, dataFetched: true, url: '' })
                    console.log(data)
                })
                .catch((err) => {
                    console.error(err)
                    // alert('Failed to get video info')
                    setSearch({ ...search, flag: false, failedMsg: err.toString() })
                })

        }
    }
    const matchYoutubeUrl = (url) => {
        var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
        if (url.match(p)) {
            return url.match(p)[1]
        }
        return false
    }
    // const downloadVideo = (mimeType, quality) => {

    // }
    const handleUrlChange = (e) => {
        setSearch({ ...search, url: e.target.value })
    }
    const closeAlert = () => {
        setSearch({ ...search, failedMsg: '' })
    }

    let videoId = search.dataFetched ? search.infoData.videoDetails.videoId : ''
    let videoName = search.dataFetched ? search.infoData.videoDetails.title : ''
    return (
        <>
            <div className="mt-5 mx-5">
                {!search.flag && search.failedMsg !== '' ? <Alert type='red' title='error' message={search.failedMsg} onClose={closeAlert} /> : ''}
                <div className="flex justify-center">
                    {/* <div className="mb-3 xl:w-96"> */}
                    <div className="mb-3">
                        <form onSubmit={getInfo} className="group input-group relative flex justify-center items-stretch w-full mb-4 rounded">
                            <input type="text"
                                className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xl shadow m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none hover:shadow-lg"
                                placeholder="Youtube URL"
                                value={search.url}
                                onChange={handleUrlChange}
                            />
                            {search.flag ? <ProcessingButton /> : <SearchButton buttonType="submit" />}
                        </form>
                    </div>
                </div>
                <div className="mt-5 mx-5">
                    <h1 className="text-gray-700 text-xl">{search.flag === false && search.dataFetched ? 'Available Formates' : 'Available Formates'}</h1>
                    {
                        search.flag ? [1, 2, 3, 4].map((val, index) => (
                            <ProcessingOptions key={index} />
                        ))
                            :
                            search.dataFetched ?
                                search.infoData.formats.map((val, index) => {
                                    let [mediaType, options] = val.mimeType.split('; ')
                                    let [type, extension] = mediaType.split('/')
                                    return <DownloadOptions
                                        key={index}
                                        fromatIndex={index}
                                        type={type}
                                        mediaType={mediaType}
                                        extension={extension}
                                        videoId={videoId}
                                        videoName={videoName}
                                        itag={val.itag}
                                        video={val}
                                    />
                                })
                                :
                                ''
                    }
                </div>

                <RelatedVideos data={search} />

            </div>

        </>
    )
}

export default Youtube