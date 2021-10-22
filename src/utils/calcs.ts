class Calcs {
  IMC(peso: number, altura: number) {
    return peso / ((altura / 100) * (altura / 100)) || 0;
  }
  massaKG(peso: number, massaPercent: number) {
    if (massaPercent > 1) {
      massaPercent = massaPercent / 100;
    }
    return peso * massaPercent;
  }
  GET(
    genero: string,
    idade: number,
    peso: number,
    altura: number,
    nivelAtividadeFisca: string
  ) {
    const IMC = this.IMC(peso, altura);
    const FA = this.FA(idade, nivelAtividadeFisca, genero, peso, altura);
    if (idade <= 18) {
      if (genero == "masculino") {
        if (IMC < 24.9)
          return 88.5 - 61.9 * idade + FA * (26.7 * peso + 903 * altura) + 25;
        else return 114 - 50.9 * idade + FA * (19.5 * peso + 1161.4 * altura);
      } else {
        if (IMC < 24.9)
          return 135.3 - 30.8 * idade + FA * (10 * peso + 934 * altura) + 25;
        else return 389 - 41.2 * idade + FA * (15.0 * peso + 701.6 * altura);
      }
    } else {
      if (genero == "masculino") {
        return 662 - 9.53 * idade + FA * (15.91 * peso) + 539.6 * altura;
      } else {
        console.log(FA);
        return 354 - 6.91 * idade + FA * (9.36 * peso) + 726 * altura;
      }
    }
  }
  FA(
    idade: number,
    nivelAtividadeFisica: string,
    genero: string,
    peso: number,
    altura: number
  ) {
    const IMC = this.IMC(peso, altura);
    if (idade <= 18) {
      if (genero == "masculino") {
        if (IMC < 24.9)
          switch (nivelAtividadeFisica) {
            case "Sedentário":
              return 1;
              break;
            case "Pouco Ativo":
              return 1.13;
              break;
            case "Ativo":
              return 1.26;
              break;
            case "Muito Ativo":
              return 1.42;
              break;

            default:
              return 0;
              break;
          }
        else {
          switch (nivelAtividadeFisica) {
            case "Sedentário":
              return 1;
              break;
            case "Pouco Ativo":
              return 1.12;
              break;
            case "Ativo":
              return 1.24;
              break;
            case "Muito Ativo":
              return 1.45;
              break;

            default:
              return 0;
              break;
          }
        }
      } else {
        if (IMC < 24.9)
          switch (nivelAtividadeFisica) {
            case "Sedentário":
              return 1;
              break;
            case "Pouco Ativo":
              return 1.16;
              break;
            case "Ativo":
              return 1.31;
              break;
            case "Muito Ativo":
              return 1.56;
              break;

            default:
              return 0;
              break;
          }
        else {
          switch (nivelAtividadeFisica) {
            case "Sedentário":
              return 1;
              break;
            case "Pouco Ativo":
              return 1.18;
              break;
            case "Ativo":
              return 1.35;
              break;
            case "Muito Ativo":
              return 1.6;
              break;

            default:
              return 0;
              break;
          }
        }
      }
    } else {
      if (genero == "masculino") {
        switch (nivelAtividadeFisica) {
          case "Sedentário":
            return 1;
            break;
          case "Pouco Ativo":
            return 1.11;
            break;
          case "Ativo":
            return 1.25;
            break;
          case "Muito Ativo":
            return 1.48;
            break;

          default:
            return 0;
            break;
        }
      } else {
        switch (nivelAtividadeFisica) {
          case "Sedentário":
            return 1;
            break;
          case "Pouco Ativo":
            return 1.12;
            break;
          case "Ativo":
            return 1.27;
            break;
          case "Muito Ativo":
            return 1.45;
            break;

          default:
            return 0;
            break;
        }
      }
    }
  }
  GEB(genero: string, idade: number, peso: number, altura: number) {
    const IMC = this.IMC(peso, altura);
    let calcs = [];
    if (IMC < 24.9) {
      if (genero == "masculino") {
        calcs = [
          {
            idade: idade >= 3 && idade <= 10,
            calc: 68 - 43.3 * idade + 712 * altura + 19.2 * peso,
          },
          {
            idade: idade >= 10 && idade <= 18,
            calc: 68 - 43.3 * idade + 712 * altura + 19.2 * peso,
          },
          {
            idade: idade > 18,
            calc: 204 - 4 * idade + 450.5 * altura + 11.69 * peso,
          },
        ];
      } else {
        calcs = [
          {
            idade: idade >= 3 && idade <= 10,
            calc: 189 - 17.6 * idade + 625 * altura + 7.9 * peso,
          },
          {
            idade: idade >= 10 && idade <= 18,
            calc: 189 - 17.6 * idade + 625 * altura + 7.9 * peso,
          },
          {
            idade: idade > 18,
            calc: 255 - 2.35 * idade + 361.6 * altura + 9.39 * peso,
          },
        ];
      }
    } else {
      if (genero == "masculino") {
        calcs = [
          {
            idade: idade >= 3 && idade <= 10,
            calc: 420 - 33.5 * idade + 418.9 * altura + 16.7 * peso,
          },
          {
            idade: idade >= 10 && idade <= 18,
            calc: 420 - 33.5 * idade + 418.9 * altura + 16.7 * peso,
          },
          {
            idade: idade > 18,
            calc: 293 - 3.8 * idade + 456.4 * altura + 10.12 * peso,
          },
        ];
      } else {
        calcs = [
          {
            idade: idade >= 3 && idade <= 10,
            calc: 516 - 26.8 * idade + 347 * altura + 12.4 * peso,
          },
          {
            idade: idade >= 10 && idade <= 18,
            calc: 516 - 26.8 * idade + 347 * altura + 12.4 * peso,
          },
          {
            idade: idade > 18,
            calc: 247 - 2.67 * idade + 401.5 * altura + 8.6 * peso,
          },
        ];
      }
    }
    return calcs.find((e) => e.idade)?.calc;
  }
}

export default new Calcs();
