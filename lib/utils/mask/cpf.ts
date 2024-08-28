// https://medium.com/reactbrasil/m%C3%A1scara-de-cnpj-com-react-regex-bafb58d2285e

export default function cpfMask(value?: string) {
  return value
    ?.replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}
