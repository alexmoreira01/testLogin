import { randomUUID } from 'crypto';
import { Replace } from '../../helpers/Replace';

export interface TokenProps {
  refresh_token: string;
  user_id: string;
  expires_date: Date;
  created_at: Date;
}

export class Token {
  private _id: string;
  private props: TokenProps;

  constructor(
    props: Replace<TokenProps, { created_at?: Date }>,
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
  public set refresh_token(refresh_token: string) {
    this.props.refresh_token = refresh_token;
  }

  public get refresh_token(): string {
    return this.props.refresh_token;
  }

  public set user_id(user_id: string) {
    this.props.user_id = user_id;
  }

  public get user_id(): string {
    return this.props.user_id;
  }

  public set expires_date(expires_date: Date) {
    this.props.expires_date = expires_date;
  }

  public get expires_date(): Date {
    return this.props.expires_date;
  }

  public set created_at(created_at: Date) {
    this.props.created_at = created_at;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}