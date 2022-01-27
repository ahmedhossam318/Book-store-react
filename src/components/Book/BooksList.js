import React from "react";

const BooksList = ({
	isLoading,
	books,
	isLoggedIn,
	dispatch,
	deleteBook,
	getBookID,
}) => {
	const BookList =
		books.length > 0
			? books.map((item) => (
					<li
						key={item.id}
						className="list-group-item d-flex  justify-content-between align-items-center"
					>
						<div>{item.title}</div>
						<div className="btn-group" role="group">
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => getBookID(item.id)}
							>
								Read
							</button>
							<button
								type="button"
								className="btn btn-danger"
								disabled={!isLoggedIn}
								onClick={() =>
									dispatch(deleteBook(item))
										.unwrap()
										.then((data) => {
											console.log(data);
										})
										.catch((error) => {
											console.log(error);
										})
								}
							>
								Delete
							</button>
						</div>
					</li>
			  ))
			: "There is no books available";
	return (
		<div>
			<h2>Books List</h2>
			{isLoading ? "Loading..." : <ul className="list-group">{BookList}</ul>}
		</div>
	);
};

export default BooksList;
