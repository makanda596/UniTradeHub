

const ChatHeader = ({userinfo}) => {
   

    return (
        <div className="chat-header">
            <img src={userinfo.profilepic} alt=""/>
            <p>{userinfo.username}</p>
        </div>
    );
};

export default ChatHeader;
