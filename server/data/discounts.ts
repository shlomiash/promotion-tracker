
export type Discount = {
    id: string;
    code: string;
    limits: number | null;
    amount: number;
    userCreatedId: string;
    note: string|null;
    createdAt: Date;
    expires: string | null;
    canBeCombined: boolean;
    active: boolean;
    isFixed: boolean;
  }