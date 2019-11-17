import { Readable } from "stream";

export interface Upload {
  stream: Readable;
  filename: string;
  mimetype: string;
  encoding: string;
  listing?: string;
}
