import http from "@/plugins/axios";

class DoencaService {
  findAll() {
    return new Promise<Doenca.Doenca[]>((resolve, reject) => {
      http
        .get(`/doenca/findAll`)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
}

export default new DoencaService();
