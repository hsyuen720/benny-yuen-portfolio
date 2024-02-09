import { useContext } from "react";

import { HomeContext } from "./context";

const useHome = () => useContext(HomeContext);

export default useHome;
