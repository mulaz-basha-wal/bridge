export const errorObjectHandler = (error: any) => {
  const errObj = {
    message: error.message || 'Something went wrong please try after sometime.',
    errorStack: undefined
  }
  if (process.env.NODE_ENV !== 'production') {
    errObj.errorStack = error.stack;
  }
}

export const oXSwapNumberConverter = (amount: number) => {
  return amount / (10 ** 18)
}