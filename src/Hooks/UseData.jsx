// react import
import { useContext } from "react";
// context import
import { DataContext } from "../Context/DataContext";

export function useData() {
    return useContext(DataContext);
}
