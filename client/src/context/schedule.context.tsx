import { useToggle } from "@hooks/useToggle";
import { createContext, useContext } from "react";

interface IScheduleContext {
  isOpenModal: boolean;
  toggleModal: () => void;
}

const ScheduleContext = createContext<IScheduleContext>(null);

export const ScheduleContextProvider: React.FC = ({ children }) => {

  const [isOpenModal, toggleModal] = useToggle();

  const valueScheduleContext: IScheduleContext = {
    isOpenModal,
    toggleModal
  }

  return <ScheduleContext.Provider value={valueScheduleContext}>
    {children}
  </ScheduleContext.Provider>
}

export const useScheduleContext = () => useContext(ScheduleContext);