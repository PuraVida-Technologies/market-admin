import "antd/dist/antd.css";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { Post, removePostAdminService } from "@/services/post";
import { notify } from "@/util/alertMessage";

interface ConfirmDeletePostModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (flag: boolean) => void;
  selectedPost: Post;
  setSelectedPost: (post: null) => void;
  closeModal?: () => void;
}

export default function ConfirmDeletePostModal({
  isModalOpen,
  setIsModalOpen,
  selectedPost,
  setSelectedPost,
  closeModal,
}: ConfirmDeletePostModalProps): JSX.Element {
  const [loading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleOk = () => {
    setIsDisabled(true);
    removePostAdminService("" + selectedPost._id)
      .then(() => {
        notify("Post Removed", "success");
        resetThenClose();
        if (closeModal) {
          closeModal();
        }
      })
      .catch(() => {
        notify("Can't Remove Post", "error");
        setIsDisabled(true);
      });
  };

  const resetThenClose = () => {
    setIsLoading(false);
    setIsDisabled(false);
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    resetThenClose();
  };

  return (
    <Modal
      title="Remove Post"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk} disabled={isDisabled}>
          remove
        </Button>,
      ]}
    >
      {selectedPost && <h4>Are you sure you want to remove &quot;{selectedPost.name}&quot; post?</h4>}
    </Modal>
  );
}
