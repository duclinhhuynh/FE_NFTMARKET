import React ,{useState, useRef, useEffect} from 'react'
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti'
import {motion} from 'framer-motion'
// INTERNAL IMPORT 
import Style from "./Slider.module.css"
import SliderCard from './SliderCard/SliderCard'
import images from "../../img"

const Slilder = () => {
  const sliderArray = [{
    music: images.music4
  },
  {
    music: images.music5
  },
  {
    music: images.music1
  },
  {
    music: images.music6
  },
  {
    music: images.music9
  },
  {
    music: images.music10
  },
];
  const [width, setWidth] = useState(0);
  const dragSlider = useRef();

  useEffect(() => {
    setWidth(dragSlider.current.scrollWidth - dragSlider.current.offsetWidth);
  });

  const handleScroll = (direction) => {
    const { current } = dragSlider;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;
    if (direction === "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className={Style.slider}>
      <div className={Style.slider_box}>
        <h2>Explore NFTs video</h2>
        <div className={Style.slider_box_button}>
          <p>Click on play icon & enjoy Nfts Video</p>
          <div className={Style.slider_box_button_btn}>
            <div className={Style.slider_box_button_btn_icon} onClick={() => handleScroll("left")}>
            <TiArrowLeftThick/>
            </div>
            <div className={Style.slider_box_button_btn_icon} onClick={() => handleScroll("right")}>
            <TiArrowRightThick/>
            </div>
          </div>
        </div>
        <motion.div className={Style.slider_box_itmes} ref={dragSlider}>
          <motion.div 
          ref={dragSlider} 
          className={Style.slider_box_items}
          drag="x"
          dragConstraints={{right: 0, left: -width}}
          >
          {
            sliderArray.map((el, i) => (
              <SliderCard key={i + 1} el = {el} i = {i}/>
            ))
          }
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Slilder