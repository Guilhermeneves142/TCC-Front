export default {};

declare global {
  namespace Doenca {
    interface Doenca {
      id?: string;
      consultorio:
        | Consultorio.Consultorio
        | {
            id: string;
          };
      alimentos: Alimento.Alimento[];
      nome: string;
      descricao: string;
      default: boolean;
    }
  }
}
