import http from "@/plugins/axios";

class PlanoAlimentarService {
  findAll() {
    return new Promise<Refeicao.Refeicao[]>((resolve, reject) => {
      http
        .get(`/planoAlimentar/findAll`)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
  save(planoAlimentar: PlanoAlimentar.PlanoAlimentar) {
    return new Promise<PlanoAlimentar.PlanoAlimentar>((resolve, reject) => {
      http
        .post("/planoAlimentar", planoAlimentar)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
  findById(id: string) {
    return new Promise<Refeicao.Refeicao>((resolve, reject) => {
      http
        .get(`/planoAlimentar/${id}`)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
}

export default new PlanoAlimentarService();
