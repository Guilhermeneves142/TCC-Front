export default {};

declare global {
  namespace Alimento {
    interface Alimento {
      id: string;
      consultorio: Consultorio | null;
      doencas: Doenca[];
      nome: string;
      proteina: number | null;
      carboidrato: number | null;
      lipideos: number | null;
      energia: number | null;
      fibraAlimentar: number | null;
      vitaminaC: number | null;
      cinzas: number | null;
      calcio: number | null;
      magnesio: number | null;
      manganes: number | null;
      fosforo: number | null;
      ferro: number | null;
      sodio: number | null;
      potassio: number | null;
      cobre: number | null;
      zinco: number | null;
      tiamina: number | null;
      riboflavina: number | null;
      pirodoxina: number | null;
      niacina: number | null;
      default: boolean;
    }
  }
}
