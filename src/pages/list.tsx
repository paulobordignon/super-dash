import { useEffect, useState } from "react";
import { Card, Table } from "@/components";
import { IMovie } from "@/types";

export default function List() {
  const apiHost = process.env.NEXT_PUBLIC_API_HOST;
  const [data, setData] = useState<IMovie[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [filterWinner, setFilterWinner] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");

  useEffect(() => {
    const queryString = `?page=${pageNumber}&size=99${
      filterWinner.length ? `&winner=${filterWinner}` : ""
    }${filterYear.length ? `&year=${filterYear}` : ""}`;

    getData(queryString);
  }, [pageNumber, filterWinner, filterYear]);

  const getData = async (queryString: string) => {
    try {
      //TODO: IMPLEMENT A CACHE ON FRONT SIDE TO AVOID MANY REQUESTS.
      await fetch(`${apiHost}${queryString}`)
        .then(async (res) => {
          const { content, totalPages } = await res.json();

          setTotalPages(totalPages);
          setData(
            content.map(({ id, year, title, winner }: IMovie) => {
              return { id, year, title, winner: winner ? "Yes" : "No" };
            })
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  const handlePageNumber = (number: number) => {
    setPageNumber(number);
  };

  return (
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
        totalPages={totalPages}
        changePage={handlePageNumber}
      />
    </Card>
  );
}
