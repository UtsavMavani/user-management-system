import React from "react";
import { Button, Col, Form, Input, Row, Space, Dropdown } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

export default function ChangePasswordForm({ onFinish, setModal }) {
  const [form] = Form.useForm();

  const handleOnFinish = (values) => {
    onFinish(values);
  };

  const items = [
    {
      key: "passwordInfo",
      label: (
        <div className="flex flex-col">
          <span>1. Must be at least 6 characters are long.</span>
          <span>
            2. Must contains at least one uppercase and lowercase letters.
          </span>
          <span>
            3. Must contains at least one number and special characters.
          </span>
        </div>
      ),
    },
  ];

  const passwordInfo = () => {
    return (
      <Dropdown
        className="password-info-dropdown"
        key="info"
        placement="bottomLeft"
        arrow={{ pointAtCenter: true }}
        trigger={["click"]}
        menu={{ items }}
      >
        <InfoCircleOutlined className="text-primary password-info-icon" />
      </Dropdown>
    );
  };

  return (
    <>
      <Form
        name="change-password"
        layout="vertical"
        form={form}
        onFinish={handleOnFinish}
      >
        <Row>
          <Col lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Current Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter current password",
                },
              ]}
            >
              <Input.Password
                placeholder="Current Password"
                data-testid="currentPassword"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label={<span>New Password {passwordInfo()}</span>}
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter new password",
                },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message: "Please enter a valid password",
                },
              ]}
            >
              <Input.Password
                placeholder="New Password"
                data-testid="newPassword"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label={<span>Confirm Password {passwordInfo()}</span>}
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please enter confirm password",
                },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message: "Please enter a valid password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                data-testid="confirmPassword"
              />
            </Form.Item>
          </Col>
        </Row>
        <Space className="flex justify-end">
          <Button size="large" onClick={() => setModal(false)}>
            {" "}
            Cancel{" "}
          </Button>
          <Button size="large" type="primary" htmlType="submit">
            {" "}
            Submit{" "}
          </Button>
        </Space>
      </Form>
    </>
  );
}
