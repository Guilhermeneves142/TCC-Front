import http from "@/plugins/axios";

class PacienteService {
  findAll() {
    return new Promise<Responsavel.Responsavel[]>((resolve, reject) => {
      http
        .get(`/responsavel/findAll`)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
}

export default new PacienteService();
