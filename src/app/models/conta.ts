import { Tipo } from './tipo';

export class Conta {
  id?: number;
  descricao: string;
  valor: number;
  data: Date | string;
  tipo: Tipo;
  situacao: boolean;
}
