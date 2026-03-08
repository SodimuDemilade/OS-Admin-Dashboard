import {Modal} from "antd";
import NiceModal, {antdModal, useModal} from "@ebay/nice-modal-react";

interface NotificationModalProps {
    success: boolean;
    message: string;
}

export default NiceModal.create<NotificationModalProps>(({success, message}) => {
    const modal = useModal();

    return (
        <Modal
            {...antdModal(modal)}
            open={modal.visible}
            title={success ? "Success" : "Error"}
            okText="OK"
            onOk={() => modal.hide()}
            closable={true}
            centered
        >
            <p style={{color: success ? "green" : "red", fontWeight: 500, fontSize: 16}}>
                {message}
            </p>
        </Modal>
    );
});
