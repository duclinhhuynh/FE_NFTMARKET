import React, { useState } from 'react';
import Image from 'next/image';
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from 'react-icons/ti';
// INTERNAL IMPORT
import Style from './AuthorTaps.module.css';
import images from '../../../img';
import {Button, Select, SelectItem, Avatar} from "@nextui-org/react";
const users = [
    {
      id: 1,
      name: "Created by Admin",
      role: "CEO",
      team: "Management",
      status: "active",
      age: "29",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
      email: "tony.reichert@example.com",
    },
    {
      id: 2,
      name: "Most Appreciated",
      role: "Tech Lead",
      team: "Development",
      status: "paused",
      age: "25",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
      email: "zoey.lang@example.com",
    },
    {
      id: 3,
      name: "Most Discussed",
      role: "Sr. Dev",
      team: "Development",
      status: "active",
      age: "22",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
      email: "jane.fisher@example.com",
    },
    {
      id: 4,
      name: "Most Viewed",
      role: "C.M.",
      team: "Marketing",
      status: "vacation",
      age: "28",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
      email: "william.howard@example.com",
    },
]
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
        if (btnText === "List") {
            setColleciables(true);
            setCreated(false);
            setFollower(false);
            setFollowing(false);
            setLike(false);
            setActiveBtn(1);
        } 
        else if (btnText === "Owner") {
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
                    <div className='flex gap-5'>
                        <Button variant="bordered" radius="lg"
                            className={`${activeBtn === 1 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>List 
                        </Button>
                        <Button variant="bordered" radius="lg"
                            className={`${activeBtn === 2 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>Owner
                        </Button>
                        <Button variant="bordered" radius="lg"
                            className={`${activeBtn === 3 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>Liked
                        </Button>
                        <Button variant="bordered" radius="lg"
                            className={`${activeBtn === 4 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>Followers
                        </Button>
                        <Button variant="bordered" radius="lg"
                            className={`${activeBtn === 5 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>Following
                        </Button>
                    </div>
                </div>
                <Select
                    items={users}
                    label="Create at"
                    className="max-w-xs"
                    variant="bordered"
                    classNames={{
                        label: "group-data-[filled=true]:-translate-y-5",
                        trigger: "min-h-16",
                        listboxWrapper: "max-h-[400px]",
                    }}
                    listboxProps={{
                        itemClasses: {
                        base: [
                            "rounded-md",
                            "text-default-500",
                            "transition-opacity",
                            "data-[hover=true]:text-foreground",
                            "data-[hover=true]:bg-default-100",
                            "dark:data-[hover=true]:bg-default-50",
                            "data-[selectable=true]:focus:bg-default-50",
                            "data-[pressed=true]:opacity-70",
                            "data-[focus-visible=true]:ring-default-500",
                        ],
                        },
                    }}
                    popoverProps={{
                        classNames: {
                        base: "before:bg-default-200",
                        content: "p-0 border-small border-divider bg-background",
                        },
                    }}
                    renderValue={(items) => {
                        return items.map((item) => (
                        <div key={item.key} className="flex items-center gap-2">
                            <Avatar
                            alt={item.data.name}
                            className="flex-shrink-0"
                            size="sm"
                            src={item.data.avatar}
                            />
                            <div className="flex flex-col">
                            <span>{item.data.name}</span>
                            <span className="text-default-500 text-tiny">({item.data.email})</span>
                            </div>
                        </div>
                        ));
                    }}
                    >
                    {(user) => (
                        <SelectItem key={user.id} textValue={user.name}>
                        <div className="flex gap-2 items-center">
                            <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.avatar} />
                            <div className="flex flex-col">
                            <span className="text-small">{user.name}</span>
                            <span className="text-tiny text-default-400">{user.email}</span>
                            </div>
                        </div>
                        </SelectItem>
                    )}
                </Select>
            </div>
        </div>
    );
};

export default AuthorTaps;
