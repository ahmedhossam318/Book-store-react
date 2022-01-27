import React, { Fragment, useEffect, useState } from "react";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, deleteBook } from "../../store/bookSlice";
import "./book.css";

const PostContainer = () => {
	const dispatch = useDispatch();
	const [selectedBook, setSelectedBook] = useState({});
	const { isLoading, books } = useSelector((state) => state.books);
	const { isLoggedIn } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getBooks());
	}, [dispatch]);

	const getBookID = (id) => {
		const selectedBook = books.find((book) => book.id === id);
		setSelectedBook((prev) => {
			return { ...prev, ...selectedBook };
		});
	};

	return (
		<Fragment>
			<hr className="my-5" />
			<div className="row">
				<div className="col">
					<BooksList
						isLoading={isLoading}
						books={books}
						isLoggedIn={isLoggedIn}
						deleteBook={deleteBook}
						dispatch={dispatch}
						getBookID={getBookID}
					/>
				</div>
				<div className="col side-line">
					<BookInfo info={selectedBook} />
				</div>
			</div>
		</Fragment>
	);
};

export default PostContainer;
