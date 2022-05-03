import { Col, DatePicker, Form, Input, Select } from 'antd';
import { isRequired, isEmail, textLength, isPhoneNumber, isNotWhiteSpace } from '@constance/rules-of-input-antd';
import { YoutubeOutlined, FacebookOutlined, PhoneOutlined, CoffeeOutlined, UsergroupAddOutlined, NotificationOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
const { Option } = Select;

export const CompanyInfoForm = () => {
  return (
    <>
      <Col span={12}>
        <Form.Item
          name="name"
          label="Name"
          required
          rules={
            [
              isRequired('Name is required'),
              textLength(3, 50, 'Name'),
              isNotWhiteSpace
            ]
          }
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[isEmail, isRequired('Email is required')]}
          required
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="foundationDate"
          label="Foundation Date"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

      </Col>
      <Col span={12}>
        <Form.Item
          name="mobile"
          label="Phone Number"
          rules={[isPhoneNumber]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label="Type"
          initialValue={'Company'}
          style={{ display: 'none' }}
        >
          <Select>
            <Option value='Individual' key='Individual' >
              Individual
            </Option>
            <Option value='Company' key='Company' >
              Company
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="source"
          label="Source Info"
          initialValue={'Other'}
        >
          <Select>
            <Option value='Other' key='Other' >
              Other
            </Option>
            <Option value='Facebook' key='Facebook' >
              <FacebookOutlined /> Facebook
            </Option>
            <Option value='Youtube' key='Youtube' >
              <YoutubeOutlined /> Youtube
            </Option>
            <Option value='Direct Meeting' key='DirectMeeting' >
              <CoffeeOutlined /> Direct Meeting
            </Option>
            <Option value='Phone' key='Phone' >
              <PhoneOutlined /> Phone
            </Option>
            <Option value='Presenter' key='Presenter' >
              <UsergroupAddOutlined /> Presenter
            </Option>
            <Option value='Advertisement' key='Advertisement' >
              <NotificationOutlined /> Advertisement
            </Option>
            <Option value='Twitter' key='Twitter' >
              <TwitterOutlined /> Twitter
            </Option>
            <Option value='Instagram' key='Instagram' >
              <InstagramOutlined /> Instagram
            </Option>
          </Select>
        </Form.Item>

      </Col>
    </>
  )
}
