
import ProcessingCard from "../tailwindcomp/ProcessingCard"
import CustomCard from "../tailwindcomp/CustomCard"
const RelatedVideos = ({ data }) => {
    let videos = data.infoData.related_videos || []
    return (
        <section className="text-gray-700 body-font">
            <h1 className="text-gray-700 text-2xl">{data.flag === false && data.dataFetched ? 'Related Videos' : ''}</h1>
            <div className="container px-5 py-4 mx-auto">
                <div className="flex flex-wrap sm:mx-4">
                    {
                        data.flag ?
                            [1, 2, 3].map((val, index) => (<ProcessingCard key={index} />))
                            : data.dataFetched ?
                                videos.map((val, index) => (
                                    <CustomCard
                                        key={index}
                                        title={val.title}
                                        description=''
                                        viewCount={val.short_view_count_text}
                                        img={val.thumbnails[1]}
                                        category={val.author.name}
                                    />

                                ))
                                :
                                ''
                    }
                </div>
            </div>
        </section>
    )
}

export default RelatedVideos