import { SelectBoxSalePerson } from '@components/sale/select-box-sale-person';
import { ITeam } from '@modules/team/entity/team.entity';
import React from 'react'

interface OpportunityTeamFormProps {
  team?: ITeam;
}

export const OpportunityTeamForm: React.FC<OpportunityTeamFormProps> = ({ team }) => {
  return (
    <>
      <SelectBoxSalePerson team={team} />
    </>
  )
}
