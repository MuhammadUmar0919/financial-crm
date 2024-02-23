// react import
import { useContext } from "react";
// context import
import { SettingsContext } from "@/@core/context/settingsContext";

export function useSettings() {
    return useContext(SettingsContext);
};
