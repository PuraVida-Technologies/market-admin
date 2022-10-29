import { Button, Space } from "antd";
import Image from "next/image";
import React, { FC } from "react";
import Modal from "react-modal";
import { useMediaQuery } from "react-responsive";

interface ProductModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  customStyles: any;
  setSelectedIdx: (val: number) => void;
  selectedIdx: number;
}

const ProductModal: FC<ProductModalProps> = ({
  modalIsOpen,
  closeModal,
  customStyles,
  selectedIdx,
  setSelectedIdx,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

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
              <Image src={`/img/food-${selectedIdx}.png`} width="400px" height="300px" alt="food image" />
              <div className="grid-3" style={{ width: isTabletOrMobile ? "100%" : "70%", height: "5rem" }}>
                <div
                  style={{ border: selectedIdx === 1 ? "3px solid #3653FE" : "" }}
                  className="custom-img custom-rounded-1 custom-cursor"
                  onClick={() => setSelectedIdx(1)}
                >
                  <Image
                    alt=""
                    className=" object-cover rounded-t-xl"
                    src={"/img/food-1.png"}
                    width="100%"
                    height="100%"
                    layout="fill"
                  />
                </div>
                <div
                  style={{ border: selectedIdx === 2 ? "3px solid #3653FE" : "" }}
                  className="custom-img custom-rounded-1 custom-cursor"
                  onClick={() => setSelectedIdx(2)}
                >
                  <Image
                    alt=""
                    className=" object-cover rounded-t-xl"
                    src={"/img/food-2.png"}
                    width="100%"
                    height="100%"
                    layout="fill"
                  />
                </div>
                <div
                  style={{ border: selectedIdx === 3 ? "3px solid #3653FE" : "" }}
                  className="custom-img custom-rounded-1 custom-cursor"
                  onClick={() => setSelectedIdx(3)}
                >
                  <Image
                    alt=""
                    className=" object-cover rounded-t-xl"
                    src={"/img/food-3.png"}
                    width="100%"
                    height="100%"
                    layout="fill"
                  />
                </div>
              </div>
            </div>
            <div className="">
              <p className="market-bold-1 modal-title-1 ">Burger Mall</p>
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
                <span style={{ marginLeft: ".2rem" }}>Shop A, 2388 Glendale Blvd Los Angeles, CA 90039</span>
              </div>
              <p className="custom-top-2 market-bold-1 modal-description-1">Description</p>
              <p className="description-1 modal-description-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in mollis eros. Cras at malesuada lectus.
                Fusce ac massa nec nunc consectetur convallis.
              </p>

              <div className="top-1">
                <Button
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
                <Button shape="round" danger style={{ marginLeft: ".5rem" }}>
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </Space>
      </Modal>
    </div>
  );
};

export default ProductModal;
