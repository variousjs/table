import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Table, { ColumnsType, Connector } from './table'
import Text from './renders/text'
import Input from './renders/input'
import data from './data.json'

const connector = new Connector({
  text: Text,
  input: Input,
})

const PAGE_SIZE = 5

const Entry = () => {
  const [currentPage, setCurrentPage] = useState(1)

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
  ]

  return (
    <div style={{ padding: 50 }}>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: PAGE_SIZE, current: currentPage, total: data.length }}
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
