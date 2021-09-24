export default {};

declare global {
  namespace PlanoAlimentar {
    interface PlanoAlimentar {
      id?: string;
      nome: string;
      refeicoes: PlanoAlimentarRefeicao[];
      consultorio: Consultorio.Consultorio | { id: string };
    }

    interface PlanoAlimentarRefeicao {
      id?: string;
      planoAlimentar?: PlanoAlimentar | { id: string };
      refeicao: Refeicao.Refeicao | { id: string };
      horario: string;
      alimentos: Alimento.Alimento[];
    }
  }
}
