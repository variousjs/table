import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Table, { Connector, ColumnType } from './table'
import Text from './renders/text'
import Input from './renders/input'
import data from './data.json'
import { Button } from 'antd'

interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: Array<string>
  brand: string
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: Array<{
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
  }>
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
  thumbnail: string
  images: Array<string>
}

const connector = new Connector({
  text: Text,
  input: Input,
})

const PAGE_SIZE = 5

const Entry = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [dataSource, setDataSource] = useState<Product[]>(data as Product[])

  const columns: ColumnType<Product>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      renderType: 'input',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      renderType: 'text',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      renderType: 'input',
    },
    {
      title: 'Delete',
      dataIndex: 'm',
      render: (_, record) => {
        return <Button danger onClick={() => {
          const next = dataSource.filter((s) => s.id !== record.id)
          setDataSource(next)
          connector.deleteRow(record.id)
        }}>Delete</Button>
      }
    }
  ]

  return (
    <div style={{ padding: 50 }}>
      <Button
        onClick={() => {
          const value = connector.getTableState(dataSource)
          console.log(value)
        }}
        style={{ marginBottom: 10 }} type="primary">Get Table State</Button>
      <Table
        // dataSource={dataSource.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)}
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: PAGE_SIZE,
          // current: currentPage,
          total: dataSource.length,
          showTotal: (total) => `Total ${total}`,
        }}
        connector={connector}
        // onChange={({ current }) => {
        //   setCurrentPage(current!)
        // }}
      />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Entry />,
)
