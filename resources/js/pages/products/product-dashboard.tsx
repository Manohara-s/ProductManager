import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import React, { useEffect, useState } from 'react'
import { Button, Drawer, Input, Popconfirm, Table, type TableProps } from 'antd';
import { Product } from '@/types/product';
import { Edit, KeyRound, Plus, PlusIcon, Trash2Icon } from 'lucide-react';
import ProductForm from './product-form';

function ProductDashboard({products}: {products: Product[]}) {

    const breadcrumbs: BreadcrumbItem[] = [{title: 'Products', href: 'products/index'}];

    const [drawerOpen, setDrawerOpen] = useState(false);

    const[selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

    const [filteredProducts, setFilteredProducts] = useState(products);

    const filterProducts = (keyword?: string) => {
        const lowerFilter = keyword?.toLowerCase();

        setFilteredProducts(
            products?.filter((item: any) =>
                Object.values(item).some(value =>
                    value !== null &&
                    value !== undefined &&
                    value.toString().toLowerCase().includes(lowerFilter ?? '')
                )
            )
        );
    }

    const editProduct = (id: number) => {
        const product = products.find(p => p.id == id);
        setSelectedProduct(product);
        setDrawerOpen(true);
    }

    useEffect(() => {
        if(!drawerOpen){
            setSelectedProduct(undefined);
        }
    }, [drawerOpen]);

    const columns: TableProps['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
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
            render: (_, {id}) => (
                <div>
                    <Button 
                        icon={<Edit />}
                        type="link" 
                        onClick={() => editProduct(id)}
                    />
                    <Popconfirm
                        title='Are Your Sure to delete ? '
                        onConfirm={() => {}}
                        okType='danger'
                        okText='Delete'
                    >
                        <Button 
                            icon={<Trash2Icon color='red' />}
                            type="link" 
                        />
                    </Popconfirm>
                </div>
            )
        }
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div>
                <div className='p-4'>
                    <div className='grid grid-cols-2 h-12 rounded-2xl mb-2 mt-2'>
                        <div>
                            <Input.Search onChange={(e) => filterProducts(e.target.value)}></Input.Search>
                        </div>
                        <div className='flex justify-end'>
                            <Button type='primary' icon={<PlusIcon />}  onClick={() => {
                                setSelectedProduct(undefined);
                                setDrawerOpen(true)
                            }}>New Product</Button>
                        </div>
                    </div>
                    <div>
                        <Table 
                            columns={columns}
                            dataSource={filteredProducts}
                        />
                    </div>
                </div>

                <div>
                    <Drawer
                        open={drawerOpen}
                        width={800}
                        onClose={() => setDrawerOpen(false)}
                    >
                        <ProductForm product={selectedProduct} saveCallBack={() => {setDrawerOpen(false)}} />
                    </Drawer>
                </div>

            </div>
        </AppLayout>        
    )
}

export default ProductDashboard