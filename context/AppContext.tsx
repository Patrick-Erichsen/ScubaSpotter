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
}

const initialContext: AppContextProps = {
  diveSiteName: undefined,
  setDiveSiteName: () => {},
  images: {},
  setImages: () => {},
};

export const AppContext = createContext<AppContextProps>(initialContext);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [diveSiteName, setDiveSiteName] =
    useState<AppContextProps["diveSiteName"]>(undefined);

  const [images, setImages] = useState<AppContextProps["images"]>({});

  return (
    <AppContext.Provider
      value={{ diveSiteName, setDiveSiteName, images, setImages }}
    >
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
