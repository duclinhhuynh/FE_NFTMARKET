import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
// import icon
import { FiSearch } from "react-icons/fi";
import { CgMenuRight } from "react-icons/cg";
//INTERNAL IMPORT
import Style from "./Navbar.module.css";
import ThemeSwitch from "../theme/ThemeSwitcher";
// Example in NavBar.js
import { Discover, HelpCenter, Notification, Profile, Sidebar } from "./index";
import { Error } from "../componentsindex";
import { Button } from "@nextui-org/button";
import images from "../../img";
import { IoIosNotifications } from "react-icons/io";
import { useRouter } from "next/router";
// IMPORT FROM SMART CONTRACT
import { Input } from "@nextui-org/react";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import ThemeSwitcherText from "../theme/ThemeSwitcherText";
import { useTheme } from "next-themes";
const NavBar = () => {
  // useState
  const { theme, setTheme } = useTheme();
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const router = useRouter();

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Discover") {
      setDiscover(true);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    } else if (btnText == "Help Center") {
      setDiscover(false);
      setHelp(true);
      setNotification(false);
      setProfile(false);
    } else {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
      setOpenSideMenu(false);
    }
  };

  const openNotification = (e) => {
    if (!notification) {
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelp(false);
      setDiscover(false);
      setNotification(false);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Kiểm tra xem sự kiện click có xảy ra trong navbar không
      if (!e.target.closest(`.${Style.NavBar}`)) {
        // Đóng tất cả các menu
        setDiscover(false);
        setHelp(false);
        setNotification(false);
        setProfile(false);
        setOpenSideMenu(false);
      }
    };

    // Thêm event listener cho sự kiện click
    document.addEventListener("click", handleDocumentClick);

    // Xóa event listener khi component unmount
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  // SMART CONTRACT SECTION
  const { currentAccount, connectWallet, openError } = useContext(
    NFTMarketplaceContext
  );

  return (
    <div className={Style.NavBar}>
      <ThemeSwitcherText>
        <div className={Style.navbar_container}>
          <div className={Style.navbar_container_left}>
            <div className={Style.logo}>
              <Image
                src={images.logo}
                alt="NFT Marketplace"
                width={50}
                height={50}
                onClick={() => router.push("/")}
              />
            </div>
            <div className={Style.navbar_container_left_box_input}>
              <div className={Style.navbar_container_left_box_input_box}>
                <Input
                  isClearable
                  variant="bordered"
                  placeholder="Type your search"
                  onClear={() => console.log("input cleared")}
                  className="max-w-xs"
                  startContent={
                    <FiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </div>
            </div>
          </div>
          {/* END OF LEFT SECTION*/}
          <div className={Style.navbar_container_right}>
            <div
              className={Style.navbar_container_right_discover}
              onClick={(e) => openMenu(e)}
            >
              {/* DISCOVER MENU */}
              <p>Discover</p>
              {discover && (
                <div className={Style.navbar_container_right_discover_box}>
                  <div className={`rounded-xl shadow-md border border-bordercustom bg-itembackground ${
                      theme === "light" ? "bg-white" : "bg-black text-white"
                    }`}>
                    <Discover setDiscover={setDiscover} />
                  </div>
                </div>
              )}
            </div>
            {/* HELP CENTER MENU */}
            {/* onClick={(e) => openMenu(e)} */}
            <div className={Style.navbar_container_right_help}>
              <p>Help Center</p>
              {help && (
                <div className={Style.navbar_container_right_help_box}>
                  <HelpCenter />
                </div>
              )}
            </div>
            {/* NOTIFICATION */}
            <div className={` ${Style.navbar_container_right_notif}`}>
              <p onClick={(e) => openNotification(e)}>
                <IoIosNotifications
                  className={Style.navbar_container_right_notif_img}
                />
              </p>
              {notification && <Notification />}
            </div>
            <ThemeSwitch />

            {/* CREATE BUTTON SECTION */}
            <div className={Style.navbar_container_right_button}>
              {currentAccount === "" ? (
                <Button
                  color="primary"
                  variant="bordered"
                  onClick={() => connectWallet()}
                >
                  Connect
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="bordered"
                  onClick={() => router.push("/uploadNft")}
                >
                  Create
                </Button>
              )}
            </div>
            {/* USER PROFILE */}
            <div className={Style.navbar_container_right_profile_box}>
              <div className={Style.navbar_container_right_profile}>
                <Image
                  src={images.user1}
                  alt="Profile"
                  width={40}
                  height={40}
                  onClick={() => openProfile()}
                  className={Style.navbar_container_right_profile}
                />
                {profile && <Profile currentAccount={currentAccount} />}
              </div>
            </div>
            {/* MENU BUTTON */}
            <div className={Style.navbar_container_right_menuBtn}>
              <CgMenuRight
                className={Style.menuIcon}
                onClick={() => openSideBar()}
              />
            </div>
          </div>
        </div>
        {/* SIDBAR COMPONENT */}
        {openSideMenu && (
          <div className={Style.sideBar}>
            <Sidebar
              setOpenSideMenu={setOpenSideMenu}
              currentAccount={currentAccount}
              connectWallet={connectWallet}
            />
          </div>
        )}
        {openError && <Error />}
      </ThemeSwitcherText>
    </div>
  );
};

export default NavBar;
