
import React from "react";
import styles from "./Modal.module.css";
import modulo_construccion from "../../assets/images/modulo_construccion.jpg";

const Modal = ({ setIsOpen }) => {
    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    {/* <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>Aviso...</h5>
                    </div> */}
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                       X {/* <RiCloseLine style={{ marginBottom: "-3px" }} /> */}
                    </button>
                    {/* <div className={styles.modalContent}> */}
                        <div
                            className="LandingSelection__item__Image"
                            style={{ background: `url(${modulo_construccion})` }}
                        ></div>
                    {/* </div> */}
                    <div className={styles.modalActions}>
                        <div className={styles.actionsContainer}>
                            {/* <button className={styles.deleteBtn} onClick={() => setIsOpen(false)}>
                Delete
              </button> */}
                            {/* <button
                                className={styles.cancelBtn}
                                onClick={() => setIsOpen(false)}
                            >
                                Salir
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;