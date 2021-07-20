export default {};

declare global {
  namespace Login {
    interface Login {
      usuario: string;
      senha: string;
    }
  }
}
