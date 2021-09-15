export default {};

declare global {
  namespace Refeicao {
    interface Refeicao {
      id?: string;
      consultorio:
        | Consultorio.Consultorio
        | {
            id: string;
          };
      nome: string;
      default: boolean;
    }
  }
}
