import http from "@/plugins/axios";

class PacienteService {
  findById(id: string) {
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
  save(paciente: Paciente.Paciente, responsavel?: Responsavel.Responsavel) {
    return new Promise<Paciente.Paciente>((resolve, reject) => {
      http
        .post(`/paciente/create`, { paciente, responsavel })
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
}

export default new PacienteService();
