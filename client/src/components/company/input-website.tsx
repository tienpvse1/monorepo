import { AutoComplete, Form } from "antd";
import { useState } from "react";
const { Option } = AutoComplete;

export const InputWebsite = () => {
  const [result, setResult] = useState([]);

  const handleSearch = (value: string) => {
    let res = [];

    if (!value || value.indexOf('.') >= 0) {
      res = [];
    } else {
      res = ['com', 'org', 'net', 'vn'].map((domain) => `${value}.${domain}`);
    }

    setResult(res);
  };

  return (
    <Form.Item
      name="website"
      label="Website"
    >
      <AutoComplete
        onSearch={handleSearch}
      >
        {result.map((email) => (
          <Option key={email} value={email}>
            {email}
          </Option>
        ))}
      </AutoComplete>
    </Form.Item>
  )
}
