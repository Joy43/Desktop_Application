import { createSlice } from "@reduxjs/toolkit";

type TBookmark = {
    id: string;
    title: string;
    subTitle: string;
    headingImage: string;
    createdAt:string;
};

const initialState = {
    bookMarks: [] as TBookmark[]
}

const bookMarkSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addBookMark: (state, action) => {
            if (action?.payload) {
                state.bookMarks.push(action.payload);
            }
        },
        removeBookMark: (state, action) => {
            if (action?.payload && state) {
                state.bookMarks = state.bookMarks.filter((bk) => bk.id !== action.payload);
            }
        },
    },
});

export const { addBookMark, removeBookMark } = bookMarkSlice.actions;

const bookMarkReducer = bookMarkSlice.reducer;
export default bookMarkReducer;