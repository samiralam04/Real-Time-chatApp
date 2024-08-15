import { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const {  changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        try {
          const items = res.data()?.chats || [];

          const promises = items.map(async (item) => {
            const userDocRef = doc(db, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);

            return { ...item, user: userDocSnap.data() };
          });

          const chatData = await Promise.all(promises);

          setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        } catch (err) {
          console.error("Failed to fetch chats:", err);
        }
      },
      (err) => {
        console.error("Failed to subscribe to chat updates:", err);
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChatsCopy = chats.map((item) => {
      const { user, ...rest } = item;
      return { ...rest };
    });

    const chatIndex = userChatsCopy.findIndex(
      (item) => item.chatId === chat.chatId
    );

    if (chatIndex !== -1) {
      userChatsCopy[chatIndex].isSeen = true;

      const userChatsRef = doc(db, "userchats", currentUser.id);

      try {
        await updateDoc(userChatsRef, {
          chats: userChatsCopy,
        });
        changeChat(chat.chatId, chat.user);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user?.username?.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      {filteredChats.length > 0 ? (
        filteredChats.map((chat) => (
          <div
            className="item"
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
            style={{
              backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
            }}
          >
            <img
              src={
                chat.user?.blocked?.includes(currentUser.id)
                  ? "./avatar.png"
                  : chat.user?.avatar || "./avatar.png"
              }
              alt=""
            />
            <div className="texts">
              <span>
                {chat.user?.blocked?.includes(currentUser.id)
                  ? "User"
                  : chat.user?.username || "Unknown"}
              </span>
              <p>{chat.lastMessage || "No message"}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No chats found</p>
      )}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
