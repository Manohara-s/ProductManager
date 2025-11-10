import { Product } from '@/types/product'
import { router } from '@inertiajs/react';
import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'

function ProductForm({product}: {product?: Product}) {

    const [messageApi, contextHolder] = message.useMessage();

    const isNew = product === null || product === undefined;

    const [form] = Form.useForm();

    const handleSave = async () => {
        try {
            const values = await form.validateFields();

            const storeRoute = (isNew) ? 'customer.subscribed.store' : 'customer.subscribed.update';

            router.post((storeRoute), values, {
                preserveScroll: true,
                onSuccess: (data: any) => {
                    messageApi.success('Successfully Saved');
                    form.resetFields();
                },
                onError: (errors) => {
                    messageApi.error('Failed - ' + errors[0]);
                },
            });
        } catch (error) {
            messageApi.error('Please fix the validation errors. ' + error);
        }
    };

    return (
        <div>
            <Form layout='vertical' form={form}>
                <div className='grid grid-cols-2 gap-x-4 gap-y-0'>
                    <Form.Item label='Name' name='name' className='col-span-2'
                        rules={[
                            { required: true, message: 'Please Enter Product Name' },
                        ]}      
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label='Description' name='description' className='col-span-2'
                        rules={[
                            { required: true, message: 'Please Enter Product Description' },
                        ]}      
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label='Price' name='price'
                        rules={[
                            { required: true, message: 'Please Enter Product Price' },
                        ]}      
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label='Quantity' name='qty'
                        rules={[
                            { required: true, message: 'Please Enter Product Quantity' },
                        ]}      
                    >
                        <Input />
                    </Form.Item>
                </div>
            </Form>
            <div>
                <Button type='primary' onClick={handleSave}>
                    {isNew ? 'Add Product' : 'Save Product'}
                </Button>
            </div>

            {contextHolder}
        </div>
    )
}

export default ProductForm