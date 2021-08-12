export default {};

declare global {
  namespace Refeicao {
    interface Refeicao {
      id: string | null;
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
