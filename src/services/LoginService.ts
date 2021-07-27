import http from "@/plugins/axios";
import store from "@/store/index";

class LoginService {
  login(login: Login.Login) {
    return new Promise<{ token: string; hasConsultorio: boolean }>(
      (resolve, reject) => {
        http.post("/login", login).then(
          (e) => resolve(e.data),
          (e) => reject(e.data)
        );
      }
    );
  }
  createNewUser(newUser: Nutricionista.Nutricionista) {
    return new Promise<Nutricionista.Nutricionista>((resolve, reject) => {
      http
        .post("/nutricionista/create", newUser)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
  clarifyToken() {
    return new Promise<void>((resolve, reject) => {
      http
        .get("/clarify")
        .then((e) => {
          store.commit("CLARIFY", e.data);
        })
        .catch((e) => reject(e));
    });
  }
}

export default new LoginService();
