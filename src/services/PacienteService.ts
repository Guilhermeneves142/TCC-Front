import http from "@/plugins/axios";

class PacienteService {
  findById(id: number) {
    return new Promise<Paciente.Paciente>((resolve, reject) => {
      http
        .get(`/paciente/findById/${id}`)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
  findAll() {
    return new Promise<Paciente.Paciente[]>((resolve, reject) => {
      http
        .get(`/paciente/findAll`)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
}

export default new PacienteService();
