import { useContacts } from "@modules/contact/query/contact.get";
import { PUBLIC_USER_INFO } from "@constance/cookie";
import { useCookies } from "react-cookie";
import { ContactTable } from "@components/contact/contact-table";
import { useEffect, useState } from "react";
import { IContact } from "@modules/contact/entity/contact.entity";
import { searchContactsOwner } from '@modules/contact/query/contact.get';

const SalesContactList = () => {

  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data, isLoading } = useContacts(id);
  const [dataContact, setDataContact] = useState<IContact[]>();

  useEffect(() => {
    setDataContact(data);
    return () => {
      // @ts-ignore
      setDataContact([]);
    };
  }, [data]);

  return (
    <div className="contact-container">
      <ContactTable
        dataSource={dataContact}
        isLoading={isLoading}
        setDataContact={setDataContact}
        queryKey={'sale'}
        searchMethod={searchContactsOwner}
      />
    </div>
  )
}
export default SalesContactList