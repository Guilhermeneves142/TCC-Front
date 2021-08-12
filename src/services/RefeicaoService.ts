import http from "@/plugins/axios";

class RefeicaoService {
  findAll() {
    return new Promise<Refeicao.Refeicao[]>((resolve, reject) => {
      http
        .get(`/refeicao/findAll`)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
  save(refeicao: Refeicao.Refeicao) {
    return new Promise<Refeicao.Refeicao>((resolve, reject) => {
      http
        .post("/refeicao", refeicao)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
  findById(id: string) {
    return new Promise<Refeicao.Refeicao>((resolve, reject) => {
      http
        .get(`/refeicao/${id}`)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
}

export default new RefeicaoService();
