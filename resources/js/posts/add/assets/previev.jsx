import React,{useState} from 'react';
import SendForm from './sendForm';

function Preview(props) {

    if(!props.show) return null;
    const[currentSlide,setCurrentSlide]=useState(0);
    const[showSendForm,setShowSendForm]=useState(false);

    var slides=[];
    var urls=[];
    props.files.map((e)=>{
        slides.push(<div className="ImgPreview"  style={{backgroundImage:`url(${e.preview})`}} />);
        urls.push(e.preview);
    });

    const sliderControl={
        cursor:"pointer",
        fontSize: "30px",
        transform: "translate(0, -50%)",
    };
    const sendBtn={
        position:"absolute",
        cursor:"pointer",
        color:"light-blue",
        left:"85%",
        top:"5%",
        fontWeight:"bold",
    };

    const prevSlide=()=>{
        if(currentSlide>0){
            setCurrentSlide(currentSlide-1);
        }
    };
    const nextSlide=()=>{
        if(currentSlide<slides.length-1){
            setCurrentSlide(currentSlide+1);
        }
    };

    const toForm=()=>{
        setShowSendForm(true);
    };

    return(
        <div className="d-flex flex-row" style={{height:"93%"}}>
          <div className="d-flex flex-row align-items-stretch overflow-hidden position-relative" style={{height:"100%",width:"100%"}}>
              <div className="position-absolute top-50 w-100 d-flex justify-content-between">
                  <span className="mx-3" onClick={prevSlide} style={sliderControl}>❰</span>
                  <span className="mx-3" onClick={nextSlide} style={sliderControl}>❱</span>
              </div>

              <span style={sendBtn} className="m-1" onClick={toForm}>Opublikuj</span>
              {
                  slides[currentSlide]
              }
          </div>
            <SendForm show={showSendForm} url={urls} userInfo={userInfo}/>
        </div>
    );
}
export default Preview;
