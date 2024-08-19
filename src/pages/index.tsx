import { useEffect, useState } from "react";
import { Card, Table } from "@/components";

export default function Home() {
  const apiHost = process.env.NEXT_PUBLIC_API_HOST;
  const [data, setData] = useState<any>([]);
  const [winnerByYear, setWinnerByYear] = useState<any>();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    Promise.all([
      fetch(`${apiHost}?projection=years-with-multiple-winners`),
      fetch(`${apiHost}?projection=studios-with-win-count`),
      fetch(`${apiHost}?projection=max-min-win-interval-for-producers`),
    ])
      .then(async ([res1, res2, res3]) => {
        const { years: yearsMultipleWinners } = await res1.json();
        const { studios: studiosWinCount } = await res2.json();
        const producersWinsInterval = await res3.json();

        setData({
          yearsMultipleWinners,
          studiosWinCount: studiosWinCount?.slice(0, 3),
          producersWinsInterval,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getWinnerByYear = async (year: string) => {
    try {
      const response = await fetch(`${apiHost}?winner=true&year=${year}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setWinnerByYear(await response.json());
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {data?.yearsMultipleWinners?.length && (
        <div className="lg:basis-1/3 grow">
          <Card title="List years with multiple winners">
            <Table
              columnsTitles={["Year", "Win Count"]}
              rowValues={data.yearsMultipleWinners}
            />
          </Card>
        </div>
      )}
      {data?.studiosWinCount?.length && (
        <div className="lg:basis-1/3 grow">
          <Card title="Top 3 studios with winners">
            <Table
              columnsTitles={["Name", "Win Count"]}
              rowValues={data.studiosWinCount}
            />
          </Card>
        </div>
      )}
      {(data?.producersWinsInterval?.min?.length ||
        data?.producersWinsInterval?.max?.length) && (
        <div className="lg:basis-1/3 grow">
          <Card title="Top 3 studios with winners">
            <>
              {data?.producersWinsInterval?.max?.length && (
                <Table
                  title="Maximum"
                  columnsTitles={[
                    "Producer",
                    "Interval",
                    "Previous Year",
                    "Following Year",
                  ]}
                  rowValues={data.producersWinsInterval.max}
                />
              )}
              {data?.producersWinsInterval?.min?.length && (
                <Table
                  title="Minimum"
                  columnsTitles={[
                    "Producer",
                    "Interval",
                    "Previous Year",
                    "Following Year",
                  ]}
                  rowValues={data.producersWinsInterval.min}
                />
              )}
            </>
          </Card>
        </div>
      )}
      <div className="lg:basis-1/3 grow">
        <Card title="List movie winners by year">
          <Table
            filterElement={
              <select
                className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                onChange={(e) => getWinnerByYear(e.target.value)}
              >
                <option value="">Search by year</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
              </select>
            }
            columnsTitles={["Id", "Year", "Title"]}
            rowValues={winnerByYear}
          />
        </Card>
      </div>
    </div>
  );
}
