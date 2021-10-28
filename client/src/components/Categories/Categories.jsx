import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getCategories, filterByCategory } from '../../redux/actions/actions';
import style from './Categories.module.css';

const Categories = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch])

	const { categories } = useSelector(state => state);

	function handleClick(e) {
		if (!e.target.value) {
			dispatch(getProducts());
		}
		else {
			dispatch(filterByCategory({ category: e.target.value }));
		}
	}

	return (
		<div className={style.Categories}>
			<button className={style.btn} value="" onClick={handleClick}>TODOS</button>
			{
				categories && categories.map(x => {
					return (
						<button className={style.btn} value={x} onClick={handleClick}>{x.toUpperCase()}</button>
					)
				})
			}
		</div>
	)
}

export default Categories;