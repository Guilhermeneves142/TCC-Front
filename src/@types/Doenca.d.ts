export default {};

declare global {
  namespace Doenca {
    interface Doenca {
      id: string | number | null;
      consultorio:
        | Consultorio.Consultorio
        | {
            id: string;
          };
      nome: string;
      descricao: string;
      default: boolean;
    }
  }
}
