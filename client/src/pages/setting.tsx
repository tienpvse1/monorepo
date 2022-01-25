import { TabLoginAndSecurity } from "@components/setting/tab/login-security";
import { Radio, Tabs } from "antd";
import { ProfilePage } from "./profile";

const { TabPane } = Tabs;

export const SettingPage = () => {
	return (
		<div className="setting-container">
			<Tabs defaultActiveKey="1" centered className="tab-header">
				<TabPane tab={<Radio.Button className="custom-button" value={1}>Account settings</Radio.Button>} key="1">
					<ProfilePage />
				</TabPane>
				<TabPane tab={<Radio.Button className="custom-button" value={2}>Login & Security</Radio.Button>} key="2">
					<TabLoginAndSecurity />
				</TabPane>
				/*if need can uncomment to use */
				{/* <TabPane tab={<Radio.Button className="custom-button" value={2}>Notification Settings</Radio.Button>} key="3">
					<TabNotification />
				</TabPane> */}
			</Tabs>
		</div >
	)
}
