import http from "@/plugins/axios";

class ObjectiveService {
  findAll() {
    return new Promise<Objective.Objective[]>((resolve, reject) => {
      http
        .get(`/objective/findAll`)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
}

export default new ObjectiveService();
