interface ITable {
  title?: string;
  filterElement?: JSX.Element;
  columnsTitles: string[];
  rowValues: string[];
}

export function Table({
  title,
  filterElement,
  columnsTitles,
  rowValues,
}: ITable) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <p className="my-4 text-lg text-gray-900 dark:text-gray-100">{title}</p>
      {filterElement && (
        <div className="rounded-lg border-gray-200 dark:border-gray-700 border p-2 mb-2">
          <p className="mb-2 text-gray-900 dark:text-gray-100">Filters</p>
          {filterElement}
        </div>
      )}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columnsTitles.map((item, index) => (
              <th scope="col" className="px-6 py-3" key={index}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowValues?.map((item, index) => (
            <tr
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              key={index}
            >
              {Object.keys(item).map((key: any, index: number) => (
                <td className="px-6 py-4" key={index}>
                  {item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
