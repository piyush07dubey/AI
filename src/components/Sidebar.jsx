import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import moment from 'moment';

const Sidebar = () => {
  const { chats, setSelectedChat, theme, setTheme, user,navigate } = useAppContext();
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col h-screen min-w-[18rem] p-5
      dark:bg-gradient-to-b dark:from-[#242124]/30 dark:to-[#000000]/30
      border-r border-[#80609F]/30 backdrop-blur-xl
      transition-all duration-500 max-md:absolute left-0 z-10"
    >
      {/* Logo */}
      <img
        src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
        alt="logo"
        className="w-full max-w-[12rem]"
      />

      {/* New Chat Button */}
      <button
        className="flex justify-center items-center w-full py-2 mt-10
        text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm
        rounded-md cursor-pointer"
      >
        <span className="mr-2 text-xl">+</span> New Chat
      </button>

      {/* Search Input */}
      <div className="flex items-center gap-2 w-full p-3 mt-4 border border-gray-400
        dark:border-white/20 rounded-md"
      >
        <img
          className={theme !== "dark" ? "invert" : ""}
          src={assets.search_icon}
          alt="search"
        />
        <input
          type="text"
          placeholder="Search conversations"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-xs placeholder:text-gray-400 outline-none w-full"
        />
      </div>

      {/* Recent Chats */}
      {chats.length > 0 && <p className="mt-4 text-sm">Recent Chats</p>}

      <div className="flex-1 flex-col gap-2 mt-3 text-sm space-y-3 overflow-y-scroll">
        {chats
          .filter((chat) => {
            const searchText = search.toLowerCase();
            if (chat.messages.length > 0) {
              return chat.messages[0].content.toLowerCase().includes(searchText);
            }
            return chat.name.toLowerCase().includes(searchText);
          })
          .map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className="p-2 px-4 border border-gray-300
                dark:bg-[#1E1E1E]/10 dark:border-[#80609F]/15
                rounded-md cursor-pointer flex justify-between
                group hover:bg-gray-100 dark:hover:bg-[#80609F]/10
                transition-colors"
            >
              <div className="w-full">
                <p className="truncate">
                  {chat.messages.length > 0
                    ? chat.messages[0].content.slice(0, 50)
                    : chat.name.slice(0, 50)}
                </p>
                <p className='text-xs text-gray-500 dark:text-[#B1A^C0]'>{moment(chat.updatedAt).fromNow()}</p>
              </div>
              <img  className="hidden group-hover:block w-4 cursor-pointer not-dark:invert" src={assets.bin_icon} alt="bin" />
            </div>
          ))}
      </div>
      <div onClick={() => navigate("/community")}className='flex items-center gap-2 p-3 mt-4 border border-gray-300
      dark:border-white/20 rounded-md cursor-pointer hover:scale-103 transition-all duration-300'>
        <img src={assets.gallery_icon} alt="add" className='w-4.5 not-dark:invert' />
          <div className='flex flex-col text-sm'>
              <p>Community images</p>
          </div>
      </div>
      <div onClick={() => navigate("/credits")}className='flex items-center gap-2 p-3 mt-4 border border-gray-300
      dark:border-white/20 rounded-md cursor-pointer hover:scale-103 transition-all duration-300'>
        <img src={assets.diamond_icon} alt="add" className='w-4.5 dark:invert' />
          <div className='flex flex-col text-sm'>
              <p>Credits:{user?.Credits}</p>
              <p className='text-xs text-gray-400'>Purchase credits to use gpt</p>
          </div>
      </div>
     <div className='flex justify-between items-center gap-2 p-3 mt-4 border border-gray-300
      dark:border-white/20 rounded-md '>
        <div className='flex items-center gap-2 text-sm'>
        <img src={assets.theme_icon}  className='w-4 not-dark:invert' />
              <p>Dark Mode</p>
        </div>
        <label className='relative inline-flex cursor-pointer'>
          <input className='sr-only peer' type="checkbox" checked={theme === "dark"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")} />
          <div className='w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all'>
  </div>
  <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4'></span>
        </label>
      </div>
      
    </div>
  ); 
};

export default Sidebar;
