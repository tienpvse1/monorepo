import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { data } from '@interfaces/contact/list-contact';
import { Button, Space, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { ContactHeader } from './contact-header';

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {},
  getCheckboxProps: (record: any) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};

export const ContactData = () => {
	const title = () => <ContactHeader />;
	return (
		<Table
			tableLayout='fixed'
			rowSelection={{
				type: 'checkbox',
				...rowSelection,
			}}
			title={title}
			pagination={{ position: ['bottomCenter'], style:{fontSize: 15} }}
			dataSource={data}
			size={'large'}
		>
			<Column title='Name' dataIndex='name' key='name' render={(text) => <a>{text}</a>} />
			<Column title='Age' dataIndex='age' key='age' />
			<Column title='Address' dataIndex='address' key='address' />
			<Column title='Phone Number' dataIndex='number' key='number' />
			<Column title='Type' dataIndex='tags' key='tags' render={(tags: any[]) => (
				<span>
					{tags.map((tag) => {
						let color = tag.length > 7 ? 'geekblue' : 'green';
						if (tag === 'unknown') {
							color = 'volcano';
						}
						return (
							<Tag color={color} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						);
					})}
				</span>
			)} />
			<Column title='Action' dataIndex='action' key='action' render={() => (
				<Space size="small" style={{ width: '100%' }}>
					<Button type="ghost" shape='round'>
						<FormOutlined />
					</Button>

					<Button type="default" shape='round' danger>
						<DeleteOutlined />
					</Button>
				</Space>
			)} />
		</Table >
	)
}
