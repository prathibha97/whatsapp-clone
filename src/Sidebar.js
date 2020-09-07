import React from "react";
import "./Sidebar.css";
import {DonutLarge, Chat, MoreVert, SearchOutlined} from '@material-ui/icons'
import { IconButton, Avatar } from "@material-ui/core";
import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <Avatar src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png' />
        <div className='sidebar_headerRight'>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
          <div className="sidebar_searchContainer">
              <SearchOutlined />
              <input type="text" placeholder='Search or start new chat'/>
          </div>
      </div>
      <div className="sidebar_chats">
            <SidebarChat />
            <SidebarChat />
            <SidebarChat />
            <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
