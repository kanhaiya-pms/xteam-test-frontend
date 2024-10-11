"use client";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Dashboard = () => {
    const router = useRouter()
    const [contacts, setContacts] = useState([
        { key: 1, name: 'John Doe', email: 'john@example.com', number: '1234567890', comment: 'Hello!', role: 'PENDING' },
        { key: 2, name: 'Jane Smith', email: 'jane@example.com', number: '0987654321', comment: 'Need assistance.', role: 'APPROVED' },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleLogout = () => {
        // Implement logout logic here
        message.success('You have logged out successfully!');
        Cookies.set('token', "", { expires: 7 });
        router.replace("/")
    };

    const showChangePasswordModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values: any) => {
        console.log('Password change values:', values);
        message.success('Your password has been changed successfully!');
        form.resetFields();
        setIsModalVisible(false);
    };

    const fetchData = async () => {
        const api = await fetch("http://localhost:8080/contact", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await api.json()

        console.log(data);


        setContacts(data)
    }

    useEffect(() => {
        fetchData()
    }, [])


    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone Number', dataIndex: 'number', key: 'number' },
        { title: 'Comment', dataIndex: 'comment', key: 'comment' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Reply', dataIndex: 'reply', key: 'reply' },
        {
            title: 'Action',
            dataIndex: '',
            key: '',
            render: (item:any, items: any)=> <div onClick={()=>router.push(`/edit?id=${items._id}`)}>hii</div>
        },
    ];

    return (
        <div className="p-6 bg-blue-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">Dashboard</h1>
            <Button onClick={showChangePasswordModal} className="mr-4 bg-blue-600 hover:bg-blue-700">
                Change Password
            </Button>
            <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                Logout
            </Button>

            <Table dataSource={contacts} columns={columns} className="mt-6" />

            <Modal title="Change Password" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item
                        name="currentPassword"
                        rules={[{ required: true, message: 'Please input your current password!' }]}
                    >
                        <Input.Password placeholder="Current Password" />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                    >
                        <Input.Password placeholder="New Password" />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            { required: true, message: 'Please confirm your new password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm New Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="bg-blue-600 hover:bg-blue-700">
                            Change Password
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Dashboard;
