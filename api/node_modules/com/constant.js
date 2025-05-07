export const constant = {
    EMPTY_OR_BLANK_REGEX: /^\s*$/,
    EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    URL_REGEX: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    USERNAME_REGEX: /^[a-zA-Z0-9]+$/,
    NAME_REGEX: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
    TIME_FORMAT_REGEX: /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/,
    POSITIVE_NUMBER_REGEX: /^[+]?\d+(\.\d+)?$/
}