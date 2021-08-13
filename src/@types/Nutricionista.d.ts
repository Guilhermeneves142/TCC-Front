export default {};

declare global {
  namespace Nutricionista {
    interface Nutricionista {
      id?: string | number;
      nome: string;
      cpf: string;
      crn: string;
      senha: string;
      email: string;
      celular: string;
      consultorio:
        | Consultorio.Consultorio
        | {
            id: string | null;
          };
    }
  }
}
