import { useQueryProducts } from '@modules/product/query/products.get';
import { Form, Select } from 'antd';
const { Option } = Select;

export const SelectBoxProduct = () => {
  const { data: products } = useQueryProducts();
  return (
    <>
      {products &&
        <Form.Item
          label='Product Name'
          initialValue={products[0].id}
          name='productId'
        >
          <Select>
            {products.map((product) => (
              <Option value={product.id} key={product.id}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Form.Item>}
    </>
  )
}
