export default {};

declare global {
  namespace Paciente {
    interface Paciente {
      id?: string;
      consultorio: Consultorio.Consultorio;
      responsavel: Responsavel.Responsavel | null;
      antropometrico: Antropometrico.Antropometrico | null;
      objetivos: Objective.Objective[];
      nome: string;
      email: string;
      telefone: string;
      celular: string;
      dataNascimento: string | number;
      genero: string;
    }
  }
}
