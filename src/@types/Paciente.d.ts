export default {};

declare global {
  namespace Paciente {
    interface Paciente {
      id?: string;
      consultorio: Consultorio.Consultorio | { id: string };
      responsavel?: Responsavel.Responsavel;
      antropometrico?: Antropometrico.Antropometrico;
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
