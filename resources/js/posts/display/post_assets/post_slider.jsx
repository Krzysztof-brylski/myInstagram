import React,{useState,useEffect} from 'react';

function Post_slider(param) {

    const [currentSlide,setCurrentSlide]=useState(0);
    const [displayControl,setDisplayControl]=useState(true);
    const postImage={
        padding:"1px",
        width:"inherit",
        height:"inherit",

    };
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




    const slides=param.data.images.map(image=>(
        <img className="w-100 h-100" style={postImage}  src={param.storage+'/'+image}/>
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
