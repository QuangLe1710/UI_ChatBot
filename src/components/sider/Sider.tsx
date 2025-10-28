import { Layout } from "antd";
import { useState } from "react";
import logoLGCNS1 from "../../assets/logoLGCNS1.png";
import menu from "../../assets/menu.svg";
import Vector from "../../assets/Vector.png";
import iconAvatar from "../../assets/iconAvatar.png";
import imageIcon from "../../assets/imageIcon.png";
import { Avatar, Badge, Switch } from "antd";
import { FormOutlined, LoadingOutlined } from "@ant-design/icons";
import SiderItem from "./SiderItem";
import { useChatContext } from "../../contexts/ChatContext";
import type { Message } from "../../libs/message";

const historyChatData: Message[] = [
  { role: "user", content: "hello 1" },
  { role: "user", content: "hello 2" },
  { role: "user", content: "hello 3" },
];

export default function Sider() {
  const [historyChatDataRender, sethistoryChatDataRender] =
    useState(historyChatData);
  const [collapsed, setCollapsed] = useState(false);
  const [themeToggled, setThemeToggled] = useState(false);
  const { messages , startNewChat } = useChatContext();

  const onCreateChat = () => {
    console.log("Create new chat");
    console.log(`ChatContext provide : `, messages);
    let messageUserFirst = messages.find((m) => m.role === "user");
    console.log(`message first : `, messageUserFirst);
    if (messageUserFirst) {
      let newArrayMess = [...historyChatDataRender];
      let newMess: Message = {
        role: "user",
        content: `${messageUserFirst.content}`,
      };
      sethistoryChatDataRender([newMess, ...newArrayMess]);
    } else {
      console.warn("Không tìm thấy tin nhắn user để thêm vào lịch sử.");
    }

    startNewChat();
  };

  

  return (
    <>
      <Layout.Sider
        width={300}
        style={{ background: "#222222" }}
        collapsible
        collapsed={collapsed}
        trigger={null}
        collapsedWidth={80}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="flex flex-col justify-between h-full">
          {/* --- div top --- */}
          <div className="flex flex-col p-6 pt-3 gap-y-5 justify-center align-middle">
            <div className="flex justify-end">
              {/* Icon menu*/}
              <img
                src={menu}
                alt="menu"
                onClick={() => setCollapsed(!collapsed)}
                className="cursor-pointer mr-0.5"
                title={`${collapsed ? "Open sidebar" : "Close sidebar"}`}
              />
            </div>
            <div
              className={`flex items-center justify-center mx-auto w-full ${
                collapsed ? "hidden" : ""
              }`}
            >
              {/* Logo */}
              <img src={logoLGCNS1} className={``} alt="LogoLG" />
            </div>

            {/* Icon Add khi thu gọn */}
            <div className={`ml-0.5 ${collapsed ? "" : "hidden"}`}>
              <img
                src={Vector}
                alt="add New Chat"
                onClick={onCreateChat}
                className="cursor-pointer"
              />
            </div>

            {/* Tiêu đề
                        <div className={`mx-auto ${collapsed ? 'hidden' : ''}`}>
                            <h2 className="text-[white] text-2xl">
                                <span className="font-bold mr-1.5">U+ BIZ</span> CHATBOT
                            </h2>
                        </div> */}

            {/* Button New Chat */}
            <div className={` ${collapsed ? "hidden" : ""} `}>
              <SiderItem
                onClick={onCreateChat}
                className="text-white hover:bg-[#A50034] gap-2 py-1.5 pl-24 pr-[114px] font-bold text-[20px] rounded-[10px] flex items-center justify-center"
                icon={<FormOutlined />}
              >
                New Chat
              </SiderItem>
            </div>

            {/* separator */}
            <hr
              className={`border-t border-gray-600 w-[calc(100%+50px)] ml-[-26px] my-4 ${
                collapsed ? "hidden" : ""
              }`}
            />
          </div>

          {/* History */}
          <div
            className={`history flex flex-col px-2 ${
              collapsed ? "hidden" : ""
            } flex-1 overflow-y-auto min-h-0`}
          >
            {
              // loading ? (
              //     <div className='text-white text-[20px] p-2 flex items-center justify-center'>
              //         <LoadingOutlined spin /> Loading...
              //     </div>
              // ) :
              historyChatDataRender.length < 1 ? (
                <div className="text-white text-[20px] p-2">
                  No data available
                </div>
              ) : (
                historyChatDataRender.map((m) => (
                  <SiderItem
                    // key={m.id}
                    className="text-white hover:bg-[#969797] rounded-lg text-[20px] p-2"
                  >
                    {m.content}
                  </SiderItem>
                ))
              )
            }
          </div>

          {/* --- Phần dưới (Avatar + Switch) --- */}
          <div
            className={`flex flex-col items-center p-6 mx-auto ${
              collapsed ? "hidden" : ""
            }`}
          >
            <div
              className={`flex flex-col items-center p-6 mx-auto ${
                collapsed ? "hidden" : ""
              }`}
            >
              <div className="relative">
                <Badge
                  count={
                    <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-[#222222]" />
                  }
                  offset={[-5, 5]} // Setting position Badge
                >
                  <Avatar src={iconAvatar} size={40} />
                </Badge>
              </div>
            </div>

            <Switch
              className="scale-150"
              checked={themeToggled}
              onChange={setThemeToggled}
              checkedChildren={
                <img
                  src={imageIcon}
                  alt="custom icon"
                  style={{
                    width: "15px",
                    height: "15px",
                    objectFit: "contain",
                    marginTop: "4px",
                  }}
                />
              }
              unCheckedChildren={
                <img
                  src={imageIcon}
                  alt="custom icon"
                  style={{
                    width: "15px",
                    height: "15px",
                    objectFit: "contain",
                  }}
                />
              }
            />
          </div>
        </div>
      </Layout.Sider>
    </>
  );
}
