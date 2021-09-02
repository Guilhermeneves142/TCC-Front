export default {};

declare global {
  namespace Responsavel {
    interface Responsavel {
      id?: string;
      consultorio: Consultorio.Consultorio | { id: string };
      nome: string;
      cpf: string;
      email: string;
      telefone: string;
      celular: string;
      endereco: string;
    }
  }
}
