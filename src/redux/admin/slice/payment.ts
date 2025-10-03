import { Payment, Purchase } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPayment extends Payment {
  purchases: Purchase[]
}

interface PaymentState {
  payments: IPayment[];
}

const initialState: PaymentState = {
  payments: [],
};

export const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    initializePayments: (state, action: PayloadAction<IPayment[]>) => {
      state.payments = action.payload;
    },
    updatePayment: (state, action: PayloadAction<IPayment>) => {
      const index = state.payments.findIndex(
        (payment) => payment.id === action.payload.id
      );
      if (index !== -1) {
        state.payments[index] = action.payload;
      }
    },
  },
});

export const { initializePayments, updatePayment } = paymentSlice.actions;
export default paymentSlice.reducer;
