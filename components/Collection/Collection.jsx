import React, { useState } from 'react'
import {
    BsFillAlarmFill,
    BsFillCalendarDateFill,
    BsCalendar3
}from 'react-icons/bs'
//INTERNAL IMPORT 
import Style from './Collection.module.css'
import DaysComponents from './DaysComponents/DaysComponents'
import images from '../../img'
const Collection = () => {
    const [popular, setPopular] = useState(true);
    const [following, setFollowing] = useState(false);
    const [news, setNews] = useState(false);
    const [activeBtn, setActiveBtn] = useState(1);

    const CardArray = [
        {
          pilot: images.pilot1,
          cartoon: images.cartoon1,
          temminator: images.terminator1,
          background: images.create2,
          user: images.user2,
        },
        {
          cartoon: images.cartoon2,
          pilot: images.pilot2,
          temminator: images.terminator2,
          background: images.create7,
          user: images.user5,
        },
        {
          cartoon: images.cartoon3,
          pilot: images.pilot3,
          temminator: images.terminator3,
          background: images.create1,
          user: images.user1,
        },
        {
         cartoon: images.cartoon4,
          pilot: images.pilot4,
          temminator: images.terminator4,
          background: images.create5,
          user: images.user5,
        },
        {
          cartoon: images.cartoon5,
          pilot: images.art3,
          temminator: images.terminator5,
          background: images.create6,
          user: images.user1,
        },{
          cartoon: images.art2,
          pilot: images.war4,
          temminator: images.terminator5,
          background: images.create4,
          user: images.user4,
        }
        ,{
            cartoon: images.cartoon6,
            pilot: images.war5,
            temminator: images.terminator2,
            background: images.create3,
            user: images.user3,
        }
      ];
      const FollowingArray = [
          {
            cartoon: images.cartoon2,
            pilot: images.pilot2,
            temminator: images.terminator2,
            background: images.create7,
            user: images.user5,
          },
          {
           cartoon: images.cartoon4,
            pilot: images.pilot4,
            temminator: images.terminator4,
            background: images.create5,
            user: images.user5,
          },
          {
            pilot: images.pilot1,
            cartoon: images.cartoon1,
            temminator: images.terminator1,
            background: images.create2,
            user: images.user2,
          },
          {
            cartoon: images.cartoon5,
            pilot: images.art3,
            temminator: images.terminator5,
            background: images.create6,
            user: images.user1,
          },{
            cartoon: images.art2,
            pilot: images.war4,
            temminator: images.terminator5,
            background: images.create4,
            user: images.user4,
          }
          ,{
              cartoon: images.cartoon6,
              pilot: images.war5,
              temminator: images.terminator2,
              background: images.create3,
              user: images.user3,
          },
          {
            cartoon: images.cartoon3,
            pilot: images.pilot3,
            temminator: images.terminator3,
            background: images.create1,
            user: images.user1,
          },
        ];
      const NewsArray = [ 
      {
        cartoon: images.cartoon1,
        pilot: images.art7,
        temminator: images.terminator3,
        background: images.war3,
        user: images.user3,
      },
      {
        cartoon: images.art4,
        pilot: images.art6,
        temminator: images.terminator3,
        background: images.create1,
        user: images.user1,
      },
      {
        cartoon: images.cartoon3,
        pilot: images.pilot3,
        temminator: images.terminator3,
        background: images.create5,
        user: images.user5,
      },
      {
        cartoon: images.cartoon3,
        pilot: images.pilot2,
        temminator: images.terminator4,
        background: images.create6,
        user: images.user4,
      },{
        cartoon: images.cartoon5,
        pilot: images.pilot4,
        temminator: images.terminator3,
        background: images.create4,
        user: images.user4,
      }
      ];

    const openPopular = () => {
        if(!popular){
            setPopular(true);
            setFollowing(false);
            setNews(false);
            setActiveBtn(1)
        }
    }
    const openFollower = () => {
        if(!following){
            setPopular(false);
            setFollowing(true);
            setNews(false);
            setActiveBtn(2)
        }
    }
    const openNews = () => {
        if(!news){
            setPopular(false);
            setFollowing(false);
            setNews(true);
            setActiveBtn(3)
        }
    }
  return (
    <div className={Style.collection}>
        <div className={Style.collection_title}>
            <div className={Style.collection_collections}>
                <div className={Style.collection_collections_btn}>
                    <button onClick={() => openPopular()} className={`${activeBtn === 1 ? Style.active : ""}`}>
                        <BsFillAlarmFill/> 24 hours
                    </button>
                    <button onClick={() => openFollower()} className={`${activeBtn === 2 ? Style.active : ""}`}>
                        <BsCalendar3/> 7 days
                    </button>
                    <button onClick={() => openNews()} className={`${activeBtn === 3 ? Style.active : ""}`}>
                        <BsFillCalendarDateFill/> 30 days
                    </button>
                </div>
            </div>
        </div>
        {
            popular && (
                <div className={Style.collection_box}>
                    {CardArray.map((el,i) => (
                        <DaysComponents key={i + 1}  i = {i}  el = {el}/>
                    ))}
                </div>
            )
        }
        {
            following && (
                <div className={Style.collection_box}>
                    {FollowingArray.map((el,i) => (
                        <DaysComponents key={i + 1}  i = {i} el = {el}/>
                    ))}
                </div>
            )
        }
         {
            news && (
                <div className={Style.collection_box}>
                    {NewsArray.map((el,i) => (
                        <DaysComponents key={i + 1}  i = {i} el = {el}/>
                    ))}
                </div>
            )
        }
        </div>
  );
}

export default Collection