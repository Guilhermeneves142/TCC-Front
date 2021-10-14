import http from "@/plugins/axios";

class AtendimentoService {
  findAll() {
    return new Promise<Alimento.Alimento[]>((resolve, reject) => {
      http
        .get(`/atendimento/findAll`)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
  save(atendimento: Atendimento.Atendimento) {
    return new Promise<Atendimento.Atendimento>((resolve, reject) => {
      http
        .post("/atendimento", atendimento)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
}

export default new AtendimentoService();
