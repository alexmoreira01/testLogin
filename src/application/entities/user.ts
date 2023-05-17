import { randomUUID } from 'crypto';
import { Replace } from '../../helpers/Replace';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  avatar_url?: string;
  created_at: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(
    props: Replace<UserProps, { created_at?: Date }>,
    id?: string
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date()
    };
  }

  public get id(): string {
    return this._id;

  }
  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }

  public set isAdmin(isAdmin: boolean) {
    this.props.isAdmin = isAdmin;
  }

  public get isAdmin(): boolean {
    return this.props.isAdmin;
  }

  public set avatar_url(avatar_url: string) {
    this.props.avatar_url = avatar_url;
  }

  public get avatar_url(): string {
    return this.props.avatar_url;
  }

  public set created_at(created_at: Date) {
    this.props.created_at = created_at;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}