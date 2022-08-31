import { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { IPizzaBlock } from '../models';
import PizzaSkeleton from '../components/PizzaSkeleton';

export default function Home() {
  const [pizzas, setPizzas] = useState<IPizzaBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = sortType.sortProperty.replace('-', '');

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://62ed2d76818ab252b60bc1c0.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, order, sortBy]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={categoryId} onClickCategory={(i: number) => setCategoryId(i)} />
        <Sort sortType={sortType} onClickSort={(i: any) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
          : pizzas.map((obj) => <PizzaBlock key={obj.id} pizza={obj} />)}
      </div>
    </div>
  );
}
