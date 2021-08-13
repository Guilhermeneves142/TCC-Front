export default {};

declare global {
  namespace Objective {
    interface Objective {
      id?: string;
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
