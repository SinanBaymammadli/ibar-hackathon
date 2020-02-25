import { BASE_URL } from "./apiClient";

export interface IImage {
  url: string;
  width: number;
  height: number;
}

export function generateImage(json: any): IImage {
  return {
    url: `${BASE_URL}/${json.file?.directory}/${json.file?.name}`,
    width: json.file?.width,
    height: json.file?.height,
  };
}
