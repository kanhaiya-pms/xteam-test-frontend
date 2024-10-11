"use client";
import React from 'react';
import { Form, Input, Button, message } from 'antd';

const { TextArea } = Input;

const ContactUs = () => {
    const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    try {
      const response = await fetch('http://localhost:8080/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      message.success('Your message has been sent successfully!');
      // Reset the form after successful submission
      form.resetFields();
    } catch (error) {
      message.error('There was an error sending your message. Please try again later.');
      console.log(error);
      
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <Form
        name="contact"
        onFinish={onFinish}
        form={form}
        className="w-[500px] p-6 bg-white shadow-md rounded"
      >
        <h2 className="text-center text-2xl font-bold mb-14 text-blue-700">Contact Us</h2>

        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder="Name" className="border border-blue-300 rounded" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input placeholder="Email" className="border border-blue-300 rounded" />
        </Form.Item>

        <Form.Item
          name="number"
          rules={[
            { required: true, message: 'Please input your number!' },
            { pattern: /^\d{10}$/, message: 'Please enter a valid phone number (10 digits)' }
          ]}
        >
          <Input placeholder="Phone Number" className="border border-blue-300 rounded" />
        </Form.Item>

        <Form.Item
          name="comment"
          rules={[{ required: true, message: 'Please input your comment!' }]}
        >
          <TextArea showCount minLength={10} placeholder="Comment" className="border border-blue-300 rounded" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Submit
          </Button>
        </Form.Item>
      <a href='/login' className='text-sm text-blue-300'>login with admin</a>
      </Form>
    </div>
  );
};

export default ContactUs;
