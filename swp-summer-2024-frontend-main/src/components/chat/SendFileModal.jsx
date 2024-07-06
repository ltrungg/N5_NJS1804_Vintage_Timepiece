import React, { useState } from "react";
import { message, Modal } from "antd";
import { imageDb } from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import spinner from "../../components/spinner/spinner.svg";

export default function SendFileModal({
  file,
  url,
  open,
  setOpen,
  handleSendFile,
}) {
  const [isLoading, setIsLoading] = useState(false);

  if (file && !file.type.match("image")) {
    message.error({
      key: "uploadFailed",
      content: "Invalid uploaded image!",
      duration: 5,
    });
    setOpen(false);
    return;
  }

  const confirmSend = async () => {
    //Upload image
    if (file) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, file).then(async (value) => {
        setIsLoading(true);
        console.log("Uploaded: ", value.metadata);
        await getDownloadURL(value.ref)
          .then((res) => {
            console.log("URL NEW", res);
            handleSendFile(res);
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      });
    }
  };

  return (
    <Modal
      title=<p className="text-sm">Confirm to send</p>
      open={open}
      onCancel={(e) => {
        e.stopPropagation();
        setOpen(false);
      }}
      footer={null}
      centered
    >
      <div className="w-full flex flex-col items-center justify-center gap-4 font-montserrat">
        <img src={url} width={400} className="p-4 rounded-[30px]" />
        <div className="w-full flex items-center justify-between gap-4">
          <button
            onClick={() => setOpen(false)}
            className="grow py-2 border border-gray-400 hover:bg-stone-100 rounded-xl duration-200"
          >
            Cancel
          </button>
          <button
            onClick={confirmSend}
            className="grow py-2 bg-sky-700 text-white hover:bg-sky-800 rounded-xl font-semibold duration-200"
          >
            {isLoading ? (
              <img src={spinner} alt="" className="mx-auto" />
            ) : (
              "SEND"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
