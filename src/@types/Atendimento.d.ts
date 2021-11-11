import Doenca from "./Doenca";

export default {};

declare global {
  namespace Atendimento {
    interface Atendimento {
      id?: string;
      anamneses?: Anamneses;
      antropometrico?: Antropometrico;
      paciente: Paciente.Paciente | { id: string };
      planoAlimentar: PlanoAlimentar.PlanoAlimentar | { id: string };
      dataAtendimento?: string;
      createdOn?: number | string;
    }

    interface Antropometrico {
      id?: string;
      atendimento?: Atendimento | { id: string };
      data: string;
      idade: number;
      descricao: string;
      altura: number;
      peso: number;
      ombroCircunferencia: number;
      peitoralCircunferencia: number;
      cinturaCircunferencia: number;
      abdomenCircunferencia: number;
      quadrilCircunferencia: number;
      panturrilhaDireitaCircunferencia: number;
      panturrilhaEsquerdaCircunferencia: number;
      pescocoCircunferencia: number;
      punhoCircunferencia: number;
      coxaDireitaCircunferencia: number;
      coxaEsquerdaCircunferencia: number;
      bracoDireitoCircunferencia: number;
      bracoEsquerdoCircunferencia: number;
      antebraco: number;
      massaGorda: number;
      massaMagra: number;
      pesoResidual: number;
      pesoOsseo: number;
      pesoMuscula: number;
    }

    interface Anamneses {
      id?: string;
      atendimento?: Atendimento | { id: string };
      alergias: Alimento.Alimento[];
      patologias: Doenca.Doenca[];
      data: string;
      alcool: string;
      tabagismo: string;
      sono: number;
      praticaExercicios: string;
      medicamentos: string;
      apetite: string;
      mastigacao: string;
      consumoDagua: number;
      habitoUrinario: string;
      habitoIntestinal: string;
      observacoes: string;
    }
  }
}
