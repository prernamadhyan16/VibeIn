import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { colors, getColor } from "@/lib/utils";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import {
  UPDATE_PROFILE_ROUTE,
  ADD_PROFILE_IMAGE_ROUTE,
  HOST,
  REMOVE_PROFILE_IMAGE_ROUTE,
} from "@/utils/constants";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    if (userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First Name is Required!");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is Required!");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          toast.success("Profile Updated Successfully");
          navigate("/chat");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please Setup Profile!");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
      const response = await apiClient.post(
        ADD_PROFILE_IMAGE_ROUTE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200 && response.data.image) {
        setUserInfo({ ...userInfo, image: response.data.image });
        toast.success("Image Updated Successfully!");
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        toast.success("Image removed Successfully");
        setImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#1b1c24] min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="absolute top-8 left-8">
        <IoArrowBack
          className="text-4xl lg:text-5xl text-white/90 cursor-pointer hover:text-white transition-colors"
          onClick={handleNavigate}
        />
      </div>

      <div className="w-full max-w-4xl bg-[#22242d] rounded-2xl shadow-2xl p-6 md:p-10 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Profile Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          <div className="md:col-span-1 flex flex-col items-center space-y-4">
            <div
              className="relative"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-purple-500/50">
                {image ? (
                  <AvatarImage
                    src={image}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-full w-full text-5xl border-[1px] flex items-center justify-center ${getColor(
                      selectedColor
                    )}`}
                  >
                    {firstName
                      ? firstName.split("").shift()
                      : userInfo?.email?.split("").shift() || ""}
                  </div>
                )}
              </Avatar>
              {hovered && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/70 cursor-pointer rounded-full"
                  onClick={image ? handleDeleteImage : handleFileInputClick}
                >
                  {image ? (
                    <FaTrash className="text-white text-3xl cursor-pointer" />
                  ) : (
                    <FaPlus className="text-white text-3xl cursor-pointer" />
                  )}
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              name="profile-image"
              accept=".png, .jpg, .jpeg, .svg, .webp"
            />
            <p className="text-white/70 text-center text-sm">
              {image ? "Click image to remove" : "Click image to upload"}
            </p>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="w-full">
              <label className="text-white/80 font-medium mb-2 block">
                Email
              </label>
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-lg p-4 bg-[#2c2e3b] border-none text-white/50"
              />
            </div>
            <div className="w-full">
              <label className="text-white/80 font-medium mb-2 block">
                First Name
              </label>
              <Input
                placeholder="First Name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="rounded-lg p-4 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <label className="text-white/80 font-medium mb-2 block">
                Last Name
              </label>
              <Input
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="rounded-lg p-4 bg-[#2c2e3b] border-none"
              />
            </div>
            <div>
              <label className="text-white/80 font-medium mb-3 block">
                Avatar Background Color
              </label>
              <div className="w-full flex gap-4">
                {colors.map((color, index) => (
                  <div
                    className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ring-2 ring-transparent hover:ring-white/50
                            ${
                              selectedColor === index ? "ring-purple-500" : ""
                            }`}
                    key={index}
                    onClick={() => setSelectedColor(index)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-12">
          <Button
            className="h-14 w-full text-lg font-semibold bg-purple-700 hover:bg-purple-600 transition-all duration-300"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;