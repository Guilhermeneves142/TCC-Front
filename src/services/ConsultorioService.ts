import http from "@/plugins/axios";

class ConsultorioService {
  createNewConsultorio(
    consultorio: Consultorio.Consultorio,
    idNutricionista: string
  ) {
    const data = {
      consultorio,
      idNutricionista,
    };
    return new Promise<Consultorio.Consultorio>((resolve, reject) => {
      http
        .post("/consultorio", data)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
  findAll() {
    return new Promise<Consultorio.Consultorio[]>((resolve, reject) => {
      http
        .get("/consultorio/findAll")
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
}

export default new ConsultorioService();
