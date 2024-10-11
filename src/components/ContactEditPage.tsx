"use client";
import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

const { TextArea } = Input;

const ContactEditPage = () => {
    const param = useSearchParams()
    const router = useRouter()
    const id = param.get("id")
    const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    try {
      const response = await fetch('http://localhost:8080/contact/edit', {
        method: 'PATCH',
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
      router.back()
    } catch (error) {
      message.error('There was an error sending your message. Please try again later.');
      console.log(error);
      
    }
  };


  const fetchData = async () => {
    const api = await fetch(`http://localhost:8080/contact/${id}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    })

    const data = await api.json()

    form.setFieldsValue({
        name: data.name,
        email: data.email,
        number: data.number,
        comment: data.comment
    })

  }

  useEffect( ()=>{
    fetchData()
  },[])

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
          rules={[{ required: false, message: 'Please input your name!' }]}
        >
          <Input disabled placeholder="Name" className="border border-blue-300 rounded" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: false, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input disabled placeholder="Email" className="border border-blue-300 rounded" />
        </Form.Item>

        <Form.Item
          name="number"
          rules={[
            { required: false, message: 'Please input your number!' },
            { pattern: /^\d{10}$/, message: 'Please enter a valid phone number (10 digits)' }
          ]}
        >
          <Input disabled placeholder="Phone Number" className="border border-blue-300 rounded" />
        </Form.Item>

        <Form.Item
          name="comment"
          rules={[{ required: false, message: 'Please input your comment!' }]}
        >
          <TextArea disabled showCount minLength={10} placeholder="Comment" className="border border-blue-300 rounded" rows={4} />
        </Form.Item>

        <Form.Item
          name="reply"
          rules={[{ required: true, message: 'Please input your reply!' }]}
        >
          <TextArea showCount minLength={10} placeholder="Reply" className="border border-blue-300 rounded" rows={4} />
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Submit
          </Button>
        </Form.Item>
      <a href='/login' className='text-sm text-blue-300'>Back</a>
      </Form>
    </div>
  );
};

export default ContactEditPage;
