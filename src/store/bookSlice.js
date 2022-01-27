import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";

const url = "http://localhost:3005/book/";

export const getBooks = createAsyncThunk(
	"book/getBooks",
	async (_, thunkApi) => {
		const { rejectWithValue } = thunkApi;
		try {
			const result = await fetch(url);
			const books = await result.json();
			return books;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

export const insertBook = createAsyncThunk(
	"book/insertBooks",
	async (bookData, thunkApi) => {
		const { rejectWithValue, getState, dispatch } = thunkApi;
		try {
			bookData.userName = getState().auth.name;
			const res = await fetch(url, {
				method: "POST",
				body: JSON.stringify(bookData),
				headers: { "Content-Type": "application/json", CHARSET: "utf8" },
			});
			const books = await res.json();
			dispatch(logInsert({ name: "insertBook", status: "Success" }));
			return books;
		} catch (e) {
			dispatch(logInsert({ name: "insertBook", status: "Falid" }));

			return rejectWithValue(e.message);
		}
	}
);

export const deleteBook = createAsyncThunk(
	"book/deleteBook",
	async (item, thunkApi) => {
		const { rejectWithValue } = thunkApi;
		try {
			await fetch(url + item.id, {
				method: "DELETE",
				headers: { "Content-Type": "application/json", CHARSET: "utf8" },
			});
			return item;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

const bookSlice = createSlice({
	name: "books",
	initialState: { books: [], isLoading: false, error: null },
	extraReducers: {
		[getBooks.pending]: (state, action) => {
			state.isLoading = true;
			state.error = null;
			console.log(action);
		},
		[getBooks.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.books = action.payload;
			console.log(action);
		},
		[getBooks.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		// insert book
		[insertBook.pending]: (state, action) => {
			state.isLoading = false;
			state.error = null;
		},
		[insertBook.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.books.push(action.payload);
		},
		[insertBook.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = null;
		},
		// Delete book
		[deleteBook.pending]: (state, action) => {
			state.isLoading = false;
			state.error = null;
		},
		[deleteBook.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.books = state.books.filter((book) => book.id !== action.payload.id);
		},
		[deleteBook.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = null;
		},
	},
});
export default bookSlice.reducer;
