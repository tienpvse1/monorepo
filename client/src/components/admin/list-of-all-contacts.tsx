import { useQueryAllContacts } from "@modules/contact/query/contact.get";
import { ContactTable } from "@components/contact/contact-table";
import { useEffect, useState } from "react";
import { IContact } from "@modules/contact/entity/contact.entity";

const ListOfAllContact = () => {

  const { data, isLoading } = useQueryAllContacts();
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
      />
    </div>
  )
}

export default ListOfAllContact