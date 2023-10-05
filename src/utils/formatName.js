export default function formatName(inputName) {
  let usernameFormatado =
    inputName.charAt(0).toUpperCase() + inputName.slice(1);
  return usernameFormatado;
}
