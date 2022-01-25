import { FilterOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { MenuFilter } from './menu-filter';

export const ButtonFilter = () => {
	return (
		<Dropdown overlay={<MenuFilter />} placement='bottomRight'>
			<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
				<FilterOutlined />
				<span style={{ marginLeft: '5px' }}>Filter</span>
			</a>
		</Dropdown>
	)
}
