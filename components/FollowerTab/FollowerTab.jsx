import React, {useState, useEffect } from 'react'
import {RiUserFollowFill, RiUserUnfollowFill, RiAwardLine}  from 'react-icons/ri'

//INTERNAL IMPORT
import Style from "./FollowerTab.module.css"
import FollowerTabCard from './FollowerTabCard/FollowerTabCard'
import images from '../../img';
const Follower = ({TopCreators}) => {
  const [activeBtn, setActiveBtn] = useState(1);
  const CardArray = [
    {
      background: images.create2,
      user: images.user2,
    },
    {
      background: images.create7,
      user: images.user5,
    },
    {
      background: images.create1,
      user: images.user1,
    },
    {
      background: images.create5,
      user: images.user5,
    },
    {
      background: images.create6,
      user: images.user1,
    },{
      background: images.create4,
      user: images.user4,
    }
    ,{
      background: images.create3,
      user: images.user3,
    }
  ];
  const FollowingArray = [
  {
    background: images.create1,
    user: images.user1,
  },
  {
    background: images.create5,
    user: images.user5,
  },
  {
    background: images.create6,
    user: images.user3,
  },{
    background: images.create4,
    user: images.user4,
  },
  {
    background: images.create2,
    user: images.user2,
  },
  {
    background: images.create2,
    user: images.user2,
  },
  ,{
    background: images.create3,
    user: images.user3,
  }];
  const NewsArray = [ 
  {
    background: images.create2,
    user: images.user2,
  },
  {
    background: images.create1,
    user: images.user1,
  },
  {
    background: images.create5,
    user: images.user5,
  },
  {
    background: images.create6,
    user: images.user4,
  },{
    background: images.create4,
    user: images.user4,
  },
  {
    background: images.create2,
    user: images.user2,
  }
  ,{
    background: images.create3,
    user: images.user3,
  }];
  const [popular, setPopular] = useState(true)
  const [following, setFollowing] = useState(false)
  const [news, setNews] = useState(false)

  const openPopular = () => {
    if(!popular){
      setPopular(true)
      setFollowing(false)
      setNews(false)
      setActiveBtn(1)
    }
  };

  const openFollower = () => {
    if(!following){
      setPopular(false)
      setFollowing(true)
      setNews(false)
      setActiveBtn(2)
    }
  }

  const openNews = () => {
    if(!news){
      setPopular(false)
      setFollowing(false)
      setNews(true)
      setActiveBtn(3)
    }
  }
  return (
    <div className={Style.followerTab}>
      <div className={Style.followerTab_title}>
          <h2>Top Creators List ....</h2>
          <div className={Style.followerTab_tabs}>
            <div className={Style.followerTab_tabs_btn}>
              <button onClick={()=> openPopular()} className={`${activeBtn === 1 ? Style.active : ""}`}>
                <RiUserFollowFill/> Popular
              </button>
              <button onClick={()=> openFollower()} className={`${activeBtn === 2 ? Style.active : ""}`}>
                <RiUserUnfollowFill/> Following
              </button>
              <button onClick={()=> openNews()} className={`${activeBtn === 3 ? Style.active : ""}`}>
                <RiAwardLine/> NoteWorthy
              </button>
            </div>
          </div>
      </div>
      <div className={Style.followerTab_box_img}>
      {
        popular && (
          <div className={Style.followerTab_box}>
            {TopCreators.map((el, i) => (
              <FollowerTabCard key= {i + 1} i ={i} el ={el}/>
            ))}
          </div>
        )
      }
      {
        following && (
          <div className={Style.followerTab_box}>
            {TopCreators.map((el, i) => (
              <FollowerTabCard key= {i + 1} i ={i} el ={el}/>
            ))}
          </div>
        )
      }
      {
        news && (
          <div className={Style.followerTab_box}>
            {TopCreators.map((el, i) => (
              <FollowerTabCard key= {i + 1} i ={i} el ={el}/>
            ))}
          </div>
        )
      }
      </div>
      <div className={Style.followerTab_member}>
        <div className={Style.followerTab_member_box}>
          <a href="">Show me more</a>
          <a href="">Become author</a>
        </div>
      </div>
    </div>
  )
}

export default Follower