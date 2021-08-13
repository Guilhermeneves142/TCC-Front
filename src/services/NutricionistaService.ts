import http from "@/plugins/axios";

class NutricionistaService {
  findById(idNutricionista: number) {
    return new Promise<Nutricionista.Nutricionista>((resolve, reject) => {
      http
        .get(`/nutricionista/findById/${idNutricionista}`)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
  selectConsultorio(idNutricionista: string, idConsultorio: string) {
    const data = {
      idNutricionista,
      idConsultorio,
    };
    return new Promise<Nutricionista.Nutricionista>((resolve, reject) => {
      http
        .post("/nutricionista/bindConsultorio", data)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
}

export default new NutricionistaService();
