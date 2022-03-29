import { useTeams } from '@modules/team/query/team.get';
import { Col, Form, Select } from 'antd'
import { useEffect, useState } from 'react';
import { IAccount } from '@interfaces/account';
import { ITeam } from '@modules/team/entity/team.entity';

const { Option } = Select;

interface SelectBoxSalePersonProps {
  team?: ITeam;
}

export const SelectBoxSalePerson: React.FC<SelectBoxSalePersonProps> = ({
  team
}) => {
  const { data: teams } = useTeams();
  const [salePerson, setSalePerson] = useState<IAccount[]>([]);

  useEffect(() => {
    const data = teams?.find((value) => value.id === team?.id)
    setSalePerson(data?.accounts);
  }, [teams])

  const handleSelectedTeam = (teamId: String) => {
    const data = teams.find((value) => value.id === teamId)
    setSalePerson(data.accounts);
  }

  return (
    <>
      <Col span={12}>
        <Form.Item
          name="saleTeam"
          label="Sale Team"
        >
          <Select
            onSelect={(teamId: string) => handleSelectedTeam(teamId)}
          >
            {teams?.map((team) => (
              <Option key={team.id}>
                {team.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name="salePerson"
          label="Sale Person"
        >
          <Select >
            {salePerson?.map((account) => (
              <Option key={account.id}>
                {`${account.firstName} ${account.lastName}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </>
  )
}
