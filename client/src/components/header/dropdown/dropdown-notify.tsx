import { Tabs } from "antd"
import { ListMessage } from "../list/list-message";
import { ListNotify } from "../list/list-notify";
import { ListToDo } from "../list/list-todo";

const { TabPane } = Tabs;


export const DropdownContent = () => {
    return (
        <div
            className="dropdown-notify"
        >
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab={
                    <span>
                        Notice(4)
                    </span>
                }
                    key="1"
                >
                    <ListNotify />
                </TabPane>
                <TabPane tab={
                    <span>
                        Message(3)
                    </span>
                }
                    key="2"
                >
                    <ListMessage />
                </TabPane>
                <TabPane tab={
                    <span>
                        To do(4)
                    </span>
                }
                    key="3"
                >
                    <ListToDo />
                </TabPane>
            </Tabs>
        </div>
    )
}
