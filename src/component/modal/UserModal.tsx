// UserModal.tsx
import {Modal} from "antd";
import NiceModal, {antdModal, useModal} from "@ebay/nice-modal-react";
import {useFormik} from "formik";
import NotificationModal from "./NotificationModal.tsx";
// import type {CreateUserResponse, UserData} from "@/model/response/CreateUserResponse.ts";
import {UserService} from "@/service/UserService.ts";
import {BaseInput} from "../input/BaseInput.tsx";
import {CreateUserResponse} from "@/model/response/CreateUserResponse.ts";


export default NiceModal.create(() => {
    const modal = useModal();
    const notificationModal = useModal(NotificationModal);
    const [createUser, {isLoading: createLoading}] = UserService.useCreateUserMutation();


    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: ""
        },
        onSubmit: () => console.log("Submit"),
    })

    const handleResponse = (responseData: CreateUserResponse) => {
        console.log(responseData)
        notificationModal.show({
            success: true,
            message: "Successfully created user.",
        })
        modal.hide();
    }

    const handleSubmit = () => {
        createUser(formik.values).then((data) => {
            const responseData = data?.data;
            if (responseData) handleResponse(responseData);
        });
        modal.resolve(formik.values);
        // modal.hide();
    };

    return (
        <Modal
            {...antdModal(modal)}
            open={modal.visible}
            title="Create User"
            footer={null}
            // okText="Create"
            // onOk={handleSubmit}
            // onCancel={() => modal.hide()}
            width={800}
            centered
        >
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit()
            }} className={"loginForm"}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '20px'}}>
                    <div style={{width: "100%"}}>
                        <label className="formLabel">Name</label>
                        <BaseInput
                            name="name"
                            placeholder="Enter Name"
                            formik={formik}
                            className={"formInput"}
                        />
                    </div>
                    <div style={{width: "100%"}}>
                        <label className="formLabel">Username</label>
                        <BaseInput
                            name="username"
                            placeholder="Enter Username"
                            formik={formik}
                            className={"formInput"}
                        />
                    </div>
                    <div style={{width: "100%"}}>
                        <label className="formLabel">email</label>
                        <BaseInput
                            name="email"
                            placeholder="Enter email"
                            formik={formik}
                            className={"formInput"}
                        />
                    </div>
                </div>

                <div className={"formButtonGroup"}>
                    <BaseInput
                        type={"submit"}
                        name={"Create"}
                        className={"formButton"}
                        formik={formik}
                        loading={createLoading}
                    />
                    <BaseInput
                        type={"button"}
                        name={"Cancel"}
                        value={"Cancel"}
                        className={"formButton"}
                        inputStyle={{backgroundColor: "transparent", border: '1px solid #d9d9d9', color: 'black'}}
                        formik={formik}
                        onClick={() => {
                            modal.hide();
                        }}
                    />
                </div>
            </form>
        </Modal>
    );
});
