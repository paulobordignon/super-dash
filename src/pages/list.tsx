import { useEffect, useState } from "react";
import { Card, Table } from "@/components";

export default function List() {
  const apiHost = process.env.NEXT_PUBLIC_API_HOST;
  const [data, setData] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [filterWinner, setFilterWinner] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");
  const [filteredQueryString, setFilteredQueryString] = useState<String>("");

  useEffect(() => {
    const queryString = `?page=${pageNumber}&size=99${
      filterWinner.length ? `&winner=${filterWinner}` : ""
    }${filterYear.length === 4 ? `&year=${filterYear}` : ""}`;

    if (queryString !== filteredQueryString) {
      getData(queryString);
    }
  }, [pageNumber, filterWinner, filterYear]);

  const getData = async (queryString: string) => {
    try {
      const response = await fetch(`${apiHost}${queryString}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setData(await response.json());
      setFilteredQueryString(queryString);
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  return data?.length ? (
    <Card title="List movies">
      <Table
        filterElement={
          <div className="flex gap-2">
            <select
              className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              onChange={(e) => setFilterWinner(e.target.value)}
            >
              <option value="">Winner?</option>
              <option value="true">yes</option>
              <option value="false">no</option>
            </select>
            <input
              type="number"
              placeholder="Filter by year"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            />
          </div>
        }
        columnsTitles={["Id", "Year", "Title", "Winner?"]}
        rowValues={data}
      />
    </Card>
  ) : (
    <></>
  );
}
