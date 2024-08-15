import { Card, Table } from "@/components";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>({});
  const [winnerByYear, setWinnerByYear] = useState();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    const apiHost = "https://tools.outsera.com/backend-java/api/movies";

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

  console.log(data);

  return (
    <div className="flex gap-4 flex-wrap">
      {data?.yearsMultipleWinners?.length && (
        <div className="basis-1/3 grow">
          <Card title="List years with multiple winners">
            <Table
              columnsTitles={["Year", "Win Count"]}
              rowValues={data.yearsMultipleWinners}
            />
          </Card>
        </div>
      )}
      {data?.studiosWinCount?.length && (
        <div className="basis-1/3 grow">
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
        <div className="basis-1/3 grow">
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
    </div>
  );
}
