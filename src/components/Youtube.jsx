import { useState } from 'react'
import SearchButton from "../tailwindcomp/SearchButton"
import ProcessingButton from "../tailwindcomp/ProcessingButton"
import ProcessingCard from "../tailwindcomp/ProcessingCard"
const Youtube = () => {
    const [search, setSearch] = useState(
        {
            flag: false,
            infoData: [],
            url: '',
            failedMsg: '',
        }
    )
    const getInfo = () => {
        // let re = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/watch\?v=([^&]+)/m;
        if (!search.url || matchYoutubeUrl(search.url) === false) {
            setSearch({ ...search, flag: false, failedMsg: '!Invalid url, Please give currect one' })
        } else {
            setSearch({ ...search, flag: true, failedMsg: '' })
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
                {
                    search.flag ?
                        <section className="text-gray-700 body-font">
                            <h1 className="text-gray-700 text-2xl">Related Videos</h1>
                            <div className="container px-5 py-4 mx-auto">
                                <div className="flex flex-wrap mx-4">
                                    {[1, 2, 3].map((val, index) => (<ProcessingCard key={index} />))}
                                </div>
                            </div>
                        </section>
                        :
                        ''
                }
            </div>

        </>
    )
}

export default Youtube