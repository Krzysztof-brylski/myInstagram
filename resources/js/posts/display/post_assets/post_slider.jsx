import React,{useState,useEffect} from 'react';

function Post_slider(param) {

    const [currentSlide,setCurrentSlide]=useState(0);

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
        border:"rgba(255,255,255,0.9) 1px solid",
        borderRadius:"100%",
        width:"20px",
        height:"20px",
    };
    const selectedPointer={
        pointer,
        color:"rgba(255,255,255,0.9)",
    };

    const slides=param.data.images.map(image=>(
        <img className="w-100" style={postImage}  src={param.storage+'/'+image}/>
    ));

    const slidePointers=slides.map((element,index)=>{
        if(slides.length == 0 || slides.length ==1){return null;}
        if(index == currentSlide){
            return(<span className="mx-2" style={selectedPointer}></span>)
        }
        return(<span className="mx-2" style={pointer}></span>)
    });
    console.log(slidePointers);
    const nextSlide=()=>{
        if(currentSlide+1 < slides.length){
            setCurrentSlide(currentSlide+1);
            console.log(currentSlide);
        }
    };
    const pervSlide=()=>{
        if(currentSlide-1 >= 0){
            setCurrentSlide(currentSlide-1);
        }
    };

    return(
        <div className="w-100 d-flex flex-row overflow-hidden position-relative">
            <div className="position-absolute top-50 w-100 d-flex flex-column">
                <div className="w-100 d-flex justify-content-between">
                    <span onClick={pervSlide} className="p-2" style={sliderControl}>❰</span>
                    <span onClick={nextSlide} className="p-2" style={sliderControl}>❱</span>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    {slidePointers}
                </div>

            </div>
            {slides[currentSlide]}
        </div>
    )
}
export default Post_slider;
