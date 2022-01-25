import axios from "axios";
export const Home = ({}) => {
  const handleClick = async () => {
    const { data } = await axios.get("api/");
    alert(data.message);
  };

  return (
    <div>
      <button onClick={handleClick}>get data</button>
    </div>
  );
};
