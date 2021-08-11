export default {};

declare global {
  namespace Doenca {
    interface Doenca {
      id?: string | number;
      consultorio: Consultorio.Consultorio;
      nome: string;
      descricao: string;
      default: boolean;
    }
  }
}
