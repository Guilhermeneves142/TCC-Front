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
}

export default new NutricionistaService();
