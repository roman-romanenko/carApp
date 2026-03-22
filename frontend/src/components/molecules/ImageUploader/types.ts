export type ImageValue = File | string;

export interface ImageUploaderProps {
    value?: ImageValue[];
    onChange?: (files: ImageValue[]) => void;
}