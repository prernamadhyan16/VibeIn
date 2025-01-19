export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [], 
  directMessagesContacts: [],
  isUploading: false,
  isDownloading: false,
  fileUploadProgress: 0,
  fileDownloadProgress : 0,
  channels:[],
  setChannels: (channels) => set({ channels }),
  setIsUploading:(isUploading) => set({isUploading}),
  setIsDownloading:(isDownloading) => set({isDownloading}),
  setFileUploadProgress:(fileUploadProgress) => set({ fileUploadProgress }),
  setFileDownloadProgress:(fileDownloadProgress) => set({ fileDownloadProgress }),
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),

  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),

  setSelectedChatMessages: (selectedChatMessages) => {
      if (selectedChatMessages && typeof selectedChatMessages === "object" && Array.isArray(selectedChatMessages.message)) {
          selectedChatMessages = selectedChatMessages.message; // Extract the array if wrapped
      }

      if (!Array.isArray(selectedChatMessages)) {
          console.error("Attempting to set non-array value to selectedChatMessages:", selectedChatMessages);
          return; // Exit if the input is invalid
      }

      set({ selectedChatMessages });
  },

  setDirectMessagesContacts: (directMessagesContacts) => {
      if (!Array.isArray(directMessagesContacts)) {
          console.error("Attempting to set non-array value to directMessagesContacts:", directMessagesContacts);
          return; // Exit if the input is invalid
      }

      set({ directMessagesContacts });
  },
  addChannel: (channel) => {
    const channels = get().channels;
    set({channels: [channel, ...channels]})
  },

  closeChat: () => {
      set({
          selectedChatData: undefined,
          selectedChatType: undefined,
          selectedChatMessages: [], // Reset to an empty array
      });
  },

  addMessage: (message) => {
      const selectedChatMessages = get().selectedChatMessages || []; // Fallback to an empty array
      const selectedChatType = get().selectedChatType;

      if (!Array.isArray(selectedChatMessages)) {
          console.error("selectedChatMessages is not an array:", selectedChatMessages);
          return; // Exit early to prevent runtime errors
      }

      const updatedMessages = [
          ...selectedChatMessages,
          {
              ...message,
              recipient: selectedChatType === "channel" ? message.recipient : message.recipient?._id,
              sender: selectedChatType === "channel" ? message.sender : message.sender?._id,
          },
      ];

      set({ selectedChatMessages: updatedMessages });
  },

  addChannelInChannelList:(message) => {
    const channels = get().channels;
    const data = channels.find((channel) => channel._id === message.channelId);
    const index = channels.findIndex(
        (channel) => channel._id === message.channelId
    );
    if(index!=-1 && index!=undefined){
        channels.splice(index, 1);
        channels.unshift(data);
    }
  },

  addContactsInDMContacts : (message) => {
    const userId = get().userInfo.id;
    const fromId =
        message.sender._id === userId
            ? message.recipient._id
            : message.sender._id;
    const fromData =
        message.sender._id === userId ? message.recipient : message.sender;
    const dmContacts = get().directMessagesContacts;
    const data = dmContacts.find((contact) => contact._id === fromId);
    const index = dmContacts.findIndex((contact) => contact._id === fromId);

    if (index !== -1 && index !== undefined) {
        dmContacts.splice(index, 1);
        dmContacts.unshift(data);
    } else {
        dmContacts.unshift(fromData);
    }
    set({ directMessagesContacts: dmContacts });
},

});
