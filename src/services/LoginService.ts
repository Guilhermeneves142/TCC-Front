import http from "@/plugins/axios";

class LoginService {
  login(login: Login.Login) {
    return new Promise<{ token: string }>((resolve, reject) => {
      http.post("/login", login).then(
        (e) => resolve(e.data),
        (e) => reject(e.data)
      );
    });
  }
  createNewUser(newUser: Nutricionista.Nutricionista) {
    return new Promise<Nutricionista.Nutricionista>((resolve, reject) => {
      http
        .post("/nutricionista/create", newUser)
        .then((e) => resolve(e.data))
        .catch((e) => reject(e));
    });
  }
}

export default new LoginService();
