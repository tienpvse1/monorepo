import { useQueryAllContacts } from "@modules/contact/query/contact.get";
import { ContactTable } from "@components/contact/contact-table";

const ListOfAllContact = () => {

  const { data, isLoading } = useQueryAllContacts();
  console.log("all contact:", data);
  

  return (
    <div className="contact-container">
      <ContactTable
        dataSource={data}
        isLoading={isLoading}
      />
    </div>
  )
}

export default ListOfAllContact