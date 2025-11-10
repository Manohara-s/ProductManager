import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import React from 'react'
import { Button, Input, Table, type TableProps } from 'antd';
import { Product } from '@/types/product';
import { Plus, PlusIcon } from 'lucide-react';

function ProductDashboard({products}: {products: Product[]}) {

    console.log(products);

    const breadcrumbs: BreadcrumbItem[] = [{title: 'Products', href: 'products/index'}];

    const columns: TableProps['columns'] = [
        {
            title: 'ID',
            dataIndex: 'i',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <>This is Render</>
            )
        }
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div>
                <div className='p-4'>
                    <div className='grid grid-cols-2 h-12 rounded-2xl mb-2 mt-2'>
                        <div>
                            <Input.Search></Input.Search>
                        </div>
                        <div className='flex justify-end'>
                            <Button type='primary' icon={<PlusIcon />}>New Product</Button>
                        </div>
                    </div>
                    <div>
                        <Table 
                            columns={columns}
                            dataSource={products}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>        
    )
}

export default ProductDashboard