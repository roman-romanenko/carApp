import type {Dispatch, SetStateAction} from "react";

export type StepProgressProps = {
    steps: string[];
    currentStep: number;
    setStep: Dispatch<SetStateAction<number>>
};