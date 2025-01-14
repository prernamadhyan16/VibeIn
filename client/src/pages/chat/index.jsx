import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import { toast } from "sonner";
import ContactsContainer from "./components/contact-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";

const Chat = () =>{

    const { userInfo } = useAppStore();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!userInfo.profileSetup){
            toast("Yo, set up your profile to keep vibin'!");
            navigate("/profile");
        }
    }, [userInfo, navigate]);

    return (
        <div className="flex h-[100vh] text-white overflow-hidden">
            <ContactsContainer/>
            <EmptyChatContainer/>
            <ChatContainer/>
        </div>
    )
};

export default Chat;