"use client";
import React, { useRef, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { comment } from 'postcss';

const { TextArea } = Input;

const ContactUs = () => {
    const [form] = Form.useForm();
    const inputRef = useRef(null);
  const onFinish = async (values: any) => {
    // Object.values(values).map((item)=>{
    //    const str = item.trim()
    //    console.log(str);
       
    //    if (str.length <= 0) {
    //     message.error("field is required and only space not allow")
    //     return 
    //    }
    // })


    try {
      const response = await fetch('https://xteam-test-backend.vercel.app/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name:values.name.trim(),
            number:values.number,
            email:values.email,
            comment:values.comment.trim()

        }),
      });

      if (!response.ok) {
        console.log("=>",response);
        // message.error("remove extra space");
        throw new Error(`remove extra space`);
      }

      message.success('Your message has been sent successfully!');
      // Reset the form after successful submission
      form.resetFields();
    } catch (error: any) {
      message.error(error.message);
      console.log(error.message);
      
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
          <Input 
          placeholder="Name" 
          className="border border-blue-300 rounded" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input placeholder="Email (use active email)" className="border border-blue-300 rounded" />
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
