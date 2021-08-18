import http from "@/plugins/axios";

class AlimentoService {
  findAll() {
    return new Promise<Alimento.Alimento[]>((resolve, reject) => {
      http
        .get(`/alimento/findAll`)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
  save(alimento: Alimento.Alimento) {
    return new Promise<Alimento.Alimento>((resolve, reject) => {
      http
        .post("/alimento", alimento)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
}

export default new AlimentoService();
