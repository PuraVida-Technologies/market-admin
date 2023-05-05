/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post, updatePostStatus } from "@/services/post";
import { Button, Input, Space, Tag, Tooltip } from "antd";
import Image from "next/image";
import { FC, useState, ChangeEvent, ChangeEventHandler, useEffect } from "react";
import Modal from "react-modal";
import { useMediaQuery } from "react-responsive";
import styles from "./styles.module.scss";
import { notify } from "@/util/alertMessage";
import { isArray } from "lodash";
import ConfirmDeletePostModal from "../../../components/PostReports/ConfirmDeletePostModal/index";
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { format } from "date-fns";

interface ProductModalProps {
  postDetails: Post;
  modalIsOpen: boolean;
  closeModal: () => void;
  customStyles: any;
}

const { TextArea } = Input;

const ProductModal: FC<ProductModalProps> = ({ postDetails, modalIsOpen, closeModal, customStyles }) => {
  const [mainImgIndex, setMainImgIndex] = useState<number>(-1);
  const [mainImgUrl, setMainImgUrl] = useState(postDetails.mainImageUrl);
  const [isConfirmDeletePostModalOpened, setIsConfirmDeletePostModalOpened] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [reason, setReason] = useState<string>("");
  const handleReasonChange: ChangeEventHandler<HTMLTextAreaElement> = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };
  const handleUpdatePostStatus = async (state: string) => {
    const response = await updatePostStatus(postDetails._id as string, state, reason);
    if (isArray(response)) {
      notify(response[0].message, "error");
      closeModal();
    } else {
      notify("Status updated successfully", "success");
      closeModal();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainImgIndex]);

  useEffect(() => {
    if (postDetails.mainImageUrl) {
      setMainImgUrl(postDetails.mainImageUrl);
    }

    if (postDetails.reason) {
      setReason(postDetails.reason as string);
    }
  }, [postDetails]);

  const handleDeleteModal = () => {
    setSelectedPost(postDetails);
    setIsConfirmDeletePostModalOpened(true);
  };

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
            <div className={styles.images_container}>
              <div style={{ border: "1px solid #d6cfcf" }}>
                <Image
                  src={mainImgUrl as string}
                  objectFit="contain"
                  layout="responsive"
                  width="400px"
                  height="300px"
                  alt="food image"
                />
              </div>
              <div className={styles.bottomSlider} style={{ width: isTabletOrMobile ? "100%" : "400px" }}>
                {postDetails.imagesUrls?.map((url, index) => (
                  <div
                    key={url}
                    style={{ border: mainImgIndex === index ? "3px solid #3653FE" : "", overflow: "hidden" }}
                    className="image_preview custom-rounded-1 custom-cursor"
                    onClick={() => setMainImgIndex(index)}
                  >
                    <Image
                      alt=""
                      className="object-cover rounded-t-xl"
                      width="50"
                      height="50"
                      src={url}
                      objectFit="contain"
                      layout="responsive"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
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
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ alignSelf: "flex-start" }}>{postDetails.address}</span>
                  {
                    postDetails.createdAt ?
                      <span style={{ alignSelf: "flex-end", marginLeft: "2rem" }}>Date: {format(new Date(postDetails.createdAt), "HH:mm MM-dd-yy")}</span>
                      : null
                  }
                </div>

              </div>
              <p className="custom-top-2 market-bold-1 modal-description-1">Description</p>
              <div className={styles.descriptionContainer}>
                <p className="description-1 modal-description-1">{postDetails.description}</p>
              </div>

              <div className={styles.tags_container}>
                {postDetails.tags?.map((tag) => {
                  return (
                    <Tag key={tag._id} color="blue">
                      {tag.name}
                    </Tag>
                  );
                })}
              </div>
              <div className={styles.latlng_container}>
                <p>
                  <span className="custom-top-2 market-bold-1">Longitude: </span>
                  <span>{postDetails?.location?.coordinates[0]}</span>
                </p>
                <p>
                  <span className="custom-top-2 market-bold-1">Latitude: </span>
                  <span>{postDetails?.location?.coordinates[1]}</span>
                </p>
              </div>

              <div className={styles.owner_container}>
                <p>
                  <span className="custom-top-2 market-bold-1">Email: </span>
                  <span>{postDetails?.owner?.email}</span>
                </p>
                <p>
                  <span className="custom-top-2 market-bold-1">Phone: </span>
                  <span>{postDetails?.owner?.phoneNumber}</span>

                  <span className={styles.check_icon}>
                    {postDetails?.owner?.isPhoneVerified === true ? (
                      <Tooltip title="Verified">
                        <CheckCircleOutlined style={{ color: "green" }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Not Verified">
                        <CloseCircleOutlined style={{ color: "red" }} />
                      </Tooltip>
                    )}
                  </span>
                </p>
              </div>

              <div className={styles.inputContainer}>
                <span className="custom-top-2 market-bold-1">Reason </span>
                <span>(optional) :</span>
                <TextArea
                  onChange={handleReasonChange}
                  rows={4}
                  value={reason}
                  disabled={postDetails.status !== "PENDING"}
                />
              </div>
              <div className={styles.actionComp}>
                {postDetails.status === "PENDING" ? (
                  <div className={styles.btns_comp}>
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
                ) : null}
                <div className={styles.delete_icon}>
                  <DeleteOutlined
                    onClick={handleDeleteModal}
                    style={{ fontSize: "20px", color: "red", fill: "red" }}
                    width="200"
                    title="Remove Post"
                  />
                </div>
              </div>
            </div>
          </div>
        </Space>
      </Modal>
      <ConfirmDeletePostModal
        isModalOpen={isConfirmDeletePostModalOpened}
        setIsModalOpen={setIsConfirmDeletePostModalOpened}
        setSelectedPost={setSelectedPost}
        selectedPost={selectedPost as unknown as Post}
        closeModal={closeModal}
      />
    </div>
  );
};

export default ProductModal;
