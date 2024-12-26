import React, { useState } from "react";
import { Space, Button, Select, Col, Form, Row, Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { getGlobalItem } from "../../utils/utils";

export default function UserForm({
  mode,
  subAdminList,
  initialValues,
  onFinish,
  setModal,
}) {
  const [form] = Form.useForm();
  const [isUserRole, setIsUserRole] = useState(
    initialValues?.role === "user" ? true : false
  );
  const [passwordVisible, setPasswordVisible] = useState(false);
  const user = getGlobalItem("user");

  const handleOnFinish = (values) => {
    onFinish(values);
  };

  const handleValuesChange = (changedValues) => {
    if (changedValues.role !== undefined) {
      setIsUserRole(changedValues.role === "user");
    }
  };

  return (
    <>
      <Form
        name="user"
        layout="vertical"
        form={form}
        onFinish={handleOnFinish}
        initialValues={initialValues}
        onValuesChange={handleValuesChange}
      >
        <Row gutter={24}>
          <Col lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter name",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter valid email",
                  type: "email",
                },
              ]}
            >
              <Input
                data-testid="email"
                size="large"
                type="email"
                placeholder="Email"
              />
            </Form.Item>
          </Col>
          {mode === "add" && (
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter password" }]}
              >
                <Input
                  data-testid="password"
                  size="large"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  suffix={
                    passwordVisible ? (
                      <EyeOutlined
                        onClick={() => setPasswordVisible(false)}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <EyeInvisibleOutlined
                        onClick={() => setPasswordVisible(true)}
                        style={{ cursor: "pointer" }}
                      />
                    )
                  }
                />
              </Form.Item>
            </Col>
          )}
          {mode === "add" && user?.role === "admin" && (
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select role" }]}
              >
                <Select
                  placeholder="Select role"
                  filterOption={(inputValue, { props }) =>
                    props.children
                      .toString()
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  }
                >
                  {[
                    { label: "User", value: "user" },
                    { label: "Sub Admin", value: "subadmin" },
                  ].map(({ label, value }) => (
                    <Select.Option key={value} value={value}>
                      {label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
          {isUserRole && user?.role === "admin" && (
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Assigned To"
                name="assignedTo"
                rules={[
                  { required: true, message: "Please select assigned to" },
                ]}
              >
                <Select placeholder="Assigned to">
                  {subAdminList.map(({ label, value }) => (
                    <Select.Option key={value} value={value}>
                      {label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
        </Row>
        <Space className="d-flex justify-end w-full">
          <Button
            size="large"
            type="primary"
            onClick={() => setModal(false)}
            ghost
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Space>
      </Form>
    </>
  );
}
