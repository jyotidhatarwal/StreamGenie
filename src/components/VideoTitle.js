const VideoTitle = ({title, description}) => {
    return(
        <div className="mt-[6rem] sm:mt-[6rem] md:mt-[8rem] lg:mt-[10rem] xl:mt-[16rem] ml-8 sm:ml-8 lg:ml-12 p-2 w-1/2 absolute text-white z-30">
            <h1 className="text-lg sm:text-2xl md:text-3xl xl:text-5xl py-0 sm:py-4 font-bold">{title}</h1>
            <p className="text-xs md:text-xs lg:text-lg xl:text-xl truncate sm:whitespace-normal sm:overflow-visible">{description}</p>
            <div className="mt-2 sm:mt-auto py-2 sm:py-4 flex justify-start">
                <button className="text-xs md:text-xs lg:text-md xl:text-lg p-2 px-5 sm:p-3 ml-0 mr-5 sm:mx-3 lg:my-4 lg:mr-4 lg:px-10 lg:py-3 bg-white text-black rounded-lg hover:bg-opacity-60 font-semibold"> ▶️ &nbsp; Play</button>
                <button className="text-xs md:text-xs lg:text-md xl:text-lg p-2 sm:p-3 w-[280px] sm:w-auto mx-0 px-1 sm:mx-3 lg:my-4 lg:mr-4 lg:px-8 lg:py-3 text-white bg-gray-500 bg-opacity-80 hover:bg-opacity-60 rounded-lg font-semibold text-center"> ⓘ &nbsp; More info</button>
            </div>
        </div>
    )
}

export default VideoTitle;