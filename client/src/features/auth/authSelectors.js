export const selectUser = (state) => state.auth.user;
export const selectError = (state) => state.auth.isError 
export const selectIsLoading = (state) => state.auth.isLoading
export const selectMessage = (state) => state.auth.message
export const selectUserLove = (state) => state.auth.loveData;
export const selectHistory = (state) => state.auth.historyData
export const selectSuccessfull =  (state) => state.auth.successfull
export const selectIsLoadingData = (state) => state.auth.isLoadingData