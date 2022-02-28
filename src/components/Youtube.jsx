import { useState } from 'react'
import SearchButton from "../tailwindcomp/SearchButton"
import ProcessingButton from "../tailwindcomp/ProcessingButton"
import ProcessingOptions from "../tailwindcomp/ProcessingOptions"
import RelatedVideos from './RelatedVideos'
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
    const getInfo = () => {
        let searchUrl = search.url
        // let re = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/watch\?v=([^&]+)/m;
        if (!searchUrl || matchYoutubeUrl(searchUrl) === false) {
            setSearch({ ...search, flag: false, failedMsg: '!Invalid url, Please give currect one' })
        } else {
            setSearch({ ...search, flag: true, failedMsg: '' })
            let apiUrl = `http://localhost:5000/youtube/getinfo?url=${searchUrl}`
            console.log(apiUrl)
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    setSearch({ ...search, flag: false, infoData: data, dataFetched: true, url: '' })
                    console.log(data)
                })

        }
    }
    const matchYoutubeUrl = (url) => {
        var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url.match(p)) {
            return url.match(p)[1];
        }
        return false;
    }
    const handleUrlChange = (e) => {
        setSearch({ ...search, url: e.target.value })
    }
    return (
        <>
            <div className="mt-5 mx-5">
                <div className="flex justify-center">
                    {/* <div className="mb-3 xl:w-96"> */}
                    <div className="mb-3">
                        <div className="group input-group relative flex justify-center items-stretch w-full mb-4 rounded">
                            <input type="text"
                                className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xl shadow m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none hover:shadow-lg"
                                placeholder="Youtube URL"
                                value={search.url}
                                onChange={handleUrlChange}
                            />
                            {search.flag ? <ProcessingButton /> : <SearchButton handleClick={getInfo} />}
                        </div>
                    </div>
                </div>
                <div className="mt-5 mx-5">
                    <h1 className="text-gray-700 text-xl">{search.flag === false && search.dataFetched ? 'Available Formates' : 'Available Formates'}</h1>
                    {
                        [1, 2, 3, 4].map((val, index) => (
                            <ProcessingOptions key={index} />
                        ))
                    }
                </div>

                <RelatedVideos data={search} />

            </div>

        </>
    )
}

export default Youtube