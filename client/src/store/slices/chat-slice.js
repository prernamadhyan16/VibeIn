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
});
