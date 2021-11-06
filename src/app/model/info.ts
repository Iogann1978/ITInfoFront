import {Rate} from "./rate";
import {State} from "./state";
import {Publisher} from "./publisher";
import {InfoFile} from "./info-file";
import {Descript} from "./descript";
import {Tag} from "./tag";
import {Content} from "./content";

export interface Info {
  id: number;
  title: string;
  year: number;
  rate: Rate;
  state: State;
  publisher: Publisher;
  file: InfoFile;
  content?: Content;
  descript?: Descript;
  tags: Tag[];
}
