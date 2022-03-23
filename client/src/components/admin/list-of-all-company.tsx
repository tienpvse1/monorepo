import { CompanyTable } from '@components/company/company-table';
import { useCompanies } from '@modules/company/query/company.get';

const ListOfAllCompany = () => {
  const { data, isLoading } = useCompanies();
  return (
    <div className="company-container">
      <CompanyTable
        dataSource={data}
        isLoading={isLoading}
      />
    </div>
  )
}

export default ListOfAllCompany