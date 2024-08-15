interface ICard {
  title: string;
  children: JSX.Element;
}

export function Card({ title, children }: ICard) {
  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
        {title}
      </h5>
      {children}
    </div>
  );
}
