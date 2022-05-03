import { CompanyTable } from '@components/company/company-table';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { ICompany } from '@modules/company/entity/company.entity';
import { useCompaniesById } from '@modules/company/query/company.get';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { searchCompanyOwner } from '@modules/company/query/company.get';

const SalesCompanyList = () => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);

  const { data, isLoading } = useCompaniesById(id);
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
        searchMethod={searchCompanyOwner}
      />
    </div>
  )
}

export default SalesCompanyList