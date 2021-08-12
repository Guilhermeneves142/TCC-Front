import http from "@/plugins/axios";

class DoencaService {
  findById(id: string) {
    return new Promise<Doenca.Doenca>((resolve, reject) => {
      http
        .get(`/doenca/${id}`)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
  findAll() {
    return new Promise<Doenca.Doenca[]>((resolve, reject) => {
      http
        .get(`/doenca/findAll`)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
  save(doenca: Doenca.Doenca) {
    return new Promise<Doenca.Doenca>((resolve, reject) => {
      http
        .post("/doenca", doenca)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
}

export default new DoencaService();
