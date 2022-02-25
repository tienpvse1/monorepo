import { FilterOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { MenuFilter } from './menu-filter';

export const ButtonFilter = () => {
	return (
		<Dropdown overlay={<MenuFilter />} placement='bottomRight'>
			<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
				<Button className="button-filter-pipeline"><FilterOutlined /></Button>
			</a>
		</Dropdown>
	)
}
