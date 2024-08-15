interface ITable {
  title?: string;
  columnsTitles: string[];
  rowValues: string[];
}

export function Table({ title, columnsTitles, rowValues }: ITable) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <p className="my-4 text-lg text-gray-900 dark:text-gray-100">{title}</p>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columnsTitles.map((item) => (
              <th scope="col" className="px-6 py-3">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowValues.map((item) => (
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              {Object.keys(item).map((key: any) => (
                <td className="px-6 py-4">{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
