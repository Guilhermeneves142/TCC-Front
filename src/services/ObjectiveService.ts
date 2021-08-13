import http from "@/plugins/axios";

class ObjectiveService {
  findById(id: string) {
    return new Promise<Objective.Objective>((resolve, reject) => {
      http
        .get(`/objetivo/${id}`)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
  findAll() {
    return new Promise<Objective.Objective[]>((resolve, reject) => {
      http
        .get(`/objetivo/findAll`)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
  save(objective: Objective.Objective) {
    return new Promise<Objective.Objective>((resolve, reject) => {
      http
        .post("/objetivo", objective)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
}

export default new ObjectiveService();
