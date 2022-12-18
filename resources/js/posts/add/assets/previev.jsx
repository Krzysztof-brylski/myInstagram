import React,{useState} from 'react';
import Send_form from './Send_form';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";

/**
 * display post images preview,
 * images slider, deleting images from post
 * @component
 * @param {boolean} display; boolean for displaying image preview
 * @param {Array} files; array with images
 * @param {boolean} sendForm; boolean for displaying form-send element
 * @param {function} showSendForm; function showing form-send element
 * @param {function} killModal; function closing modal
 * @returns {null|<Preview/>}
 *
 */
function Preview({display,files,sendForm,showSendForm,killModal}) {

    if(!display) return null;
    const[currentSlide,setCurrentSlide]=useState(0);
    const[deletedSlides,setDeletedSlides]=useState([]);
    var slides=[];

    files.map((e, key)=>{
        if(!(key in deletedSlides)){
            slides.push(<div className="ImgPreview"  style={{backgroundImage:`url(${e.preview})`}} />);
        }
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
    const dellImageStyle={
        position:"absolute",
        cursor:"pointer",
        color:"light-blue",
        right:"90%",
        top:"5%",
    };
    let style={
        height:"100%",
        width:"100%"
    };
    if(sendForm === true){
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
        showSendForm(true);
        sendBtn.add({
            display:"none",
        })
    };

    const dellImage=()=>{
        setDeletedSlides((prev)=>[...prev,currentSlide]);
        if(slides.length === 1){
            killModal();
        }
    };
    return(
        <div className="d-flex flex-row" style={{height:"93%"}}>
          <div className="d-flex flex-row align-items-stretch overflow-hidden position-relative" style={style}>
              <div className="position-absolute top-50 w-100 d-flex justify-content-between">
                  <span className="mx-3" onClick={prevSlide} style={sliderControl}>❰</span>
                  <span className="mx-3" onClick={nextSlide} style={sliderControl}>❱</span>
              </div>

              <span style={sendBtn} className="m-1 cursor-pointer" onClick={toForm}>Opublikuj</span>
              <FontAwesomeIcon style={dellImageStyle} onClick={dellImage} size={"lg"} icon={faTrashCan} />
              {
                  slides[currentSlide]
              }
          </div>
            <Send_form display={sendForm} files={files}  killModal={killModal} />
        </div>
    );
}
export default Preview;
