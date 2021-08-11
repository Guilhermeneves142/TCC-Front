export default {};

declare global {
  namespace Objective {
    interface Objective {
      id: string;
      consultorio: Consultorio.Consultorio;
      nome: string;
      descricao: string;
    }
  }
}
