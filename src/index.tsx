import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Table, { ColumnsType, Connector } from './table'
import Text from './renders/text'
import Input from './renders/input'
import data from './data.json'
import { Button } from 'antd'

const connector = new Connector({
  text: Text,
  input: Input,
})

const PAGE_SIZE = 5

const Entry = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [dataSource, setDataSource] = useState(data)

  const columns: ColumnsType = [
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
      dataIndex: 'id',
      render: (v) => {
        return <Button danger onClick={() => {
          const next = dataSource.filter((s) => s.id !== v)
          console.log(v, next.map(s => s.id))
          setDataSource(next)
        }}>Delete</Button>
      }
    }
  ]

  return (
    <div style={{ padding: 50 }}>
      <Table
        dataSource={dataSource.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: PAGE_SIZE,
          current: currentPage,
          total: dataSource.length,
          showTotal: (total) => `Total ${total}`,
        }}
        connector={connector}
        onChange={({ current }) => {
          setCurrentPage(current!)
        }}
      />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Entry />,
)
