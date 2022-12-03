import React,{useState} from 'react';
import SendForm from './sendForm';
function Preview(props) {

    if(!props.show) return null;
    const[currentSlide,setCurrentSlide]=useState(0);

    var slides=[];

    props.files.map((e)=>{
        slides.push(<div className="ImgPreview"  style={{backgroundImage:`url(${e.preview})`}} />);

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
    let style={
        height:"100%",
        width:"100%"
    };
    if(props.sendform === true){
        style={
            height:"100%",
            width:"70%"
        };
    }
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
        props.showsendform(true);
        sendBtn.add({
            display:"none",
        })
    };

    return(
        <div className="d-flex flex-row" style={{height:"93%"}}>
          <div className="d-flex flex-row align-items-stretch overflow-hidden position-relative" style={style}>
              <div className="position-absolute top-50 w-100 d-flex justify-content-between">
                  <span className="mx-3" onClick={prevSlide} style={sliderControl}>❰</span>
                  <span className="mx-3" onClick={nextSlide} style={sliderControl}>❱</span>
              </div>

              <span style={sendBtn} className="m-1" onClick={toForm}>Opublikuj</span>
              {
                  slides[currentSlide]
              }
          </div>
            <SendForm show={props.sendform} files={props.files} userInfo={userInfo} killModal={props.killModal} />
        </div>
    );
}
export default Preview;
