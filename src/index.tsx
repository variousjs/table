import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Table, { ColumnsType, Connector } from './table'
import Text from './renders/text'
import { User } from './type'

const connector = new Connector({
  text: Text,
})

const dataSource: User[] = [
  {
    id: '1',
    name: 'Jack',
  },
  {
    id: '2',
    name: 'Sam',
  },
]

const Entry = () => {
  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      renderType: 'text',
    },
  ]

  return (
    <div style={{ padding: 50 }}>
      <Table<User>
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        pagination={false}
        connector={connector}
      />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Entry />,
)
