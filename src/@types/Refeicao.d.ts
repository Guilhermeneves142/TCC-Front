export default {};

declare global {
  namespace Refeicao {
    interface Refeicao {
      id: string;
      consultorio: Consultorio.Consultorio;
      nome: string;
      default: boolean;
    }
  }
}
