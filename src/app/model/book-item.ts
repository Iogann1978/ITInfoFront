import {Publisher} from "./publisher";
import {InfoFile} from "./info-file";
import {Author} from "./author";
import {Tag} from "./tag";
import {Rate} from "./rate";
import {State} from "./state";
import {Descript} from "./descript";
import {Info} from "./info";

export interface BookItem extends Info {
  isbn: string;
  pages: number;
  authors: Author[];
}
