import { useTeams } from '@modules/team/query/team.get';
import { Form, Select } from 'antd'
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
    const salePerson = teams?.find((value) => value.id === team?.id)
    setSalePerson(salePerson?.accounts);
  }, [teams])

  const handleSelectedTeam = (teamId: String) => {
    const salePerson = teams.find((value) => value.id === teamId)
    setSalePerson(salePerson.accounts);
  }

  return (
    <>
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

    </>
  )
}
