import { Product } from '@/types/product'
import { router } from '@inertiajs/react';
import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { use, useEffect } from 'react'

function ProductForm({product, saveCallBack}: {product?: Product, saveCallBack: () => void}) {

    const [messageApi, contextHolder] = message.useMessage();

    const isNew = product === null || product === undefined;

    const [form] = Form.useForm();

    
    useEffect(() => {
        form.setFieldsValue({
            id: product?.id,
            name: product?.name,
            description: product?.description,
            price: product?.price,
            qty: product?.qty
        })
        console.log(product);
    }, [product]);

    const handleSave = async () => {
        try {
            const values = await form.validateFields();

            const storeUrl = (isNew) ? '/product/store' : '/product/update';

            router.post(storeUrl, values, {
                preserveScroll: true,
                onSuccess: (data: any) => {
                    messageApi.success('Successfully Saved');
                    form.resetFields();
                    saveCallBack();
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
                    <Form.Item name='id' className='hidden'>
                        <Input />
                    </Form.Item>
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