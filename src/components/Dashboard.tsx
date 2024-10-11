"use client";
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import { CheckCircleOutlined, CheckCircleTwoTone, ClockCircleOutlined, EditTwoTone } from '@ant-design/icons';

const Dashboard = ({ token }: { token: string }) => {
    const router = useRouter()
    const [contacts, setContacts] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleLogout = () => {
        // Implement logout logic here
        message.success('You have logged out successfully!');
        const expires = new Date();
        expires.setDate(expires.getDate() + 1);
        document.cookie = `${"ACCESS_TOKEN"}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        router.replace("/")
    };

    const showChangePasswordModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values: any) => {
        try {
            const api = await fetch("https://xteam-test-backend.vercel.app/changepassword", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    currentPassword: values.currentPassword,
                    password: values.newPassword,
                    id: token
                })
            })
            if (!api.ok) {
                throw new Error("Wrong password")
            }
            console.log('Password change values:', values);
            message.success('Your password has been changed successfully!');
            form.resetFields();
            setIsModalVisible(false);
        } catch (error: any) {
            message.error(error.message)
        }
    };

    const fetchData = async () => {
        const api = await fetch("https://xteam-test-backend.vercel.app/contact", {
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
    },[])


    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone Number', dataIndex: 'number', key: 'number' },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
            render: (item: any) => <Tooltip title={item}>{item.trim().slice(0, 10) + "..."}</Tooltip>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (item: any) => {
               return item=="PENDING"? <Tooltip title={item}><ClockCircleOutlined style={{ color: 'yellow', fontSize: '24px' }} /></Tooltip>:<Tooltip title={item}><CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} /></Tooltip>

            }
        },
        {
            title: 'Reply',
            dataIndex: 'reply',
            key: 'reply',
            render: (item: any) => <Tooltip title={item}>{String(item).slice(0, 10) + "..."}</Tooltip>
        },
        {
            title: 'Action',
            dataIndex: '',
            key: '',
            render: (item: any, items: any) => <div className='cursor-pointer' onClick={() => router.push(`/edit?id=${items._id}`)}><EditTwoTone style={{fontSize: '24px'}} /></div>
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
                        rules={[{ required: true, message: 'Please input your new password!' },
                            {pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: "special character not allow and must be more then 8"
                            }
                        ]}
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
