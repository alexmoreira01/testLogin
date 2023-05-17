import { randomUUID } from 'crypto';
import { Replace } from '../../helpers/Replace';

export interface TodoProps {
  label: string;
  status?: 'completed' | 'pending';
  created_at: Date;
  updated_at: Date | null;
}

export class Todo {
  private _id: string;
  private props: TodoProps;

  constructor(
    props: Replace<TodoProps, { created_at?: Date }>,
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
  public set label(label: string) {
    this.props.label = label;
  }

  public get label(): string {
    return this.props.label;
  }

  public set status(status: 'completed' | 'pending') {
    this.props.status = status;
  }

  public get status(): 'completed' | 'pending' {
    return this.props.status;
  }

  public set created_at(created_at: Date) {
    this.props.created_at = created_at;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public updatedAt() {
    this.props.updated_at = new Date();
  }

  public get updated_at(): Date | null {
    return this.props.updated_at;
  }
}