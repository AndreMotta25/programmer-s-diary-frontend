import { useContext } from "react";
import { ToastContext } from "../context/Toast";

export const useToastContext = () => useContext(ToastContext);