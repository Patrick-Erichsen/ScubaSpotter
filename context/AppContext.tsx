import Spinner from "@/components/ui/spinner";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type FileReaderResult = Extract<FileReader["result"], string>;

export interface AppContextProps {
  diveSiteName?: string;
  setDiveSiteName: Dispatch<SetStateAction<string | undefined>>;
  images: {
    [fileName: string]: FileReaderResult;
  };
  setImages: Dispatch<
    SetStateAction<{
      [fileName: string]: string;
    }>
  >;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}

const initialContext: AppContextProps = {
  diveSiteName: undefined,
  setDiveSiteName: () => {},
  images: {},
  setImages: () => {},
  isSubmitting: false,
  setIsSubmitting: () => {},
};

export const AppContext = createContext<AppContextProps>(initialContext);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [images, setImages] = useState<AppContextProps["images"]>({});
  const [diveSiteName, setDiveSiteName] =
    useState<AppContextProps["diveSiteName"]>(undefined);

  return (
    <AppContext.Provider
      value={{
        diveSiteName,
        setDiveSiteName,
        images,
        setImages,
        setIsSubmitting,
        isSubmitting,
      }}
    >
      {isSubmitting && <Spinner />}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
};
