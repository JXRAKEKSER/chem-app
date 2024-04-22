"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserEntity {
    constructor({ username, password, name, surname, }) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
    }
}
exports.default = UserEntity;
