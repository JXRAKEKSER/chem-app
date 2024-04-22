class UserEntity {
    public username: string;
    public password: string;
    public name?: string;
    public surname?: string;

    constructor({ username, password, name, surname, }: UserEntity) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
    }
}

export default UserEntity;
