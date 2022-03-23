import { useContacts } from "@modules/contact/query/contact.get";
import { PUBLIC_USER_INFO } from "@constance/cookie";
import { useCookies } from "react-cookie";
import { ContactTable } from "@components/contact/contact-table";

const SalesContactList = () => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data, isLoading } = useContacts(id);  
  
  return (
    <div className="contact-container">
      <ContactTable
        dataSource={data}
        isLoading={isLoading}
      />
    </div>
  )
}
export default SalesContactList