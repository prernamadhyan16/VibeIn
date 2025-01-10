import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import { toast } from "sonner";

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
        <div>Chat</div>
    )
};

export default Chat;