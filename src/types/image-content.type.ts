import { BaseContentFileProps } from "./base-content-file.type";

export type ImageContentProps = BaseContentFileProps &{
   handleCopy?: () => void;
};
