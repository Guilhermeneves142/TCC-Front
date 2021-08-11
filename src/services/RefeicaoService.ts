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
}

export default new RefeicaoService();
