export const createChatSlice = (set, get) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
    setSelectedChatMessages : (selectedChatMessages) => set({ selectedChatMessages }),
    closeChat: () =>
        set({
            selectedChatData:undefined,
            selectedChatType:undefined,
            selectedChatMessages: [],
        }),
        addMessage: (message) => {
            const selectedChatMessages = get().selectedChatMessages || [];
            const selectedChatType = get().selectedChatType;
          
            console.log("Existing selectedChatMessages before append:", selectedChatMessages);
          
            const updatedMessages = [
              ...selectedChatMessages,
              {
                ...message,
                recipient: 
                  selectedChatType === "channel"
                    ? message.recipient
                    : message.recipient._id,
                sender: 
                  selectedChatType === "channel"
                    ? message.sender
                    : message.sender._id,
              },
            ];
          
            set({ selectedChatMessages: updatedMessages });
          
            console.log("Updated selectedChatMessages (pending state update):", updatedMessages);
        }
});