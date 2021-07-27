export default {};

declare global {
  namespace Consultorio {
    interface Consultorio {
      id: number | string;
      nome: string;
      telefone: string;
      endereco: string;
      celular?: string;
    }
  }
}
