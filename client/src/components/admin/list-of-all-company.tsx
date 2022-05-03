import { CompanyTable } from '@components/company/company-table';
import { ICompany } from '@modules/company/entity/company.entity';
import { useCompanies } from '@modules/company/query/company.get';
import { useEffect, useState } from 'react';
import { searchCompany } from '@modules/company/query/company.get';

const ListOfAllCompany = () => {
  const { data, isLoading } = useCompanies();
  const [dataCompany, setDataCompany] = useState<ICompany[]>();

  useEffect(() => {
    setDataCompany(data);
    return () => {
      // @ts-ignore
      setDataCompany([]);
    };
  }, [data]);
  
  return (
    <div className="company-container">
      <CompanyTable
        dataSource={dataCompany}
        isLoading={isLoading}
        setDataCompany={setDataCompany}
        searchMethod={searchCompany}
      />
    </div>
  )
}

export default ListOfAllCompany