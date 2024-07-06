import { Avatar, Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { imageDb } from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";

export default function EditProfileModal({
  user,
  open,
  setOpen,
  getEditStatus,
}) {
  const [username, setUsername] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  const [avatar, setAvatar] = useState(user.avatar);
  const [isValidData, setIsValidData] = useState(false);

  const handleFileUpload = async (e) => {
    const uploaded = e.target.files[0];
    if (uploaded) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, uploaded).then(async (value) => {
        console.log("Uploaded: ", value.metadata);
        setAvatar(await getDownloadURL(value.ref));
      });
    }
  };

  const handleConfirmEdit = async () => {
    await axios
      .patch(`http://localhost:3000/auth/${user.id}`, {
        username: username,
        phone: phone,
        avatar: avatar,
      })
      .then(async (res) => {
        await axios
          .get(`http://localhost:3000/auth/email/${user.email}`)
          .then((res) => {
            sessionStorage.setItem("signInUser", JSON.stringify(res.data));
            sessionStorage.setItem("profile_updated", "true");
            setOpen(false);
            window.location.reload();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (
      username.length === 0 ||
      phone.length < 9 ||
      phone.length > 11 ||
      avatar.length === 0 ||
      (username === user.username &&
        phone === user.phone &&
        avatar === user.avatar)
    ) {
      setIsValidData(false);
    } else {
      setIsValidData(true);
    }
  }, [username, phone, avatar]);

  return (
    <Modal
      title=<p className="font-montserrat">Edit profile</p>
      open={open}
      onCancel={(e) => {
        e.stopPropagation();
        setOpen(false);
      }}
      footer={null}
      width={600}
    >
      <div className="w-full flex items-start justify-center gap-8 font-montserrat">
        <div className="w-1/3 flex flex-col items-center justify-start gap-4">
          <Avatar src={avatar} alt="" size={150} />
          <div
            onClick={() => {
              document.getElementById("image_upload")?.click();
            }}
            className="flex items-center gap-2 cursor-pointer hover:text-sky-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M5 18.89H6.41421L15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89ZM21 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L9.24264 18.89H21V20.89ZM15.7279 6.74785L17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785Z"></path>
            </svg>
          </div>
          <input
            type="file"
            id="image_upload"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-start gap-2">
            <p>Email: </p>
            <input
              placeholder="..."
              value={user.email}
              disabled
              size={user.email.length + 5}
              className="px-4 py-2 border border-gray-300 rounded-[30px] disabled:bg-gray-300 disabled:cursor-not-allowed"
            />
          </div>
          <div className="flex items-center justify-start gap-2">
            <p>Username: </p>
            <input
              placeholder="..."
              value={username}
              maxLength={30}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="px-4 py-2 border border-gray-300 rounded-[30px]"
            />
          </div>
          <div className="flex items-center justify-start gap-2">
            <p>Phone number: </p>
            <input
              placeholder="..."
              value={phone}
              maxLength={11}
              onChange={(e) => {
                if (e.target.value.match(/^[0-9]*$/)) {
                  setPhone(e.target.value);
                }
              }}
              className="px-4 py-2 border border-gray-300 rounded-[30px]"
            />
          </div>
        </div>
      </div>

      <div
        className={`w-full flex items-center justify-end gap-8 font-montserrat pt-8`}
      >
        <button onClick={() => setOpen(false)} className="hover:underline">
          Cancel
        </button>
        <button
          disabled={!isValidData}
          onClick={handleConfirmEdit}
          className="px-8 py-2 bg-green-500 hover:bg-green-600 font-semibold text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
}
