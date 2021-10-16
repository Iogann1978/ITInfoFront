import {Publisher} from "./publisher";
import {InfoFile} from "./info-file";
import {Author} from "./author";
import {Tag} from "./tag";
import {Rate} from "./rate";
import {State} from "./state";
import {Descript} from "./descript";

export interface BookItem {
  id: number;
  title: string;
  isbn: string;
  pages: number;
  year: number;
  rate: Rate;
  state: State;
  publisher: Publisher;
  file: InfoFile;
  descript: Descript;
  authors: Author[];
  tags: Tag[];
}
