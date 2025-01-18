import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";


const ContactList = ({ contacts, isChannel = false }) => {
    
    const { 
        selectedChatData, 
        setSelectedChatData, 
        setSelectedChatType, 
        selectedChatType,
        setSelectedChatMessages,
    } = useAppStore();
    
    const handleClick = (contact) => {
        if(isChannel) setSelectedChatType("channel");
        else setSelectedChatType("contact");
        setSelectedChatData("contact");
        if(selectedChatData && selectedChatData._id !== contact._id) {
            setSelectedChatMessages([]);
        }
    };
    
    return (
        <div className="mt-5">
            {contacts.map((contact) => (
                <div key={contact._id} className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
                    selectedChatData && selectedChatData._id === contact._id 
                    ? "bg-[#8417ff] hover:bg-[#8417ff]" 
                    : "hover:bg-[#f1f1f1]" 
                } `}
                onClick={() => handleClick(contact)}
                >
                    <div className="flex gap-5 items-center justi text-neutral-300">
                        {
                            !isChannel && 
                            <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                                {contact.image ? (
                                    <AvatarImage 
                                    src={`${HOST}/${contact.image}`} 
                                    alt="profile" 
                                    className="object-cover w-full h-full bg-black"/>
                                ):(
                                    <div className={`uppercase h-10 w-10 md:w-48 md:h-48 text-lg border-[1px] flex items-center justify-center ${getColor(contact.color) }`}>
                                        {contact.firstName 
                                        ? contact.firstName.split("").shift() 
                                        : contact?.email?.split("").shift() || ""}
                                    </div>
                                )}
                            </Avatar>
                        }
                    </div>
                </div>
            ))}
        </div>
    )
};

export default ContactList;