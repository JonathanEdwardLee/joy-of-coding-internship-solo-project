import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface CompletedCountContextProps {
  completedCount: number;
  setCompletedCount: Dispatch<SetStateAction<number>>;
}

const CompletedCountContext = createContext<
  CompletedCountContextProps | undefined
>(undefined);

export const CompletedCountProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [completedCount, setCompletedCount] = useState(0);
  console.log("Rendering CompletedCountProvider");

  return (
    <CompletedCountContext.Provider
      value={{ completedCount, setCompletedCount }}
    >
      {children}
    </CompletedCountContext.Provider>
  );
};

export const useCompletedCount = () => {
  const context = useContext(CompletedCountContext);
  if (!context) {
    throw new Error(
      "useCompletedCount must be used within a CompletedCountProvider"
    );
  }
  return context;
};

export default CompletedCountContext;
