import { type UserDto } from "./types";

/* class UserEntity {
    private _email: string;
    private _name: string | null;
    private _surname: string | null;
    private _id?: number;

    constructor({ _email, _name, _surname, _id }: UserEntity) {
        this._email = _email;
        this._name = _name;
        this._surname = _surname;
        this._id = _id;
    }

    public get name(): string {
        return this._name ?? 'Аноним';
    }
    public get surname(): string {
        return this._surname ?? 'Аноним';
    }
    public get fullName(): string {
        return `${this.name} ${this.surname}`;
    }
    public get email() {
        return this._email;
    }
    public get id() {
        return this._id;
    }

    public static dtoToEntity(dto: UserDto) {
        return new this({ _name: dto.name, _surname: dto.surname, });
    }

    public static entityToDto(entity: UserEntity) {
        const { _id,  } = entity;
    }
} */

class UserEntity {
  private _username: string;
  private _name: string | null;
  private _surname: string | null;
  private _id: number;

  constructor({
    username,
    name,
    surname,
    id,
  }: {
    username: string;
    name: string | null;
    surname: string | null;
    id: number;
  }) {
    this._username = username;
    this._name = name;
    this._surname = surname;
    this._id = id;
  }

  public get name(): string {
    return this._name ?? "Аноним";
  }
  public get surname(): string {
    return this._surname ?? "Аноним";
  }
  public get fullName(): string {
    return `${this.name} ${this.surname}`;
  }
  public get username() {
    return this._username;
  }
  public get id() {
    return this._id;
  }
}

export default UserEntity;
