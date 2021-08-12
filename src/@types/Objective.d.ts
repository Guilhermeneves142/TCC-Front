export default {};

declare global {
  namespace Objective {
    interface Objective {
      id: string | null;
      consultorio:
        | Consultorio.Consultorio
        | {
            id: string;
          };
      nome: string;
      descricao: string;
    }
  }
}
