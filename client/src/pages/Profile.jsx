import React, { useState } from "react";
import moment from "moment";
import { Modal, Row } from "antd";
import ChangePasswordForm from "../components/Forms/ChangePasswordForm";
import { getGlobalItem } from "../utils/utils";

const Profile = () => {
  const [modal, setModal] = useState(false);
  const data = getGlobalItem("user");

  const onChangePassword = async (values) => {
    // console.log(values);
    // setModal(false);
  };

  return (
    <>
      <Row className="justify-between mb-5">
        <h1 className="text-xl">My Profile</h1>
        {/* <Button type="primary" size="large" onClick={() => setModal(true)}>
          Change Password
        </Button> */}
      </Row>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="font-semibold text-gray-600">Name</div>
          <div className="text-gray-800">{data?.name}</div>
        </div>
        <div>
          <div className="font-semibold text-gray-600">Email</div>
          <div className="text-gray-800">{data?.email}</div>
        </div>
        <div>
          <div className="font-semibold text-gray-600">Role</div>
          <div className="text-gray-800">{data?.role}</div>
        </div>
        <div>
          <div className="font-semibold text-gray-600">Created At</div>
          <div className="text-gray-800">
            {moment(data?.createdAt).format("DD-MM-YYYY")}
          </div>
        </div>
      </div>

      <Modal
        maskClosable={false}
        destroyOnClose
        title="Change Password"
        centered
        open={modal}
        footer={null}
        onCancel={() => setModal(false)}
      >
        <ChangePasswordForm onFinish={onChangePassword} setModal={setModal} />
      </Modal>
    </>
  );
};

export default Profile;
