// import blob from '../../data/blob/blob.svg';

const BlobBackground = () => {

    const global_blob = `absolute opacity-30 blur-[30px] animate-[float_8s_ease-in-out_infinite]`
    const blob1 = `top-[20%] left-[10%] w-[300px] h-[300px]`
    const blob2 = `top-[60%] left-[70%] w-[200px] h-[200px]`

    return (
        <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden bg-[#537D5D]">
            <div className="global-blob">
                <img src="/images/blob/blob2.svg" className={`${global_blob} ${blob1}`} alt="Decorative blob" />
            </div>
            <div className="global-blob">
                <img src="/images/blob/blob2.svg" className={`${global_blob} ${blob2}`} alt="Decorative blob" />
            </div>
        </div>
    )
}

export default BlobBackground;
