import React, { useState } from 'react'
import "./index.css"
import "antd/dist/antd.css";
import { Button, Form, Input, Card, message } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
const Login = () => {
    const [form] = Form.useForm();
    const [formFilled, setFormFilled] = useState(true)
    const onFinish = (values) => {
        axios.post("https://success.nomupay.com/api/v1/LeadCapture/4ab941101f535a9263ccfadf196b94b0", values)
            .then((res) => {
                message.success('Login successful')
                form.resetFields();
            })
            .catch((err) => {
                message.error('Login unsuccessful')
                console.log(err, "this is err")
                form.resetFields();
            })
    };
    const onFormChange = (allFields) => {
        if (allFields?.every((item) => !!item.value || item.value === 0)) setFormFilled(false)
        else setFormFilled(true);
    }
    return (
        <div className='center-div'>
            <Card
                className='common-card'
            >
                <div>
                    <h1 className='heading'>Login</h1>
                    <Form
                    form={form}
                        name="basic"

                        wrapperCol={{
                            span: 24,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFieldsChange={(changedFields, allFields) => {
                            onFormChange(allFields);
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label={false}
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="FirstName"
                            />
                        </Form.Item>

                        <Form.Item
                            label={false}
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your lastname!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="LastName"
                            />
                        </Form.Item>

                        <Form.Item
                            label={false}
                            name="emailAddress"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                    message: 'Wrong format!',
                                }
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined />}
                                placeholder="Email"
                            />
                        </Form.Item>

                        <Form.Item className='text-center'>
                            <Button type="primary" htmlType="submit" className='btn-submit' disabled={formFilled}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    );
}

export default Login