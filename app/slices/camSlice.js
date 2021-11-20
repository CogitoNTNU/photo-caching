import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false
}

export const camSlice = createSlice({
  name: 'cam',
  initialState,
  reducers: {
      setVisible: (state, action) => {
        state.open = action.payload
      },
  },
})

export const { setVisible } = camSlice.actions

//Selectors
export const selectOpen = (state) => state.cam.open;

export default camSlice.reducer;