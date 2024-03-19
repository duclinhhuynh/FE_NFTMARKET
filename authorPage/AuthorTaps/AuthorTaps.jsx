import React, { useState } from 'react';
import Image from 'next/image';
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from 'react-icons/ti';
// INTERNAL IMPORT
import Style from './AuthorTaps.module.css';
import images from '../../img';

const AuthorTaps = ({
    setColleciables,
    setCreated,
    setLike,
    setFollower,
    setFollowing,
}) => {
    const [openList, setOpenList] = useState(false);
    const [activeBtn, setActiveBtn] = useState(1);
    const [selectMenu, setSelectMenu] = useState("Most Recent");
    const listArray = [
        "Created by Admin",
        "Most Appreciated",
        "Most Discussed",
        "Most Viewed"
    ];

    const openDropDownList = () => {
        setOpenList(!openList);
    };

    const openTab = (e) => {
        const btnText = e.target.innerText;
        console.log(btnText)
        if (btnText === "Collectiables") {
            setColleciables(true);
            setCreated(false);
            setFollower(false);
            setFollowing(false);
            setLike(false);
            setActiveBtn(1);
        } 
        else if (btnText === "Created") {
            setColleciables(false);
            setCreated(true);
            setFollower(false);
            setFollowing(false);
            setLike(false);
            setActiveBtn(2);
        } 
        else if (btnText === "Liked") {
            setColleciables(false);
            setCreated(false);
            setFollower(false);
            setFollowing(false);
            setLike(true);
            setActiveBtn(3);
        }
        else if (btnText === "Followers") {
            setColleciables(false);
            setCreated(false);
            setFollower(true);
            setFollowing(false);
            setLike(false);
            setActiveBtn(4);
        }
        else if (btnText === "Following") {
            setColleciables(false);
            setCreated(false);
            setFollower(false);
            setFollowing(true);
            setLike(false);
            setActiveBtn(5);
        } 
    };

    return (
        <div className={Style.AuthorTaps}>
            <div className={Style.AuthorTaps_box}>
                <div className={Style.AuthorTaps_box_left}>
                    <div className={Style.AuthorTaps_box_left_btn}>
                        <button 
                            className={`${activeBtn === 1 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>Collectiables
                        </button>
                        <button 
                            className={`${activeBtn === 2 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>Created
                        </button>
                        <button 
                            className={`${activeBtn === 3 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>Liked
                        </button>
                        <button 
                            className={`${activeBtn === 4 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>Followers
                        </button>
                        <button 
                            className={`${activeBtn === 5 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>Following
                        </button>
                    </div>
                </div>
                <div className={Style.AuthorTaps_box_right}>
                    <div 
                        className={Style.AuthorTaps_box_right_para} 
                        onClick={openDropDownList}>
                        <p>{selectMenu}</p>
                        {openList ? <TiArrowSortedUp/> : <TiArrowSortedDown/>}
                    </div>
                    {
                        openList && (
                            <div className={Style.AuthorTaps_box_right_list}>
                                {listArray.map((el, i) => (
                                    <div 
                                        key={i + 1} 
                                        onClick={() => setSelectMenu(el)}
                                        className={Style.AuthorTaps_box_right_list_item}>
                                        <p>{el}</p>
                                        <span>{selectMenu === el && <TiTick/>}</span>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default AuthorTaps;
