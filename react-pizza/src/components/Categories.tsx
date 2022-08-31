interface categoryProps {
  category: number;
  onClickCategory: Function;
}

export default function Categories({ category, onClickCategory }: categoryProps) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые', 'Новые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            className={category === index ? 'active' : ''}
            key={index}
            onClick={() => onClickCategory(index)}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
