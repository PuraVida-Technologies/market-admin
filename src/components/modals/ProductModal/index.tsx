import { Post, updatePostStatus } from "@/services/post";
import { Button, Input, Space } from "antd";
import Image from "next/image";
import { FC, useState, ChangeEvent, useEffect } from "react";
import Modal from "react-modal";
import { useMediaQuery } from "react-responsive";
import styles from "./styles.module.scss";
import { notify } from "@/util/alertMessage";
import { isArray } from "lodash";

interface ProductModalProps {
  postDetails: Post;
  modalIsOpen: boolean;
  closeModal: () => void;
  customStyles: any;
}

const ProductModal: FC<ProductModalProps> = ({ postDetails, modalIsOpen, closeModal, customStyles }) => {
  const [mainImgIndex, setMainImgIndex] = useState<number>(-1);
  const [mainImgUrl, setMainImgUrl] = useState("");

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [reason, setReason] = useState("");
  const handlereasonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };
  const handleUpdatePostStatus = async (state: string) => {
    const response = await updatePostStatus(postDetails._id as string, state, reason);
    if (isArray(response)) {
      notify(response[0].message, "error");
    } else {
      notify("Status updated successfully", "success");
    }
  };
  useEffect(() => {
    let url = "/img/empty.png";
    if (mainImgIndex === -1 && postDetails.mainImageUrl) {
      url = postDetails.mainImageUrl;
    } else if (mainImgIndex >= 0 && postDetails.imagesUrls) {
      url = postDetails.imagesUrls[mainImgIndex];
    }
    setMainImgUrl(url);
  }, [mainImgIndex]);
  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div onClick={closeModal} className="custom-cursor">
            <Image src={"/icons/cancel.svg"} width={30} height={30} alt="cancel" />
          </div>
        </div>
        <Space>
          <div className="grid-2">
            <div>
              <Image src={mainImgUrl as string} width="400px" height="300px" alt="food image" />
              <div className="grid-3" style={{ width: isTabletOrMobile ? "100%" : "70%", height: "5rem" }}>
                {postDetails.imagesUrls?.slice(0, 3)?.map((url, index) => (
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
              <div className={styles.inputContainer}>
                Reason:
                <Input onChange={handlereasonChange}></Input>
              </div>
            </div>
          </div>
        </Space>
      </Modal>
    </div>
  );
};

export default ProductModal;
