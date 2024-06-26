"use server";

export default async function search(value: string): Promise<CepResponse> {
  const cep = value.replace(/\D/g, "");
  const cepValidation = /^[0-9]{8}$/;

  if (!cepValidation.test(cep)) {
    return { success: false, error: "CEP inválido" };
  }

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  if (!response.ok) {
    return { success: false, error: "Erro na integração com CEP" };
  }

  const data = await response.json();
  if (data.erro) {
    return { success: false, error: "CEP inválido" };
  }

  return { success: true, data };
}

type CepResponse =
  | { success: true; data: ViaCepData }
  | { success: false; error: string };

type ViaCepData = {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};
