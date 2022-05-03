import { CompanyTable } from '@components/company/company-table';
import { ICompany } from '@modules/company/entity/company.entity';
import { useCompanies } from '@modules/company/query/company.get';
import { useEffect, useState } from 'react';

const ListOfAllCompany = () => {
  const { data, isLoading } = useCompanies();
  const [dataCompany, setDataCompany] = useState<ICompany[]>();
  
  console.log('dataC:', data);
  

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
      />
    </div>
  )
}

export default ListOfAllCompany