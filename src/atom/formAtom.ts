import { atom } from "jotai";

export const isFormValid = atom<{ [key: string]: boolean }>();
