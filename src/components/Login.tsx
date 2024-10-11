
"use client"
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      const response = await fetch('https://xteam-test-backend.vercel.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        console.log("fgdf", response);
        throw new Error(response.statusText);

      }

      const data = await response.json();
      message.success('Login successful!');
      // localStorage.setItem('token', data._id);
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);
      document.cookie = `${"ACCESS_TOKEN"}=${data._id};expires=${expires.toUTCString()};path=/`;

      router.push("/dashboard")
      console.log('Login successful:', data);
    } catch (error: any) {
      message.error(`Login failed ${error}`);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <Form
        name="login"
        onFinish={onFinish}
        className="w-96 p-6 bg-white shadow-md rounded"
      >
        <h2 className="text-center text-2xl font-bold mb-14 text-blue-700">Login</h2>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Email" className="border border-blue-300 rounded" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" className="border border-blue-300 rounded" />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit" className="w-full bg-blue-600 mt-3 hover:bg-blue-700">
            Log In
          </Button>
        </Form.Item>
        <a href='/' className='text-sm text-blue-300'>back to home</a>
      </Form>
    </div>
  );
};

export default LoginForm;

