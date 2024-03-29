/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post } from "@/services/post";
import { updatePostStatus } from "@/services/updatePostsRequests";
import { Button, Input, Space } from "antd";
import Image from "next/image";
import { FC, useState, ChangeEvent, ChangeEventHandler, useEffect } from "react";
import Modal from "react-modal";
import { useMediaQuery } from "react-responsive";
import styles from "./styles.module.scss";
import { notify } from "@/util/alertMessage";
import { isArray } from "lodash";

interface ProductModalProps {
  postDetails: Post;
  postRequestId: string;
  modalIsOpen: boolean;
  closeModal: () => void;
  customStyles: any;
}

const { TextArea } = Input;

const UpdatePostRequestModal: FC<ProductModalProps> = ({
  postDetails,
  postRequestId,
  modalIsOpen,
  closeModal,
  customStyles,
}) => {
  const [mainImgIndex, setMainImgIndex] = useState<number>(-1);
  const [mainImgUrl, setMainImgUrl] = useState("");

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [reason, setReason] = useState("");
  const handlereasonChange: ChangeEventHandler<HTMLTextAreaElement> = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };
  const handleUpdatePostStatus = async (state: string) => {
    const response = await updatePostStatus(postRequestId as string, state, reason);
    if (isArray(response)) {
      notify(response[0].message, "error");
    } else {
      notify("Status updated successfully", "success");
      closeModal();
    }
  };
  useEffect(() => {
    let url = postDetails.mainImageUrl || "/img/empty.png";
    if (modalIsOpen && Object.keys(postDetails).length > 0) {
      if (mainImgIndex === -1 && postDetails.mainImageUrl) {
        url = postDetails.mainImageUrl;
      } else if (mainImgIndex >= 0 && postDetails.imagesUrls && postDetails.imagesUrls.length > 1) {
        url = postDetails.imagesUrls[mainImgIndex];
      }
    }
    setMainImgUrl(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainImgIndex]);

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div onClick={closeModal} className="custom-cursor">
            <Image src={"/icons/cancel.svg"} width={30} height={30} alt="cancel" />
          </div>
        </div>
        {modalIsOpen && Object.keys(postDetails).length > 0 ? (
          <Space>
            <div className="grid-2">
              <div>
                <Image src={mainImgUrl as string} width="400px" height="300px" alt="food image" />
                <div className={styles.bottomSlider} style={{ width: isTabletOrMobile ? "100%" : "400px" }}>
                  {(postDetails.imagesUrls as [])?.length > 1 &&
                    postDetails.imagesUrls?.map((url, index) => (
                      <div
                        key={url}
                        style={{ border: mainImgIndex === index ? "3px solid #3653FE" : "" }}
                        className="custom-img custom-rounded-1 custom-cursor"
                        onClick={() => setMainImgIndex(index)}
                      >
                        <Image
                          alt=""
                          className=" object-cover rounded-t-xl"
                          src={url}
                          width="100%"
                          height="100%"
                          layout="fill"
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="">
                <p className="market-bold-1 modal-title-1 ">{postDetails.name}</p>
                <div className="custom-flex-1">
                  <span>
                    <Image
                      src={"/icons/location.svg"}
                      width={30}
                      height={30}
                      alt="cancel"
                      style={{ marginLeft: "-.2rem" }}
                    />
                  </span>
                  <span style={{ marginLeft: ".2rem" }}>{postDetails.address}</span>
                </div>
                <p className="custom-top-2 market-bold-1 modal-description-1">Description</p>
                <div className={styles.descriptionContainer}>
                  <p className="description-1 modal-description-1">{postDetails.description}</p>
                </div>

                <div className={styles.inputContainer}>
                  Reason (optional) :
                  <TextArea onChange={handlereasonChange} rows={4} />
                </div>
                <div>
                  <Button
                    onClick={() => handleUpdatePostStatus("approved")}
                    type="primary"
                    shape="round"
                    size={"middle"}
                    style={{
                      background: "#3653FE",
                      color: "#ffffff",
                      border: "none",
                      outline: "none",
                      marginTop: "1rem",
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleUpdatePostStatus("rejected")}
                    shape="round"
                    danger
                    style={{ marginLeft: ".5rem" }}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </div>
          </Space>
        ) : null}
      </Modal>
    </div>
  );
};

export default UpdatePostRequestModal;
