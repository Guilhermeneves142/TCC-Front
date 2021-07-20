import http from "@/plugins/axios";

class LoginService {
  login(login: Login.Login) {
    return new Promise<void>((resolve, reject) => {
      http.post("/login", login).then(
        (e) => resolve(e.data),
        (e) => reject(e.data)
      );
    });
  }
}

export default new LoginService();
