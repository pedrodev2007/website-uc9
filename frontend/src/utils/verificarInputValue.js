/*

sobre a função abaixo:

se o valor retornado for 0, se trata de uma string válida;
se o valor retornado for 1, se trata de um número válido;
se o valor retornado for -1, se trata de algum valor inválido.

ela retorna os valores acima porque é para ser versátil, a fim de servir emm outras partes do projeto,
independente do contexto.

*/

export function verificarInputValue(value) {
    if (typeof value === "string") {
        if (value.trim() == ""){
            return -1;
        } else {
            return 0;
        }
    }
    else if (typeof value === "number") {
        return 1;
    }
    else {
        return -1;
    }
}