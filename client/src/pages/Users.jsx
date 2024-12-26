import {
  Button,
  Input,
  Modal,
  Pagination,
  Row,
  Space,
  Table,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { capitalize, getGlobalItem, getTableRows } from "../utils/utils";
import { EditFilled, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import Text from "antd/lib/typography/Text";
import UserForm from "../components/Forms/UserForm";
import {
  createUser,
  deleteUser,
  getUserList,
  updateUser,
} from "../services/user.services";

function Users() {
  const { Search } = Input;
  const [list, setList] = useState({ data: [], count: 0 });
  const [filteredList, setFilteredList] = useState({ data: [], count: 0 });
  const [modal, setModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subAdminList, setSubAdminList] = useState([]);
  const [mode, setMode] = useState("add");

  const [current, setCurrent] = useState(1);
  const [params, setParams] = useState({ skip: 0, limit: 10, search: "" });

  const user = getGlobalItem("user");

  useEffect(() => {
    getUserListData();
  }, []);

  const getUserListData = async () => {
    const response = await getUserList();

    const subAdminData = response?.data
      ?.filter((user) => user?.role === "subadmin")
      ?.map((user) => ({ label: user?.name, value: user?._id }));

    setSubAdminList(subAdminData);
    setList(response);
    setFilteredList(response);
  };

  const getUserData = () => getTableRows(getPaginatedData(filteredList.data));

  const setCurrentAndParams = (current, param) => {
    setCurrent(current);
    setParams({ ...param });
  };

  const getPaginatedData = (data) => {
    const startIndex = (current - 1) * params.limit;
    const endIndex = startIndex + params.limit;
    return data.slice(startIndex, endIndex);
  };

  const onPageChange = (page, pageSize) => {
    const skip = `${(page - 1) * pageSize}`;
    setCurrentAndParams(page, { ...params, limit: pageSize, skip });
  };

  const filterData = (data, search) => {
    if (!search) return data;
    const lowerSearch = search.toLowerCase();
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerSearch) ||
        item.email.toLowerCase().includes(lowerSearch)
    );
  };

  const onSearch = (search) => {
    setCurrentAndParams(1, { ...params, skip: 0, search });

    const filteredData = filterData(list.data, search);
    setFilteredList({
      data: filteredData,
      count: filteredData.length,
    });
  };

  const handleDelete = async () => {
    await deleteUser(initialValues?._id);
    setIsModalVisible(false);
    getUserListData();
  };

  const getUserColumn = () => {
    const columns = [];
    const keys = ["name", "email", "role", "createdAt", "action"];
    keys.forEach((key) => {
      const column = { title: capitalize(key), dataIndex: key, key };

      if (key === "createdAt") {
        column.width = 150;
        column.render = (_text, record) =>
          moment(record.createdAt).format("DD-MM-YYYY");
      }
      if (key === "action") {
        column.width = 90;
        column.render = (_text, data) => (
          <Space size="middle">
            <Tooltip title="Edit">
              <Button
                ghost
                icon={<EditFilled />}
                data-testid="table-edit-btn"
                type="primary"
                onClick={() => {
                  setInitialValues(data);
                  setModal(true);
                  setMode("edit");
                }}
              />
            </Tooltip>

            <Tooltip title="Delete">
              <Button
                type="primary"
                icon={<DeleteFilled />}
                data-testid="table-delete-btn"
                danger
                ghost
                disabled={data?._id === user?._id}
                onClick={() => {
                  setInitialValues(data);
                  setIsModalVisible(true);
                }}
              />
            </Tooltip>
          </Space>
        );
      }
      columns.push(column);
    });
    return columns;
  };

  const onFormSubmit = async (values) => {
    const data = { ...values };

    if (user?.role === "subadmin")
      Object.assign(data, { role: "user", assignedTo: user?._id });

    if (mode === "add") await createUser(data);
    else if (mode === "edit") await updateUser(initialValues?._id, data);
    else return;

    getUserListData();
    setModal(false);
  };

  return (
    <>
      <Row className="mb-5 justify-between">
        <h1 className="text-lg">Users ({filteredList?.count || 0})</h1>
        <div className="d-flex">
          <Search
            className="w-auto ms-2"
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
            enterButton
            size="large"
          />
          <Button
            className="ms-2"
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => {
              setMode("add");
              setInitialValues({});
              setModal(true);
            }}
            data-testid="table-create-btn"
          >
            Create
          </Button>
        </div>
      </Row>

      <Table
        scroll={{ x: "auto", y: "60vh" }}
        className="action-table"
        data-testid="table"
        dataSource={getUserData()}
        columns={getUserColumn()}
        pagination={false}
        showSorterTooltip={false}
      />

      <Pagination
        style={{ display: "flex", justifyContent: "end" }}
        current={current}
        onChange={onPageChange}
        total={filteredList?.count}
        defaultPageSize={10}
        showSizeChanger
        className="mt-4 text-right"
        data-testid="pagination"
      />

      <Modal
        maskClosable={false}
        destroyOnClose
        title={`${mode === "edit" ? "Edit" : "Create"} User`}
        centered
        open={modal}
        footer={null}
        onCancel={() => setModal(false)}
      >
        <UserForm
          mode={mode}
          subAdminList={subAdminList}
          initialValues={initialValues}
          setModal={setModal}
          onFinish={onFormSubmit}
        />
      </Modal>

      <Modal
        title="Delete User"
        open={isModalVisible}
        okButtonProps={{ danger: true }}
        centered
        onCancel={() => setIsModalVisible(false)}
        onOk={handleDelete}
        maskClosable={false}
      >
        <p>
          Are you sure you want to <Text type="danger">delete</Text>{" "}
          {initialValues?.name} ?
        </p>
      </Modal>
    </>
  );
}

export default Users;
