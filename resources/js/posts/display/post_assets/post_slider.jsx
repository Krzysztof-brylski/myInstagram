import React,{useState,useEffect} from 'react';

/**
 * displaying post images slider component
 * @component
 * @param {boolean} preview; true if post slider is displayed in post preview component
 * @param {Array} data; array with post images
 * @returns {*}
 * @constructor
 */
function Post_slider({preview,data,}) {

    const [currentSlide,setCurrentSlide]=useState(0);
    const [displayControl,setDisplayControl]=useState(true);
    if(preview){
        var postImage={
            padding:"0",
            width:"inherit",
            height:"inherit",
            border:"solid 0 transparent",
            borderRadius:" 15px 0 0 15px"
        };

    }else{
        var postImage={
            padding:"0",
            width:"inherit",
            height:"inherit",
            border:"solid 0 transparent",
        };
    }



    const sliderControl={
        cursor:"pointer",
        border:"transparent 1px solid",
        borderRadius:"100%",
        width:"35px",
        height:"35px",
        margin:"10px",
        transform: "translate(0, -50%)",
        backgroundColor:"rgba(255,255,255,0.9)",
        display:"flex",
        justifyContent:"center",
        alignContent:"center",
    };
    const pointer={
        cursor:"pointer",
        border:"transparent 1px solid",
        borderRadius:"100%",
        width:"10px",
        height:"10px",
        backgroundColor:"rgba(255,255,255,0.4)",
    };
    const selectedPointer={
        cursor:"pointer",
        border:"transparent 1px solid",
        borderRadius:"100%",
        width:"10px",
        height:"10px",
        backgroundColor:"rgba(255,255,255,1)",
        alignContent: ""
    };




    const slides=data.images.map(image=>(
        <img className="w-100 h-100" style={postImage}  src={storage+'/'+image}/>
    ));

    const slidePointers=slides.map((element,index)=>{

        if(index == currentSlide){
            return(<span className="mx-1" style={selectedPointer}></span>)
        }
        return(<span className="mx-1"  style={pointer}></span>)
    });

    const nextSlide=()=>{
        if(currentSlide+1 < slides.length){
            setCurrentSlide(currentSlide+1);
        }
    };
    const pervSlide=()=>{
        if(currentSlide-1 >= 0){
            setCurrentSlide(currentSlide-1);
        }
    };

    useEffect(()=>{
        if(slides.length === 1){
            setDisplayControl(false)
        }
    });

    return(
        <div className="h-100 w-100 position-relative">
            {
                displayControl &&
                (
                    <div className="position-absolute top-50 w-100 h-50 d-flex flex-column">

                        <div className="w-100 d-flex justify-content-between">
                            <span onClick={pervSlide} className="p-2" style={sliderControl}>❰</span>
                            <span onClick={nextSlide} className="p-2" style={sliderControl}>❱</span>
                        </div>
                        <div className="d-flex flex-row justify-content-center h-75 py-3" style={{alignItems:"flex-end"}}>
                            {slidePointers}
                        </div>
                    </div>
                )
            }
            {slides[currentSlide]}
        </div>
    )
}
export default Post_slider;
